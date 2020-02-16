import React from 'react';
import {Link} from "react-router-dom";

function Dashboard() {
    return (
        <div>
            This is Dashboard component

            <Link to='/signin'>
                <button className='btn my-2'>SIGN IN</button>
            </Link>
        </div>
    )
}

export default Dashboard
