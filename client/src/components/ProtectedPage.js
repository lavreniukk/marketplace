import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';

function ProtectedPage({ children }) {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateToken = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetCurrentUser();
            dispatch(SetLoader(false));
            if (response.success) {
                dispatch(SetUser(response.data));
            } else {
                navigate('/login');
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            navigate('/login');
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
        } else {
            message.error('Please login to continue');
            navigate('/login');
        }
    }, []);

    return (
        <div>{user && (
            <div>
                <div className='d-flex justify-content-between align-items-center styled-nav p-4'>
                    <h1 className='text-light'>MARKETPLACE</h1>

                    <div className='py-2 px-3 rounded bg-white d-flex align-items-center'>
                        <i className="ri-user-line me-2"></i>
                        <span className='text-decoration-underline cursor-pointer uppercase' onClick={() => {
                            navigate('/profile');
                        }}>{user.name}</span>
                        <i className="ri-login-box-line ms-5 cursor-pointer" onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/login');
                        }}>
                        </i>
                    </div>
                </div>
                <div className='text-light py-4 px-5'>
                    {children}
                </div>
            </div>
        )}
        </div>
    )
};

export default ProtectedPage;