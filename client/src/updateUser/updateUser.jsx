import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './updateUser.css';
import { Link } from 'react-router-dom';

const UpdateUser = () => {
    const serverUrl = process.env.REACT_APP_SERVER_API_URL;
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState({
        name: '',
        email: '',
        address: ''
    });

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${serverUrl}/api/update/user/${id}`, user)
        .then(res => {
            toast.success('User updated successfully');
            navigate('/');
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`${serverUrl}/api/user/${id}`)
        .then(res => {
            setUser(res.data);
        })
    }, [id]);

  return (
    <div className='updateUserForm'>
        <Link to='/'>
            <button className='btn btn-secondary my-3'><i className='fa fa-arrow-left'></i> Back</button>
        </Link>
        <h1>Update User</h1>
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

            <button type='submit' className='btn btn-primary my-3' onClick={handleSubmit}>Update User</button>
        </form>
    </div>
  )
}

export default UpdateUser