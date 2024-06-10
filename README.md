# Todo List Dapp

A decentralized todo list application built on the Ethereum blockchain using Solidity, React, and Web3.js.

![Todo List Dapp Screenshot](https://github.com/Priyanshrai/to-do-web3/assets/105690577/2df32006-d5d3-461a-9a5c-b120291fe528)
## Features

- Add new todo items
- Mark todo items as completed
- Delete todo items
- Decentralized storage of todo items on the Ethereum blockchain
- Attractive gaming-inspired UI design

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Truffle (v5.x or later)
- Ganache (v6.x or later)
- MetaMask browser extension

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/todo-list-dapp.git
   ```

2. Navigate to the project directory:
   ```
   cd todo-list-dapp
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start Ganache and configure it to run on `http://127.0.0.1:8545`.

5. Compile and deploy the smart contract:
   ```
   truffle compile
   truffle migrate
   ```

6. Configure MetaMask:
   - Open MetaMask and create a new custom network.
   - Set the network name to "Ganache" or any desired name.
   - Set the RPC URL to `http://127.0.0.1:8545`.
   - Set the Chain ID to `1337`.
   - Import one of the Ganache accounts into MetaMask using its private key.

7. Update the `TodoList.json` file:
   - Copy the contract ABI from the `build/contracts/TodoList.json` file.
   - Paste the ABI into the `src/contracts/TodoList.json` file.
   - Update the contract address in the `src/contracts/TodoList.json` file with the deployed contract address from Ganache.

8. Start the React development server:
   ```
   npm start
   ```

9. Open your browser and navigate to `http://localhost:3000` to access the Todo List Dapp.

## Usage

- Connect MetaMask to the Ganache network.
- Add new todo items using the input field and the "Add Todo" button.
- Mark todo items as completed by clicking the "Mark Complete" button next to each item.
- Delete todo items by clicking the "Delete" button next to each item.
- The todo list will automatically update to reflect the changes on the blockchain.

## Smart Contract

The `TodoList.sol` smart contract is located in the `contracts` directory. It defines the following functions:

- `addTodo(string memory _content)`: Adds a new todo item with the given content.
- `toggleCompleted(uint _id)`: Toggles the completion status of a todo item with the given ID.
- `deleteTodo(uint _id)`: Deletes a todo item with the given ID.
- `getTodos()`: Retrieves the list of all todo items.

The smart contract emits the following events:

- `TodoAdded(uint id, string content)`: Emitted when a new todo item is added.
- `TodoCompleted(uint id, bool completed)`: Emitted when the completion status of a todo item is toggled.
- `TodoDeleted(uint id)`: Emitted when a todo item is deleted.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README file based on your specific project details, such as the repository URL, screenshot, and any additional sections or information you want to include.