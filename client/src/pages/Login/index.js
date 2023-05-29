import React, { useEffect } from "react";
import {Form, Button, Input, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";

const rules = [{
    required: true,
    message: 'Required!'
}];

function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await LoginUser(values);
            if (response.success) {
                message.success(response.message);
                localStorage.setItem('token', response.data);
            } else {
                throw new Error(response.message);
            }
        } catch(error) {
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
                <h1>Login</h1>
                <Form layout="vertical"
                onFinish={onFinish}>
                    <Form.Item label='Email' name='email' rules={rules}>
                        <Input placeholder='Enter email...'></Input>
                    </Form.Item>
                    <Form.Item label='Password' name='password' rules={rules}>
                        <Input type="password" placeholder='Enter password...'></Input>
                    </Form.Item>
                    <Button className="mt-2" type="primary" htmlType="submit" block>
                        Login
                    </Button>
                    <div className="mt-5 text-center">
                        <span className="text-light">
                            Don't have an account? <Link to="/register">Register</Link>
                        </span> 
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;