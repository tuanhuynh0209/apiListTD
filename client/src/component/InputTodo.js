import React, { Fragment, useState } from 'react';

const InputTodo = ({getTodos}) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {description};
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      setDescription("");
      getTodos();
      console.log("vào consolo coi response à cưng")
    } catch (err) {
        console.error(err.message);
    }
  };

  const changeTextInput = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Fragment>
      <h1 className="text-center mt-10 text-5xl font-bold text-blue-600">Todo List</h1>

      <form className="mt-8 flex flex-col items-center w-full">
        <input
          type="text"
          className="w-3/4 md:w-1/2 lg:w-1/3 p-4 border-2 border-gray-300 rounded-lg shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
          placeholder="Enter your task..."
          value={description}
          onChange={changeTextInput}
        />
        <button
          className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
          type="submit"
          onClick={onSubmitForm}
        >
          Add Task
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
