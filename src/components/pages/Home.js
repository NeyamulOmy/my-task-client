import { Button, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext)
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        const task = document.getElementById('taskField').value;
        const myTask = {
            email: user.email,
            description: task,
            type: 'incomplete'
        }
        fetch('https://my-task-server-three.vercel.app/mytasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(myTask)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`Task added successfully`);
                document.getElementById('taskField').value = '';

            })
    }
    return (
        <div className='my-10 mx-auto'>
            <TextField onKeyDown={handleEnter} className=' w-1/2' id="taskField" label="Add Task" variant="standard" />
            <div className='mt-5'>
                <Button variant='contained' onClick={handleSubmit} >Add</Button>
            </div>
        </div>
    );
};

export default Home;