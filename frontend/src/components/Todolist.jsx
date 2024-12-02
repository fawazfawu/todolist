import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Todolist = () => {
    const [todos, setTodos] = useState([]);
    const [isEditting, setIsEditting] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({ _id: null, message: '' });

    const getAllTodos = async () => {   
        try {
            const response = await axios.get('http://localhost:3000/todolist/getall');
            setTodos(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTodos();

    }, []);
    // the useEffect look in an essential part of the react components it is use perform to side effect in functional components such as fecting data subscribe the events, or mannually updating DOM
    // in this Component the useeffects is used to fetch initial list of to dos from the backend the components is fgfirst renderd
    // in this case getalltodos is called inside function to fetch list of todos
    // the empty arrey ([])is the dependency array
    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:3000/todolist/deleteToDo/${id}`);
            if (result.data.success === 'deleted') {
                toast.success('todo deleted successfully!')
                getAllTodos();
            }
        } catch (error) {
            console.error(error);
            toast.error('failed to delete todo');
        }
    };
    const handleEditingInputChanges = (e) => {
        setCurrentTodo({ ...currentTodo, message: e.target.value });
    };
    //{...currenttodo} means "create a new object and copy all properties of currentTodo into it"
    const handleCancelEdit = () => {
        setIsEditting(false); // Exit edit mode
        setCurrentTodo({ _id: null, message: '' }); // Reset currentTodo
    };
    const handleUpdate = async () => {
        if (currentTodo.message.length < 4 || currentTodo.message.length > 20) {
            toast.error('Message must be between 4 and 20 characters.');
            return;
        }
    
        try {
            console.log('Updating todo with ID:', currentTodo._id, 'Message:', currentTodo.message);
    
            const result = await axios.put(
                `http://localhost:3000/todolist/updateToDo/${currentTodo._id}`,
                { message: currentTodo.message },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            // Adjusting to match backend response
            if (result.data.message === 'updated') {
                toast.success('Todo updated successfully!');
                getAllTodos(); // Refresh the todo list
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
    
    
    //write here handleEdit code
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
                    <button onClick={handleUpdate}>update</button>
                    <button onClick={handleCancelEdit}>cancel</button>
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

export default Todolist
