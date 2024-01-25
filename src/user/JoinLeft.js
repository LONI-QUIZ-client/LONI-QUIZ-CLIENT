import React from 'react';
import {Link} from "@mui/material";
import "../scss/JoinLeft.scss"

const JoinLeft = () => {
    return (
        <div className={'left-login-move'}>
            <div className={'join-introductory-article'}>
                <div className={'h1-join-title'}>
                    Unleash Your Creativity<br/> with Catch Mind
                </div>
                <div className={'h2-join-sub-title'}>
                    Embark on a journey<br/> where imagination meets innovation!<br/> Join us at Catch Mind,<br/> the ultimate destination for an extraordinary gaming experience<br/> powered by cutting-edge AI technology
                </div>
            </div>
            <div className={'if-login-can-user'}>
                Are you already a member?
                <Link href="/login" variant="body2" className={'login-link-move'}>login</Link>
            </div>
        </div>
    );
};

export default JoinLeft;