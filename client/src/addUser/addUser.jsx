import React from 'react'
import { useState } from 'react'
import './addUser.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const AddUser = () => {
    const serverUrl = process.env.REACT_APP_SERVER_API_URL;
    
    const users = {
        name: '',
        email: '',
        address: ''
    };

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${serverUrl}/api/create`, user)
        .then(res => {
            toast.success('User added successfully');
            navigate('/');
        })
        .catch(err => {
            console.log(err);
        })
    }
    
  return (
    <div className='addUserForm'>
        <Link to='/'>
            <button className='btn btn-secondary my-3'><i className='fa fa-arrow-left'></i> Back</button>
        </Link>
        <h1>Add User form</h1>
        <form>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' className='form-control' id='name' name='name' value={user.name} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' className='form-control' id='email' name='email' value={user.email} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='address'>Address</label>
                <input type='text' className='form-control' id='address' name='address' value={user.address} onChange={handleChange} />
            </div>
            <button type='submit' className='btn btn-primary my-3' onClick={handleSubmit}>Add User</button>
        </form>
    </div>
  )
}

export default AddUser