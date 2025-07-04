import React from 'react'
import './user.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const User = () => {
    const [users, setUsers] = useState([]);
    const serverUrl = process.env.REACT_APP_SERVER_API_URL;

    const fetchUsers = async () => {
        try{
            const response = await axios.get(`${serverUrl}/api/get-all`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`${serverUrl}/api/delete/user/${id}`)
            .then(res => {
                toast.success('User deleted successfully');
                fetchUsers();
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

  return (
    <div className='userTable'>
        <Link to='/add'>
            <button className='btn btn-primary'><i className='fa fa-plus'></i> Add User</button>
        </Link>

        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope='col'>No.</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user, index)=> {
                    return (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td className='actionButtons'>
                                <Link to={`/update/${user._id}`}>
                                    <button className='btn btn-primary'><i className='fa fa-edit'></i></button>
                                </Link>
                                <button className='btn btn-danger' onClick={() => handleDelete(user._id)}><i className='fa fa-trash'></i></button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default User