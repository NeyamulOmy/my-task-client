import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const MyTasks = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const { data: myTasks, isLoading, refetch } = useQuery({
        queryKey: ['myTask'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://my-task-server-three.vercel.app/mytasks?email=${user.email}`, {
                    headers: {

                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });
    const handleDelete = id => {

        console.log(id)
        fetch(`https://my-task-server-three.vercel.app/mytasks/${id}`, {
            method: 'DELETE',
            headers: {

            }
        })
            .then(res => {
                res.json();

            })
            .then(data => {
                refetch()

            })

    }

    // const myTasks = useLoaderData();
    const handleComplete = (myTask) => {
        const id = myTask._id;

        fetch(`https://my-task-server-three.vercel.app/mytasks/${id}`, {
            method: 'PUT',
            headers: {

            }
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                navigate('/Completed Tasks')
            })

    }
    if (isLoading) {
        return (<div>Loading...</div>)
    }
    return (
        <div>
            <h3 className="text-3xl my-5">My Tasks</h3>
            <div className="overflow-x-auto">
                <table className="table w-full md:w-3/4 lg:w-1/2 mx-auto">
                    <thead>
                        <tr className='bg-indigo-400 text-white'>
                            <th></th>
                            <th>Task</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myTasks &&
                            myTasks.map((myTask, i) => <tr className='even:bg-white odd:bg-gray-200' key={myTask._id}>
                                <th>{i + 1}</th>
                                <td>{myTask.description}</td>
                                <td><button onClick={() => handleComplete(myTask)} className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white mr-2 my-2 px-2 border border-green-500 hover:border-transparent rounded">
                                    Complete
                                </button><button onClick={() => { navigate(`/updatetask/${myTask._id}`) }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white mr-2 my-2 px-2 border border-blue-500 hover:border-transparent rounded">
                                        Update
                                    </button><button onClick={() => { handleDelete(myTask._id) }} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white my-2 px-2 border border-red-500 hover:border-transparent rounded">
                                        Delete
                                    </button></td>



                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTasks;