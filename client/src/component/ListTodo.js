import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import InputTodo from './InputTodo'; 

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
            console.log("render list")
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <InputTodo getTodos={getTodos} /> 
            <div className="container mx-auto mt-10 px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Tasks</h1>
                <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Edit</th>
                            <th className="px-4 py-2">Delete</th>
                            <th className="px-4 py-2">Finish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.todo_id} className="hover:bg-gray-100 border-b transition-colors duration-200">
                                <td className="px-4 py-4 text-gray-700">{todo.description}</td>
                                <td className="px-4 py-4">
                                    <EditTodo todo={todo} getTodos={getTodos} />
                                </td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => deleteTodo(todo.todo_id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="px-4 py-4">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
                                    >
                                        Finish
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default ListTodo;
