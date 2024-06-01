import React from 'react';

const ToDoList = ({ todos, removeTodo, handleShowModal, toggleComplete }) => {
    return (
        <ul className="list-group">
            {todos.map((todo, index) => (
                <li
                    key={index}
                    className={`list-group-item d-flex justify-content-between align-items-center ${todo.isCompleted ? 'list-group-item-success' : ''}`}
                >
                    <span
                        onClick={() => toggleComplete(index)}
                        style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none', cursor: 'pointer' }}
                    >
                        {todo.text}
                    </span>
                    <div>
                        <button
                            className="btn btn-sm btn-warning mx-1"
                            onClick={() => handleShowModal(todo)}
                        >
                            Editar
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeTodo(index)}
                        >
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ToDoList;