import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Addtodo = () => {
    const [message, setMessage] = useState('');

    const createToDo = async () => {
        if (message === '') {
            toast.error('Cannot add an empty message');
            return;
        }

        if (message.length < 4 || message.length > 20) {
            toast.error('Message must be between 4 and 20 characters');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/todolist`, {
                message: message,
            });

            if (response.data.success === 'created') {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container'>
            <input
                className='input'
                type="text"
                placeholder="Add task here"
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={createToDo} className='btn'>
                Add
            </button>
        </div>
    );
};

export default Addtodo;
