import React, {useEffect, useState} from 'react';
import './scss/Main.scss';
import Button from "./Button";
import Header from "./Header";
import Slider from "./Slider";

const Main = () => {

    // 스크롤 이벤트 테스트중
    const [scrollPosition, setScrollPosition] = useState(0);

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScroll);
    }, []);
    return (
        <div className='outer'>
            <section className='section'>
                <div className='inner container'>
                    <Header/>
                    <div className='main-box'>
                        <div className='l-g'>
                            <h1 className='logo'>LONI<br/>QUIZ</h1>
                            <p>AI가 만든 이미지로 퀴즈 게임을 즐겨보세요</p>
                            <div className={scrollPosition > 40 ? "scroll-text" : "scrolled-text"}>스크롤되면 색이 변함</div>
                            <Button/>
                        </div>
                    </div>
                </div>
            </section>
            <section className='inner section'>
                <div className='content-box'>
                    <h1 className='content-title'>AI 이미지 생성 기술은 처음이신가요?</h1>
                    <p>아래 사진들은 ai 이미지 생성 기술로 만들어진 사진들입니다 당신도 자신만의 이미지를 만들어보세요!</p>
                    <div className="box-wrap">
                        <div className='img-1'>
                            <div className="t-box">
                                <img src={process.env.PUBLIC_URL + "/img/ASD.jpeg"} alt="Hover Effect"/>

                                <div className="info">
                                    <h3>Design</h3>
                                    <p>일러스트를 이용한 디자인입니다.</p>
                                </div>
                            </div>
                        </div>
                        <div className='img-2'>
                            <div className="t-box">
                                <img src={process.env.PUBLIC_URL + "/img/Main.png"} alt="Hover Effect"/>

                                <div className="info">
                                    <h3>Design</h3>
                                    <p>일러스트를 이용한 디자인입니다.</p>
                                </div>
                            </div>
                        </div>
                        <div className='img-3'>
                            <div className="t-box">
                                <img src={process.env.PUBLIC_URL + "/img/AS.png"} alt="Hover Effect"/>
                                <div className="info">
                                    <h3>Design</h3>
                                    <p>일러스트를 이용한 디자인입니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='inner section'>
                <div className='bottom-box'>
                    <footer>
                        <Slider/>
                    </footer>
                </div>
            </section>
        </div>
    );
};

export default Main;