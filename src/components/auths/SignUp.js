import React from 'react';
import {Link} from "react-router-dom";

function SignUp() {
    return (
        <div className='SignUp flex bg-1 h-100'>
            <div className="left p-1 bg-2 flex flex-col h-100 w-30">
                <h3>[ Team B ] - Todos</h3>
                <div className="text-center flex-grow  flex flex-col justify-center mb-4">
                    <h1 className='my-1'>Welcome Back!</h1>
                    <p className='my-1'>To keep connected with us please login with your personal info</p>
                    <Link to='/signin'>
                        <button className='btn my-2'>SIGN IN</button>
                    </Link>
                </div>
            </div>
            <div className="right text-center flex-grow flex flex-col justify-center text-color-3">
                <h1 className='text-color-1'>Created Account</h1>
                <p>or use your email for registration</p>
                <input className='w-inherit mx-2' type="text" placeholder="Name"/>
                <input className='w-inherit mx-2' type="text" placeholder="Email"/>
                <input className='w-inherit mx-2' type="password" placeholder="Password"/>
                <input className='w-inherit mx-2' type="password" placeholder="Confirm Password"/>
                <button className='btn my-2'>SIGN UP</button>
            </div>
        </div>
    )
}

export default SignUp
