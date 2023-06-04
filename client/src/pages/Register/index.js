/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [{
    required: true,
    message: 'Required!'
}];

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            const response = await RegisterUser(values);
            navigate('/login');
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
     }, []);

    return(
        <div className="vh-100 text-light d-flex justify-content-center align-items-center container">
            <div className="custom-card p-4 rounded col-md-5">
                <h1>Register</h1>
                <Form layout="vertical"
                onFinish={onFinish}>
                    <Form.Item label='Name' name='name' rules={rules}>
                        <Input placeholder='Enter name...'></Input>
                    </Form.Item>
                    <Form.Item label='Email' name='email' rules={rules}>
                        <Input placeholder='Enter email...'></Input>
                    </Form.Item>
                    <Form.Item label='Password' name='password' rules={rules}>
                        <Input type="password" placeholder='Enter password...'></Input>
                    </Form.Item>
                    <Button className="mt-2" type="primary" htmlType="submit" block>
                        Register
                    </Button>
                    <div className="mt-5 text-center">
                        <span className="text-light">
                            Have an account? <Link to="/login">Login</Link>
                        </span> 
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register;