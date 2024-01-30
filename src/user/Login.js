import React, {useState} from 'react';
import LoginRight from "./LoginRight";
import UserSideLeft from "./UserSideLeft";

import "../user/scss/Login.scss";

const Login = () => {

    return (
        <div className={"user-login"}>
            <UserSideLeft />
            <LoginRight />
        </div>
    );
};

export default Login;