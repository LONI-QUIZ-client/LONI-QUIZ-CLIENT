import React from 'react';
import './scss/Button.scss';

import {Link, useNavigate} from 'react-router-dom';

const Button = () => {

        const nav = useNavigate();

        const entry = () => {
            nav('/lobby')
        }
    return (
        <div>
            <div className="button_container">
                <button className="btn" onClick={entry}><span>시작하기</span></button>
                {/*<>*/}
                {/*    <Link to={'/lobby'}>게임시작</Link>*/}
                {/*</>*/}
            </div>
        </div>
    );
};

export default Button;