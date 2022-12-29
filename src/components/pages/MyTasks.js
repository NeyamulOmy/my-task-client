import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const MyTasks = () => {
    const { data: myTasks, isLoading, refetch } = useQuery({
        queryKey: ['myTask'],
        queryFn: async () => {
            try {
                const res = await fetch('https://my-task-server-three.vercel.app/mytasks', {
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

    // const myTasks = useLoaderData();
    const handleComplete = (myTask) => {
        const id = myTask._id;
        fetch(`https://my-task-server-three.vercel.app/mytasks/${id}`, {
            method: 'DELETE',
            headers: {

            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
            })
        fetch('https://my-task-server-three.vercel.app/completedtasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(myTask)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);

            })
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
                                <td><button onClick={() => handleComplete(myTask)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white my-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Complete
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