import React, {useEffect, useState, Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import profilePic from '../../assets/uploads/images/profile-picture-placeholder.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

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
    const setToken = {
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
            })
            .catch( error =>
                console.log(error)
            )
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
            })
            .catch( error =>
                console.log(error)
            )
    }

    const doUpdateProfile = (name,email) => {
        const data = new FormData() 
        data.append('image', inputFile)
        let userData = {
            fullname: inputUser[name],
            // email: input[email],
            image: data
        }
        console.log(data)
        axios.put(`${baseUrl}/users`, data, setToken)
            .then(res => {
                console.log(res.data)
                setUser({
                    ...user,
                    ...res.data.data
                })
                localStorage.setItem('user', JSON.stringify(user))
            })
            .catch( error =>
                console.log(error)
            )
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
            })
            .catch( error =>
                console.log(error)
            )
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
            })
            .catch( error =>
                console.log(error)
            )
    }

    const deleteTodo = (id) => {
        axios.delete(`${baseUrl}/tasks/?id=${id}`, setToken)
            .then(res => {
                getTodos()
            })
            .catch( error =>
                console.log(error)
            )
    }

    const doLogout = () => {
        localStorage.clear();
        history.push('/signin')
    }

    const doToggle = (todo) => {
        console.log(todo)
        setToggle({
            [todo._id]: !toggle[todo._id]
        })
        setInput({
            [todo._id]: todo.title
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
        console.log(e.target.files[0])
        setInputFile(e.target.files[0])
    }    

    useEffect(() => {
        if(!user){
            history.push('/signin')
        }
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
            <div className="modal hide">
                <div className="modal-content">
                    <input id='userName' type="text" className="updateprofil" value={inputUser['userName']} placeholder={user.fullname} onChange={handleInputUser}/>
                    <input id='userEmail' type="email" className="updateprofil" value={inputUser['userEmail']} placeholder={user.email} onChange={handleInputUser}/>
                    <input id='userImage' type="file" className="updateprofil" onChange={handleInputFile}/>
                    <button onClick={() => doUpdateProfile('userName','userEmail')}>Update</button>
                </div>
            </div>
            <div className='flex justify-sb bg-1 text-white h-10 align-center'>
                <h3 className='mx-2'>[ Team B ] - doDo</h3>
                <h3 className='hover mx-2'><span onClick={() => doLogout()}>SIGN OUT</span></h3>
            </div>
            <div className="flex h-90">
                <div className="left h-fit p-1 flex flex-col w-30 text-center justify-center">
                    <img className='circle m-auto h-10rem mw-10 mt-1 obj-cover' src={user? user.image : profilePic} alt="Profile"/>
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
                <div className="right w-70 flex-grow flex flex-col text-color-3 pr-2">
                    <div className="wrapper flex align-center mt-2">
                        <input id='form-addTask' className='form-input flex-grow ml-0' type="text" placeholder='add task...' value={input['form-addTask'] ? input['form-addTask'] : ''} onChange={handleInput}/>
                        <button className="btn" onClick={() => addTodo(input['form-addTask'])}>Add Task</button>
                    </div>
                    <div className="wrapper text-black scroll">
                        <ul className='p-0'>
                            {
                                Object.keys(todos).map(i => {
                                    let todo = todos[i];
                                    return(
                                        <li className='flex align-center bg-white br px-1 my-1' key={todo._id}>
                                            <input type="checkbox" className='zoom' onClick={() => doComplete(todo._id)} checked={todo.completion}/>
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
