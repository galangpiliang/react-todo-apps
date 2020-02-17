import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";

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
        window.location.reload(); 
    }

    return (
        <div style={{color:'black'}}>
            <h1>This is Dashboard component {user? user.fullname : 'kosong bos'}</h1>
            <hr/>
            <Link to='/signin'>
                <button className='btn my-2' onClick={() => doLogout()}>SIGN OUT</button>
            </Link>
        </div>
    )
}

export default Dashboard
