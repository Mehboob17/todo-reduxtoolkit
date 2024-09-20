import React, { useState } from "react";
import Modal from "./Modal"; // Ensure you have a Modal component
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "../Redux/todoSlice";

const TodoCard = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  // const [todos, setTodos] = useState(["Sample Todo 1", "Sample Todo 2"]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTodo = (todo) => {
    // setTodos([...todos, todo]);
    // debugger;
    dispatch(addTodo(todo));
    setShowAddModal(false);
  };

  const handleEditTodo = (index, newTodo) => {
    console.log(index, newTodo);
    dispatch(updateTodo({ index, newTodo }));
    setShowEditModal(false);
  };

  const handleDeleteTodo = (index) => {
    dispatch(removeTodo(index));
    setShowDeleteModal(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={() => setShowAddModal(true)}
          className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <FaPlus />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Todo List</h2>
        <ul className="space-y-3">
          {Array.isArray(todos) &&
            todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-200 rounded-md shadow-sm"
              >
                <span>{todo.todo}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentTodo(todo);
                      setEditingIndex(todo.id);
                      setShowEditModal(true);
                    }}
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTodo(todo);
                      setEditingIndex(todo.id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
        </ul>

        {showAddModal && (
          <Modal
            onClose={() => setShowAddModal(false)}
            onSave={handleAddTodo}
            title="Add New Todo"
          />
        )}
        {showEditModal && (
          <Modal
            onClose={() => setShowEditModal(false)}
            onSave={(todo) => handleEditTodo(editingIndex, todo)}
            title="Edit Todo"
            initialValue={currentTodo.todo}
          />
        )}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
              <p className="mb-4">Do you want to delete this todo?</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleDeleteTodo(editingIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
