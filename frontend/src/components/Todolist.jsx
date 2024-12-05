import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Todolist = () => {
    const [todos, setTodos] = useState([]);
    const [isEditting, setIsEditting] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({ _id: null, message: '' });

    const getAllTodos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/todolist/getall`);
            setTodos(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTodos();
    }, []);

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`${process.env.REACT_APP_API_URL}/todolist/deleteToDo/${id}`);
            if (result.data.success === 'deleted') {
                toast.success('Todo deleted successfully!');
                getAllTodos();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete todo');
        }
    };

    const handleEditingInputChanges = (e) => {
        setCurrentTodo({ ...currentTodo, message: e.target.value });
    };

    const handleCancelEdit = () => {
        setIsEditting(false);
        setCurrentTodo({ _id: null, message: '' });
    };

    const handleUpdate = async () => {
        if (currentTodo.message.length < 4 || currentTodo.message.length > 20) {
            toast.error('Message must be between 4 and 20 characters.');
            return;
        }

        try {
            console.log('Updating todo with ID:', currentTodo._id, 'Message:', currentTodo.message);

            const result = await axios.put(
                `${process.env.REACT_APP_API_URL}/todolist/updateToDo/${currentTodo._id}`,
                { message: currentTodo.message },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (result.data.message === 'updated') {
                toast.success('Todo updated successfully!');
                getAllTodos();
                setIsEditting(false);
                setCurrentTodo({ _id: null, message: '' });
            } else {
                console.error('Unexpected response:', result.data);
                toast.error('Failed to update todo: Unexpected response');
            }
        } catch (error) {
            console.error('Update failed:', error.response?.data || error.message);
            toast.error('Failed to update todo');
        }
    };

    const handleEdit = (todo) => {
        setIsEditting(true);
        setCurrentTodo({ _id: todo._id, message: todo.message });
    };

    return (
        <div>
            {isEditting ? (
                <div className="list">
                    <input
                        type="text"
                        value={currentTodo.message}
                        onChange={handleEditingInputChanges}
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <ul className="to-dos">
                    {todos.map((todo) => (
                        <li key={todo._id}>
                            {todo.message}
                            <AiFillEdit className="icon" onClick={() => handleEdit(todo)} />
                            <AiFillDelete className="icon" onClick={() => handleDelete(todo._id)} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Todolist;
