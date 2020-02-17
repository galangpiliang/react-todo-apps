import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link ,useHistory} from "react-router-dom";

function SignUp() {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if(user){
            history.push('/')
        }
    })

    const [input, setInput] = useState(
        {
            fullname: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    )

    const handleInput = e => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
    }
    
    const baseUrl = 'https://awesome-project-glints.herokuapp.com/api/v1';
    const doRegister = () => {
        axios.post(`${baseUrl}/users`, input)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.data))
                history.push("/");
            })
            .catch( error =>
                console.log(error)
            )
    }

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
                <input id='fullname' value={input.fullname} onChange={handleInput} className='w-inherit mx-2' type="text" placeholder="Name" required/>
                <input id='email' value={input.email} onChange={handleInput} className='w-inherit mx-2' type="text" placeholder="Email" required/>
                <input id='password' value={input.password} onChange={handleInput} className='w-inherit mx-2' type="password" placeholder="Password" required/>
                <input id='password_confirmation' value={input.password_confirmation} onChange={handleInput} className='w-inherit mx-2' type="password" placeholder="Confirm Password" required/>
                <button className='btn my-2' onClick={() => doRegister()}>SIGN UP</button>
            </div>
        </div>
    )
}

export default SignUp
