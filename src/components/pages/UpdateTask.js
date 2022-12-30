import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
const UpdateTask = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm();
    const updateTask = useLoaderData();

    const handleUpdateTask = (data) => {
        const updatedTask = {
            title: data.title,
            description: data.description
        }
        fetch(`http://localhost:5000/mytasks/${updateTask._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`Task updated successfully`)
                navigate('/My Tasks');
            })
    }
    return (
        <div className="w-1/2 my-10 mx-auto">
            <form onSubmit={handleSubmit(handleUpdateTask)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" {...register('title')} placeholder="Title" defaultValue={updateTask.title} />
                </div>

                <div className="mb-6">
                    <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" {...register('description')} defaultValue={updateTask.description} />

                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Update Task
                    </button>

                </div>
            </form>

        </div>
    );
};

export default UpdateTask;