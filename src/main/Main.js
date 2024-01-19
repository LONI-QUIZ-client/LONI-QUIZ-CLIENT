import React from 'react';
import './scss/Main.scss';
import Button from "./Button";
import Header from "./Header";
import 'animate.css';

const Main = () => {
    return (
        <div>
            <div className='main-box'>
                <div className='l-g'>
                    <h1 className='logo'>LONI<br/>QUIZ</h1>
                    <p>AI가 만든 이미지로 퀴즈 게임을 즐겨보세요</p>
                    <Button/>
                </div>
                <div className='r-g'>
                    <div className="t-img">
                        <div className="box-wrap">
                            <div className="t-box">
                                <div className="img">
                                    <img src={process.env.PUBLIC_URL + "/img/ASD.jpeg"} alt="Hover Effect"/>
                                </div>
                                <div className="info">
                                    <h3>Design</h3>
                                    <p>일러스트를 이용한 디자인입니다.</p>
                                </div>
                            </div>
                            <div className="t-box">
                                <div className="img">
                                    <img src={process.env.PUBLIC_URL + "/img/Main.png"} alt="Hover Effect"/>
                                </div>
                                <div className="info">
                                    <h3>Design</h3>
                                    <p>일러스트를 이용한 디자인입니다.</p>
                                </div>
                            </div>
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
                    <div className="box-wrap">
                        <div className="b-box">
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + "/img/gigi.jpg"} alt="Hover Effect"/>
                            </div>
                            <div class="info">
                                <h3>Design</h3>
                                <p>일러스트를 이용한 디자인입니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;