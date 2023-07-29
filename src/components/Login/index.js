import React, { useState, useTransition } from "react";
import { Button, Form, Input, notification, Spin } from "antd";
import { useDispatch } from "react-redux";
import { userLoginAsync } from "./userSlice";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        // console.log('Success:', values);

        try {
            const response = await dispatch(userLoginAsync(values));
            const userToken = response.payload;
            if (userToken) {
                notification.success({
                    message: "Login Success",
                    description: "You have successfully logged in!",
                });

                localStorage.setItem("accessToken", userToken);
                navigate("/home");
            } else {
                notification.error({
                    message: "Login Failed",
                    description: "Invalid username or password!",
                });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Spin spinning={isLoading}>
            <div className="login-background">
                <div className="content">
                    <div className="logoBlock">
                        <div className="logo">
                            <img
                                src="data:image/png;base64,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"
                                alt=""
                            />
                        </div>
                        <p>
                            Welcome to
                            <a href="/">
                                <span> ANZEN VẬN TẢI</span>
                            </a>
                        </p>
                    </div>
                    <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <div className="regBlock">
                                <span>Website giới thiệu của </span>
                                <a href="/">ANZEN vận tải</a>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Spin>
    );
};

export default Login;
