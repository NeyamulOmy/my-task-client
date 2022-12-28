import { Button, TextField } from '@mui/material';
import React from 'react';

const Home = () => {
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        const task = document.getElementById('taskField').value;
        console.log(task)
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