import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ListManager =({ addList }) => {
    const [listName, setListName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!listName.trim()) return;
        addList(listName);
        setListName('');
    };

    return(
        <div className="mb-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formListName">
                    <Form.Label>Nombre de la Lista</Form.Label>
                    <Form.Control
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="Añadir nombre de la lista..."
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Añadir Lista
                </Button>
            </Form>
        </div>
    );
};

export default ListManager;