import React, {useState, useEffect} from 'react';
import {Link ,useHistory} from "react-router-dom";
import axios from 'axios';

function SignIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    let history = useHistory();

    useEffect(() => {
        if(user){
            history.push('/')
        }
    })

    const [input, setInput] = useState(
        {
            email: '',
            password: '',
        }
    )

    const handleInput = e => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
    }

    const baseUrl = 'https://awesome-project-glints.herokuapp.com/api/v1';
    const doLogin = () => {
        axios.post(`${baseUrl}/auth/login`, input)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.data))
                history.push("/");
            })
            .catch(error => 
                console.log(error)
            )
    }
    
    return (
        <div className='SignUp flex bg-white h-100'>
            <div className="left p-1 bg-1 flex flex-col h-100 w-30">
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
                <input id='email' value={input.email} onChange={handleInput} className='form-input w-inherit mx-2' type="text" placeholder="Email" required/>
                <input id='password' value={input.password} onChange={handleInput} className='form-input w-inherit mx-2' type="password" placeholder="Password" required/>
                <button className='btn my-2' onClick={() => doLogin()}>SIGN IN</button>
            </div>
        </div>
    )
}

export default SignIn
