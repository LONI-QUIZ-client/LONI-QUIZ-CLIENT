import React from 'react';
import './scss/Main.scss';
import Button from "./Button";
import Header from "./Header";

const Main = () => {
    return (
        <div>
            <Header/>
            <div className='main-box'>
                <div className='l-g'>
                    <h1 className='logo'>LONI<br/>QUIZ</h1>
                    <p>AI가 만든 이미지로 퀴즈 게임을 즐겨보세요</p>
                    <Button/>
                </div>
                <div className='r-g'>
                    <div className="t-img">
                        <img src={process.env.PUBLIC_URL + "/img/AS.png"} alt="img" width="380px" height="550px"/>
                        <img src={process.env.PUBLIC_URL + "/img/Main.png"} alt="img" width="380px" height="550px"/>
                        <img src={process.env.PUBLIC_URL + "/img/ain.jpeg"} alt="img" width="380px" height="550px"/>
                    </div>
                    <div className="b-img">
                        <img src={process.env.PUBLIC_URL + "/img/gigi.jpg"} alt="img" width="1000px" height="600"/>
                    </div>
                </div>
            </div>
            <section>
                <div className="middle">
                    <h2>asd</h2>
                </div>
            </section>
        </div>
    );
};

export default Main;