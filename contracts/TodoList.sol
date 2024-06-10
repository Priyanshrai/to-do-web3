// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract TodoList {
    struct Todo {
        uint id;
        string content;
        bool completed;
    }

    Todo[] public todos;

    event TodoAdded(uint id, string content);
    event TodoCompleted(uint id, bool completed);
    event TodoDeleted(uint id);

    function addTodo(string memory _content) public {
        uint id = todos.length;
        todos.push(Todo(id, _content, false));
        emit TodoAdded(id, _content);
    }

    function toggleCompleted(uint _id) public {
        Todo storage todo = todos[_id];
        todo.completed = !todo.completed;
        emit TodoCompleted(_id, todo.completed);
    }

    function deleteTodo(uint _id) public {
        require(_id < todos.length, "Invalid todo ID");

        for (uint i = _id; i < todos.length - 1; i++) {
            todos[i] = todos[i + 1];
            todos[i].id = i;
        }

        todos.pop();
        emit TodoDeleted(_id);
    }

    function getTodos() public view returns (Todo[] memory) {
        return todos;
    }
}