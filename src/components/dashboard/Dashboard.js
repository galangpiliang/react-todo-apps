import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import profilePic from '../../assets/uploads/images/profile-picture-placeholder.jpg';

function Dashboard({match}) {
    const user = JSON.parse(localStorage.getItem('user'));
    let history = useHistory();

    console.log(match)

    useEffect(() => {
        if(!user){
            history.push('/signin')
        }
    })

    const doLogout = () => {
        localStorage.clear();
        history.push('/signin')
    }

    return (
        <div className='bg-4 text-black h-100'>
            <div className='flex justify-sb bg-1 text-white h-10 align-center'>
                <h3 className='mx-2'>[ Team B ] - Todos</h3>
                <h3 className='hover mx-2'><span onClick={() => doLogout()}>SIGN OUT</span></h3>
            </div>
            <div className="flex h-90">
                <div className="left h-fit p-1 flex flex-col w-30 text-center justify-center">
                    <img className='circle m-auto mw-10 mt-1 obj-cover' src={profilePic} alt="Profile"/>
                    <h2>{user? user.fullname : 'Empty Data'}</h2>
                    <button className='btn my-1'>My Day</button>
                    <button className='btn my-1'>Important</button>
                    <button className='btn my-1'>Completed</button>
                </div>
                <div className="right w-70 flex-grow flex flex-col text-color-3 pr-2">
                    <div className="wrapper flex align-center mt-2">
                        <input className='form-input flex-grow ml-0' type="text" placeholder='add task...'/>
                        <button className="btn">Add Task</button>
                    </div>
                    <div className="wrapper text-black scroll">
                        <ul className='p-0'>
                            <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'> Modi illum totam ad dolores eum atque Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, nobis iste modi quam quisquam veritatis fugiat, ipsa voluptas minus eius quis ab saepe qui quos odio pariatur laboriosam maxime perspiciatis?</p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li>
                            <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'> Lalala</p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li>
                            <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'> Modi illum totam ad dolores eum atque Lorem </p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li>
                            {/* <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'>4</p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li>
                            <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'>5</p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li>
                            <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'>6</p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li>
                            <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'>7</p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li>
                            <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'>8</p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li>
                            <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'>9</p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li>
                            <li className='flex align-center bg-white br px-1 my-1'>
                                <input type="checkbox" className='zoom'/>
                                <p className='mx-1 test'>10</p>
                                <button className='btn btn-sm mx-1 px-1'>Edit</button>
                                <button className='btn btn-sm px-1'>Delete</button>
                            </li> */}
                        </ul>
                    </div>
                    <div className="wrapper flex justify-center">
                        <h3 className="hover mx-1">&lt;</h3>
                        <h3 className="text-black mx-1">1</h3>
                        <h3 className="hover mx-1">2</h3>
                        <h3 className="hover mx-1">&gt;</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
