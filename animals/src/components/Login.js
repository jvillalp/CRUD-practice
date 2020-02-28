import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

export default function Login(props) {
    // How can we log in? What do we need to do?
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });
    const handleChange = e => {
        // e.preventDefault();
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })
    };
    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
                .post('login/', login)
                .then(response => {
                    localStorage.setItem('token', response.data.payload);
                    //may need to change
                    props.history.push('/dashbord');
                })
                .catch(error => {
                    console.log(`This is not good, ${error}`)
    })
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input
               type='text'
               placeholder="UserName"
               label="UserName"
               name='username'
               value={login.username} 
               onChange={handleChange}
               className='input'
            />
            <input
               type='password'
               placeholder="Password"
               label="Password"
               name="password"
               value={login.password} 
               onChange={handleChange}
               className='input'
            />
            <button className='start'>Login</button>
            </form>
        </div>
    )
}