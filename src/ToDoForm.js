import React, { useState } from 'react';

const ToDoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!value) return;
        addTodo({
            text: value,
            isCompleted: false,
        });
        setValue('');
    };

    return(
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Añadir tarea..."
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">
                        Añadir
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ToDoForm;