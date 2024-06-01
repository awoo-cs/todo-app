import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditModal = ({ show, handleClose, todo, handleSave }) => {
    const [value, setValue] = useState(todo.text);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if(value.trim() === ''){
            setError('La tarea no puede estar vacía');
            return;
        }
        handleSave({ ...todo, text: value });
        handleClose();
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        if(error){
            setError('');
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicMail">
                        <Form.Label>Descripcion de la Tarea</Form.Label>
                        <Form.Control
                            type="text"
                            value={value}
                            onChange={handleChange}
                            isInvalid={!!error}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;