import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const AddTask = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm();
    const handleAddTask = (data) => {
        const imageHostKey = process.env.REACT_APP_imgbb_key
        const formData = new FormData();
        const image = data.image[0];
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const myTask = {
                        title: data.title,
                        email: user.email,
                        image: imgData.data.url,
                        description: data.description,
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
                            toast.success(`Task added successfully`)
                            reset();
                        })
                }
            })
    }
    return (
        <div className="w-full md:w-3/4 lg:w-1/2 my-20 mx-auto">
            <form onSubmit={handleSubmit(handleAddTask)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" {...register('title')} placeholder="Title" />
                </div>
                <div className="mb-4">
                    <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" placeholder="Image" accept='image/*' {...register('image')} />
                </div>
                <div className="mb-6">
                    <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" {...register('description')} />

                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add Task
                    </button>

                </div>
            </form>

        </div>
    );
};

export default AddTask;