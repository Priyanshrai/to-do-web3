import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import TodoListContract from './contracts/TodoList.json';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoContent, setTodoContent] = useState('');
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      console.log('Initializing Web3...');
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = TodoListContract.networks[networkId];

        if (deployedNetwork) {
          const contract = new web3Instance.eth.Contract(
            TodoListContract.abi,
            deployedNetwork.address
          );
          setWeb3(web3Instance);
          setContract(contract);
          setAccounts(accounts);
          console.log('Contract:', contract);
          console.log('Accounts:', accounts);

          // Listen for events emitted by the contract
          contract.events.TodoAdded({}, (error, event) => {
            if (!error) {
              const { id, content } = event.returnValues;
              setTodos((prevTodos) => [...prevTodos, { id, content, completed: false }]);
            }
          });

          contract.events.TodoCompleted({}, (error, event) => {
            if (!error) {
              const { id, completed } = event.returnValues;
              setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                  todo.id === id ? { ...todo, completed } : todo
                )
              );
            }
          });

          contract.events.TodoDeleted({}, (error, event) => {
            if (!error) {
              const { id } = event.returnValues;
              setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            }
          });
        } else {
          console.error('Contract not deployed on the current network');
        }
      }
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (contract) {
        const todos = await contract.methods.getTodos().call();
        setTodos(todos);
      }
    };
    fetchTodos();
  }, [contract]);

  

  const handleAddTodo = async () => {
    if (contract && accounts.length > 0) {
      try {
        const transaction = await contract.methods.addTodo(todoContent).send({
          from: accounts[0],
          gas: 300000,
          gasPrice: web3.utils.toWei('20', 'gwei'),
        });
  
        await transaction.once('receipt', async (receipt) => {
          console.log('Transaction receipt:', receipt);
          const todos = await contract.methods.getTodos().call();
          setTodos(todos);
          setTodoContent('');
        });
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    } else {
      console.error('Contract or accounts not available');
    }
  };
  
  const handleToggleCompleted = async (id) => {
    if (contract && accounts.length > 0) {
      try {
        const transaction = await contract.methods.toggleCompleted(id).send({
          from: accounts[0],
          gas: 300000,
          gasPrice: web3.utils.toWei('20', 'gwei'),
        });
  
        await transaction.once('receipt', async (receipt) => {
          console.log('Transaction receipt:', receipt);
          const todos = await contract.methods.getTodos().call();
          setTodos(todos);
        });
      } catch (error) {
        console.error('Error toggling todo:', error);
      }
    }
  };
  
  const handleDeleteTodo = async (id) => {
    if (contract && accounts.length > 0) {
      try {
        const transaction = await contract.methods.deleteTodo(id).send({
          from: accounts[0],
          gas: 300000,
          gasPrice: web3.utils.toWei('20', 'gwei'),
        });
  
        await transaction.once('receipt', async (receipt) => {
          console.log('Transaction receipt:', receipt);
          const todos = await contract.methods.getTodos().call();
          setTodos(todos);
        });
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span>{todo.content}</span>
            <div>
              <button onClick={() => handleToggleCompleted(todo.id)}>
                {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="add-todo">
        <input
          type="text"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoList;