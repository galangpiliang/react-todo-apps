import React, {useEffect, useState, Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import profilePic from '../../assets/uploads/images/profile-picture-placeholder.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import './Dashboard.scss';

function Dashboard({match}) {
    const history = useHistory();

    const [user, setUser] = useState({...JSON.parse(localStorage.getItem('user'))})
    const [toggle, setToggle] = useState({})
    const [todos, setTodos] = useState({})
    const [response, setResponse] = useState({})
    const [input, setInput] = useState({})
    const [inputUser, setInputUser] = useState({})
    const [inputFile, setInputFile] = useState(null)
    const [filter, setFilter] = useState({
        type: false,
        value: false,
        page: 1
    })

    const baseUrl = 'https://awesome-project-glints.herokuapp.com/api/v1';
    let setToken = {
        headers: {
            "Authorization" : (user ? user.token : false)
        }
    }

    const d = new Date();
    let curDate = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2)
        ].join('-');

    const getTodos = () => {
        let link = `${baseUrl}/tasks?page=${filter.page}`;

        if(filter.type) link = `${baseUrl}/tasks/filter/${filter.type}?value=${filter.value}&page=${filter.page}`

        axios.get(link,setToken)
            .then(res => {
                setResponse(res.data.data)
                setTodos(res.data.data.docs)
            })
            .catch( error =>
                console.log(error)
            )
    }

    const addTodo = (title) => {
        let task = {
            "title": title,
            "dueDate": curDate,
            "importanceLevel": 1
        }
        axios.post(`${baseUrl}/tasks`, task, setToken)
            .then(res => {
                setInput({})
                doPage(1)
                alert('Data successfully added')
            })
            .catch( error => {
                console.log(error)
                alert('Data unsuccessfully added! please try again or contact the website admin')
            })
    }

    const doUpdate = (id) => {
        let todo = todos.find(todo => todo._id === id)
        let task = {
            title: input[id]
        }
        axios.put(`${baseUrl}/tasks?id=${todo._id}`, task, setToken)
            .then(res => {
                getTodos()
                doToggle(id)
                alert('Data successfully updated')
            })
            .catch( error => {
                console.log(error)
                alert('Data unsuccessfully updated! please try again or contact the website admin')
            })
    }

    const doUpdateProfile = (name,email) => {
        let userData = {
            fullname: inputUser[name],
            email: inputUser[email]
        }
        axios.put(`${baseUrl}/users`, userData, setToken)
            .then(res => {
                let updatedUser = {
                    ...user,
                    ...res.data.data
                }
                setUser(updatedUser)
                localStorage.setItem('user', JSON.stringify(updatedUser))
                alert('Data successfully updated')
            })
            .catch( error => {
                console.log(error)
                alert('Data unsuccessfully updated! please try again or contact the website admin')
            })
    }

    const doUploadImage = () => {
        const data = new FormData() 
        data.append('image', inputFile)
        axios.put(`${baseUrl}/users`, data, setToken)
            .then(res => {
                console.log(res.data)
                setUser({
                    ...user,
                    ...res.data.data
                })
                localStorage.setItem('user', JSON.stringify(user))
                alert('Data successfully updated')
            })
            .catch( error => {
                console.log(error)
                alert('Data unsuccessfully updated! please try again or contact the website admin')
            })
    }

    const doComplete = (id) => {
        let todo = todos.find(todo => todo._id === id)
        let task = {
            completion: !todo.completion
        }
        axios.put(`${baseUrl}/tasks?id=${todo._id}`, task, setToken)
            .then(res => {
                console.log('update task')
                getTodos()
                alert('Data successfully updated')
            })
            .catch( error => {
                console.log(error)
                alert('Data unsuccessfully updated! please try again or contact the website admin')
            })
    }

    const doImportanceLevel = (id) => {
        let todo = todos.find(todo => todo._id === id)
        let task = {
            importanceLevel: todo.importanceLevel === 1 ? 3 : 1
        }
        console.log('doImportanceLevel')
        axios.put(`${baseUrl}/tasks?id=${todo._id}`, task, setToken)
            .then(res => {
                getTodos()
                alert('Data successfully updated')
            })
            .catch( error => {
                console.log(error)
                alert('Data unsuccessfully updated! please try again or contact the website admin')
            })
    }

    const deleteTodo = (id) => {
        axios.delete(`${baseUrl}/tasks/?id=${id}`, setToken)
            .then(res => {
                getTodos()
                alert('Data successfully deleted')
            })
            .catch( error => {
                console.log(error)
                alert('Data unsuccessfully deleted! please try again or contact the website admin')
            })
    }

    const doLogout = () => {
        localStorage.clear();
        alert('You are successfully Logout')
        history.push('/signin')
    }

    const doToggle = (input) => {
        typeof input === "string"
        ?   setToggle({
                [input]: !toggle[input]
            }) 
        :   setToggle({
                [input._id]: !toggle[input._id]
            })
            setInput({
                [input._id]: input.title
            })
    }

    const doPage = (num) => {
        setFilter({
            ...filter,
            page: num
        })
    }

    const handleInput = (e) => {
        setInput({
            [e.target.id]: e.target.value
        })
    }

    const handleInputUser = (e) => {
        setInputUser({
            ...inputUser,
            [e.target.id]: e.target.value
        })
    }

    const handleInputFile = (e) => {
        setInputFile(e.target.files[0])
    }    

    useEffect(() => {
        if(!user){
            history.push('/signin')
        }
        setInputUser({
            ['userName']: user.fullname,
            ['userEmail']: user.email
        })
        // setToken = {
        //     headers: {
        //         "Authorization" : (user ? user.token : false)
        //     }
        // }
        console.log('asd',setToken)
        getTodos()
    },[filter,setUser])

    const pagination = [];
    
    if(response.prevPage) pagination.push(<h3 key='page-prev' className="hover mx-1" onClick={ () => doPage(response.prevPage) }>&lt;</h3>)
    for (let i = 1; i <= response.totalPages; i++) {
        pagination.push(
            (response.page === i) 
            ? <h3 key={'page-'+i} className="text-black mx-1">{i}</h3>
            : <h3 key={'page-'+i} className="hover mx-1" onClick={ () => doPage(i) }>{i}</h3>
        )   
    }
    if(response.nextPage) pagination.push(<h3 key='page-next' className="hover mx-1" onClick={ () => doPage(response.nextPage) }>&gt;</h3>)

    return (
        <div className='bg-4 text-black h-100'>
            {
                !toggle['modalProfile'] ? false :
                <div className="modal flex w-100 h-100">
                    <div className="modal-content align-center m-auto flex flex-col minw-30 br">
                        <h1>Update Profile</h1>
                        <input id='userName' type="text" className='form-input w-100' value={inputUser['userName']} placeholder={user.fullname} onChange={handleInputUser}/>
                        <input id='userEmail' type="email" className='form-input w-100' value={inputUser['userEmail']} placeholder={user.email} onChange={handleInputUser}/>
                        <div className="wrapper flex">
                            <button className='btn mt-1' onClick={() => doToggle('modalProfile')}>Close</button>
                            <button className='btn mt-1 ml-1' onClick={() => {doToggle('modalProfile');doUpdateProfile('userName','userEmail')}}>Update</button>
                        </div>
                    </div>
                </div>
            }
            {
                !toggle['modalUpload'] ? false :
                <div className="modal flex w-100 h-100">
                    <div className="modal-content align-center m-auto flex flex-col minw-30 br">
                        <h1>Upload Image</h1>
                        <input id='userImage' type="file" className='form-input w-100' onChange={handleInputFile}/>
                        <div className="wrapper flex">
                            <button className='btn mt-1' onClick={() => doToggle('modalUpload')}>Close</button>
                            <button className='btn mt-1 ml-1' onClick={() => {doUploadImage();doToggle('modalUpload')}}>Upload</button>
                        </div>
                    </div>
                </div>
            }
            <div className='flex justify-sb bg-1 text-white h-10 align-center'>
                <h3 className='mx-2'>[ Team B ] - doDo</h3>
                <div className="wrapper flex">
                    <h4 className='hover'><span onClick={() => doToggle('modalProfile')}>Update Profile</span></h4>
                    <h4 className='hover mx-2'><span onClick={() => doLogout()}>SIGN OUT</span></h4>
                </div>
            </div>
            <div className="flex h-90 croll">
                <div className="left h-fit p-1 flex flex-col w-30 w-tablet-auto text-center justify-center">
                    <div class="profile-image relative">
                        <img className='circle m-auto h-10rem mw-10 mt-1 obj-cover' src={user? user.image : profilePic} alt="Profile"/>
                        <div class="overlay br">
                            <button className='btn my-1' onClick={() => doToggle('modalUpload')}>Change Image</button>
                        </div>
                    </div>
                    <h2>{user? user.fullname : 'Empty Data'}</h2>
                    <button className='btn my-1' onClick={ () => setFilter({
                        type: false,
                        value: 1,
                        page: 1
                    })}>All Task</button>
                    <button className='btn my-1' onClick={ () => setFilter({
                        type: 'importance',
                        value: filter.value > 1 ? 1 : 3,
                        page: 1
                    })}>{filter.value > 1 ? 'Important' : 'Unimportant'}</button>
                    <button className='btn my-1' onClick={ () => setFilter({
                        type: 'completion',
                        value: filter.value === true ? false : true,
                        page: 1
                    })}>{filter.value === true ? 'Completed' : 'Uncompleted'}</button>
                </div>
                <div className="right flex-grow flex flex-col text-color-3 pr-2">
                    <div className="wrapper flex align-center mt-2">
                        <input id='form-addTask' className='form-input flex-grow ml-0' type="text" placeholder='add task...' value={input['form-addTask'] ? input['form-addTask'] : ''} onChange={handleInput}/>
                        <button className="btn" onClick={() => addTodo(input['form-addTask'])}>Add Task</button>
                    </div>
                    <div className="wrapper flex-grow text-black scroll">
                        <ul className='p-0'>
                            {
                                todos.length < 1 
                                ?<h4 className='text-center'>Task is empty, let's create a task using the input form above...</h4>
                                :Object.keys(todos).map(i => {
                                    let todo = todos[i];
                                    return(
                                        <li className='flex align-center bg-white br px-1 my-1' key={todo._id}>
                                            <input type="checkbox" className='zoom' onChange={() => doComplete(todo._id)} checked={todo.completion}/>
                                            {   
                                                !toggle[todo._id]   
                                                ?(
                                                    <Fragment>
                                                        <p className={`mx-1 text-ellipsis ${todo.completion ? 'text-strike' : false}`}>{todo.title}</p>
                                                        <button className='btn btn-sm px-1' onClick={() => doImportanceLevel(todo._id)}><FontAwesomeIcon icon={todo.importanceLevel > 1 ? faStar : farStar }/></button>
                                                        <button className='btn btn-sm mx-1 px-1'
                                                            onClick={() => doToggle(todo)}
                                                            name={todo._id}
                                                        ><FontAwesomeIcon icon={faEdit}/></button>
                                                        <button className='btn btn-sm px-1' onClick={ () => deleteTodo(todo._id)}><FontAwesomeIcon icon={faTrash}/></button>
                                                    </Fragment>
                                                )                 
                                                :(
                                                    <Fragment>
                                                        <input id={todo._id} type="text" className='form-input flex-grow' autoFocus value={input[todo._id]} onChange={handleInput}/>
                                                        <button className='btn btn-sm px-1'
                                                            onClick={() => doToggle(todo)}
                                                            name={todo._id}>Cancel</button>
                                                        <button className='btn btn-sm px-1 ml-1' onClick={() => doUpdate(todo._id)}>Update</button>
                                                    </Fragment>
                                                )
                                            }         
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="wrapper flex justify-center">
                        {pagination}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
