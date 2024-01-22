import React from 'react';
import './scss/Main.scss';
import Button from "./Button";
import Header from "./Header";

const Main = () => {
    return (
        <div>
            <div className='container'>
                <Header/>
                <div className='main-box'>
                    <div className='l-g'>
                        <h1 className='logo'>LONI<br/>QUIZ</h1>
                        <p>AI가 만든 이미지로 퀴즈 게임을 즐겨보세요</p>
                        <Button/>
                    </div>
                </div>
            </div>
            <div className='content-box'>
                <h1 className='content-title'>AI 이미지 생성 기술은 처음이신가요?
                </h1>
                <p></p>
                <div className="box-wrap">
                    <div className='img-1'>
                        <div className="t-box">
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + "/img/ASD.jpeg"} alt="Hover Effect"/>
                            </div>
                            <div className="info">
                                <h3>Design</h3>
                                <p>일러스트를 이용한 디자인입니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className='img-2'>
                        <div className="t-box">
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + "/img/Main.png"} alt="Hover Effect"/>
                            </div>
                            <div className="info">
                                <h3>Design</h3>
                                <p>일러스트를 이용한 디자인입니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className='img-3'>
                        <div className="t-box">
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + "/img/AS.png"} alt="Hover Effect"/>
                            </div>
                            <div className="info">
                                <h3>Design</h3>
                                <p>일러스트를 이용한 디자인입니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom-box'>
                <div className='main-box'>
                    <div className='l-g'>
                        <h1 className='logo'>LONI<br/>QUIZ</h1>
                        <p>AI가 만든 이미지로 퀴즈 게임을 즐겨보세요</p>
                        <Button/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;