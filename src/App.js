import React, { useState, useEffect } from 'react';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import EditModal from './EditModal';
import ListManager from './ListManager';
import { Button } from 'react-bootstrap';
import './App.css';

const App = () => {
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentListId, setCurrentListId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem('lists'));
    if (savedLists) {
      setLists(savedLists);
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const addTodo = (listId, todo) => {
    setLists(
      lists.map(list =>
        list.id === listId ? { ...list, todos: [...list.todos, todo] } : list
      )
    );
  };

  const removeTodo = (listId, index) => {
    setLists(
      lists.map(list =>
        list.id === listId
          ? { ...list, todos: list.todos.filter((_, i) => i !== index) }
          : list
      )
    );
  };

  const updateTodo = (listId, updatedTodo) => {
    setLists(
      lists.map(list =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map(todo =>
                todo === currentTodo ? updatedTodo : todo
              ),
            }
          : list
      )
    );
  };

  const toggleComplete = (listId, index) => {
    setLists(
      lists.map(list =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((todo, i) =>
                i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
              ),
            }
          : list
      )
    );
  };

  const handleShowModal = (listId, todo) => {
    setCurrentListId(listId);
    setCurrentTodo(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTodo(null);
  };

  const addList = (name) => {
    setLists([...lists, { id: Date.now(), name, todos: [] }]);
  };

  const removeList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="text-center">Lista To-Do</h1>
        <Button onClick={toggleTheme}>
          Cambiar a {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </Button>
      </div>
      <ListManager addList={addList} />
      <div className="row">
        {lists.map((list) => (
          <div key={list.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>{list.name}</h5>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeList(list.id)}
                >
                  Eliminar Lista
                </button>
              </div>
              <div className="card-body">
                <ToDoForm addTodo={(todo) => addTodo(list.id, todo)} />
                <ToDoList
                  todos={list.todos}
                  removeTodo={(index) => removeTodo(list.id, index)}
                  handleShowModal={(todo) => handleShowModal(list.id, todo)}
                  toggleComplete={(index) => toggleComplete(list.id, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentTodo && (
        <EditModal
          show={showModal}
          handleClose={handleCloseModal}
          todo={currentTodo}
          handleSave={(updatedTodo) => updateTodo(currentListId, updatedTodo)}
        />
      )}
    </div>
  );
};

export default App;