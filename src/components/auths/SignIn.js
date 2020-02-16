import React from 'react';
import {Link} from "react-router-dom";

function SignIn() {
    return (
        <div className='SignUp flex bg-1 h-100'>
            <div className="left p-1 bg-2 flex flex-col h-100 w-30">
                <h3>[ Team B ] - Todos</h3>
                <div className="text-center flex-grow  flex flex-col justify-center mb-4">
                    <h1 className='my-1'>Hello Friend!</h1>
                    <p className='my-1'>Enter your personal details and start your journey with us</p>
                    <Link to='/signup'>
                        <button className='btn my-2'>SIGN UP</button>
                    </Link>
                </div>
            </div>
            <div className="right text-center flex-grow flex flex-col justify-center text-color-3">
                <h1 className='text-color-1'>Sign in to Task Manager</h1>
                <p>or use your email account</p>
                <input className='w-inherit mx-2' type="text" placeholder="Email"/>
                <input className='w-inherit mx-2' type="password" placeholder="Password"/>
                <button className='btn my-2'>SIGN IN</button>
            </div>
        </div>
    )
}

export default SignIn
