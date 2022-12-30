import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const CompletedTasks = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const { data: completedTasks, isLoading, refetch } = useQuery({
        queryKey: ['completedTask'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://my-task-server-three.vercel.app/completedtasks?email=${user.email}`, {
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

                refetch();
            })

    }
    const handleComment = (id) => {
        const comment = document.getElementById(`comment${id}`).value
        const updatedTask = {
            comment: comment
        }
        fetch(`https://my-task-server-three.vercel.app/mytasks/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);

            })
    }
    const handleNotComplete = (completedTask) => {
        const id = completedTask._id;
        console.log(id)
        fetch(`https://my-task-server-three.vercel.app/completedtasks/${id}`, {
            method: 'PUT',
            headers: {

            }
        })
            .then(res => res.json())
            .then(data => {

                navigate('/My Tasks');
            })

    }
    if (isLoading) {
        return (<div>Loading...</div>)
    }
    return (
        <div>
            <h3 className="text-3xl my-5">Completed Tasks</h3>
            <div className="overflow-x-auto">
                <table className="table w-full md:w-3/4 lg:w-1/2 mx-auto">
                    <thead>
                        <tr className='bg-indigo-400 text-white'>
                            <th></th>
                            <th>Task</th>
                            <th>Actions</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            completedTasks &&
                            completedTasks.map((completedTask, i) => <tr className='even:bg-white odd:bg-gray-200' key={completedTask._id}>
                                <th>{i + 1}</th>
                                <td>{completedTask.description}</td>

                                <td><button onClick={() => handleNotComplete(completedTask)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white my-2 px-2 border border-blue-500 hover:border-transparent rounded">Not complete</button><button onClick={() => { handleDelete(completedTask._id) }} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white my-2 ml-2 px-2 border border-red-500 hover:border-transparent rounded">
                                    Delete
                                </button></td>
                                <td><textarea className='mt-3 text-center rounded-md' defaultValue={completedTask.comment} id={`comment${completedTask._id}`}></textarea><br />{ }<button onClick={() => handleComment(completedTask._id)} className='ml-2 bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white my-2 px-2 border border-oreange-500 hover:border-transparent rounded'>Add comment</button></td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedTasks;