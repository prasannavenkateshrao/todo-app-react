'use client';

import { useEffect, useState } from 'react';
import { addTodo, removeTodo, getTodos } from './actions'; // adjust path if needed

export default function Home() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetch();
  }, []);

  const handleAdd = async () => {
    if (todo.trim()) {
      const updated = await addTodo(todo);
      setTodos(updated);
      setTodo('');
    }
  };

  const handleRemove = async (index: number) => {
    const updated = await removeTodo(index);
    setTodos(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My To-Do List</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a new task"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((todoItem, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200"
            >
              <span className="text-lg text-gray-700">{todoItem}</span>
              <button
                onClick={() => handleRemove(index)}
                className="ml-4 px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
