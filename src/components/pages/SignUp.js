import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {
    //const [data, setData] = useState('');
    //const [createdUserEmail, setCreatedUserEmail] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const handleSignup = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {

                    })
                    .catch(err => console.error(err))
                toast.success("User created successfully!")
                reset()

            })
            .catch(error => console.error(error));

    }

    return (
        <div className="w-1/2 my-10 mx-auto">
            <form onSubmit={handleSubmit(handleSignup)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Full name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" {...register('name')} placeholder="Full name" />
                </div>
                <div className="mb-4">
                    <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" placeholder="Image" accept='image/*' {...register('image')} />
                </div>
                <div className="mb-6">
                    <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" {...register('email')} />
                    <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" {...register('password')} />

                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign up
                    </button>
                </div>
            </form>
            <p>Already have an account? <Link className='text-cyan-600' to={'../login'}>Login</Link></p>
        </div>
    );
};

export default Signup;