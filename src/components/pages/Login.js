import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
const Login = () => {

    const { register, handleSubmit } = useForm();
    const { signIn, setLoading, handleGoogleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const Googleprovider = new GoogleAuthProvider();
    const from = location.state?.from?.pathname || '/';
    const handleGoogle = () => {
        handleGoogleSignIn(Googleprovider)
            .then((result) => {


                const user = result.user;

                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    userType: "Buyer",
                }


                fetch(' https://server-sooty-xi.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.acknowledged) {



                        }
                    })
                    .catch(er => console.error(er));

                navigate(from, { replace: true });
            }).catch((error) => {
                console.log("error : ", error);
            })
    }

    const handleLogin = (data) => {
        setLoginError("");
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error.message);
                setLoginError(error.message)
            });
    }
    return (

        <div className="w-1/2 my-10 mx-auto">
            <form onSubmit={handleSubmit(handleLogin)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

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
                        Login
                    </button>

                </div>
            </form>
            <div className="w-full mt-3 ">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white my-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleGoogle}>
                    <img src='https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1' style={{ height: "40px", borderRadius: "50%", marginRight: "5px" }} alt='' />
                    Sign in with Google
                </button>
                <p>Don't have an account? <Link className='text-cyan-600' to={'../signup'}>Sign up</Link></p>
            </div>

        </div>

    );
};

export default Login;