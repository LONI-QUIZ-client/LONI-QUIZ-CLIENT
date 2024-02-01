import React, {useState} from 'react';
import LoginRight from "./LoginRight";
import UserSideLeft from "./UserSideLeft";


const Login = () => {

    return (
        <div className={"user-login"}>
            <UserSideLeft />
            <LoginRight />
        </div>
    );
};

export default Login;