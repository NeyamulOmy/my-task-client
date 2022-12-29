import { useQuery } from '@tanstack/react-query';
import React from 'react';

const CompletedTasks = () => {
    const { data: completedTasks, isLoading, refetch } = useQuery({
        queryKey: ['completedTask'],
        queryFn: async () => {
            try {
                const res = await fetch('https://my-task-server-three.vercel.app/completedtasks', {
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
    return (
        <div>
            <h3 className="text-3xl my-5">Completed Tasks</h3>
            <div className="overflow-x-auto">
                <table className="table w-full md:w-3/4 lg:w-1/2 mx-auto">
                    <thead>
                        <tr className='bg-indigo-400 text-white'>
                            <th></th>
                            <th>Task</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            completedTasks &&
                            completedTasks.map((completedTask, i) => <tr className='even:bg-white odd:bg-gray-200' key={completedTask._id}>
                                <th>{i + 1}</th>
                                <td>{completedTask.description}</td>



                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedTasks;