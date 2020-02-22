import React, {useState, useEffect} from 'react';
import {Link ,useHistory} from "react-router-dom";
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

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

    const doForgot = () => {
        axios.post(`${baseUrl}/recover`, input)
            .then(res => {
                // localStorage.setItem('user', JSON.stringify(res.data.data))
                // history.push("/");
                console.log(res.data.message)
                alert(res.data.message)
            })
            .catch(error => 
                console.log(error)
            )
    }
  
    let onSuccess = response => {
      console.log(response)
      let token = response.tokenObj.access_token
      console.log(token)
      axios
        .get(`${baseUrl}/auth/google`,{headers:{
          Authorization: 'Bearer '+ token
        }})
        .then(res => {
          console.log(res)
          localStorage.setItem('user', JSON.stringify(res.data.data))
            history.push("/");
        })
        .catch(err => {
          alert('Error')
        })
    }
  
    let onFailure = response => {
      console.warn('Error', response)
    }
    
    return (
        <div className='SignUp flex bg-white h-100'>
            <div className="left p-1 bg-1 flex flex-col h-100 w-30">
                <h3>[ Team B ] - doDo</h3>
                <div className="text-center flex-grow  flex flex-col justify-center mb-4">
                    <h1 className='my-1'>Hello Friend!</h1>
                    <p className='my-1'>Enter your personal details and start your journey with us</p>
                    <Link to='/signup'>
                        <button className='btn my-2'>SIGN UP</button>
                    </Link>
                </div>
            </div>
            <div className="right text-center flex-grow flex flex-col justify-center text-color-3">
                <img className='obj-cover mw-10 mx-auto' src='https://ik.imagekit.io/m1ke1magek1t/default_image/doDO_Logo_90Nm1gqE1.png' alt="Logo app"/>
                <h1 className='text-color-1'>Sign in to Task Manager</h1>
                {
                    <GoogleLogin
                        clientId="416752608242-u24e8no7j06rq8lnniuk3290oa5kbgrl.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        className='w-10 mx-auto'
                    />
                }
                <input id='email' value={input.email} onChange={handleInput} className='form-input w-inherit mx-2' type="text" placeholder="Email" required/>
                <input id='password' value={input.password} onChange={handleInput} className='form-input w-inherit mx-2' type="password" placeholder="Password" required/>
                <button className='btn my-2 m-auto' onClick={() => doLogin()}>SIGN IN</button>
                <span className='hover' onClick={doForgot}>Forgot your password?</span>
            </div>
        </div>
    )
}

export default SignIn
