import React, {useEffect, useRef, useState} from 'react';
import './scss/Main.scss';
import Button from "./Button";
import Header from "./Header";
import Slider from "./Slider";
import Dots from "./Dots";

const Main = () => {
    const DIVIDER_HEIGHT = 5;
    const outerDivRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const wheelHandler = (e) => {
            console.log(e)
            e.preventDefault();
            const {deltaY} = e;
            const {scrollTop} = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
            const pageHeight = window.innerHeight; // 화면 세로길이, 100vh

            if (deltaY > 0) {
                // 스크롤 내릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    //현재 1페이지
                    console.log("현재 1페이지, down");
                    outerDivRef.current.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: "smooth",
                    });
                    setCurrentPage(2);
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                    //현재 2페이지
                    console.log("현재 2페이지, down");
                    outerDivRef.current.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: "smooth",
                    });
                    setCurrentPage(3);
                } else {
                    // 현재 3페이지
                    console.log("현재 3페이지, down");
                    outerDivRef.current.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            } else {
                // 스크롤 올릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    //현재 1페이지
                    console.log("현재 1페이지, up");
                    outerDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                    //현재 2페이지
                    console.log("현재 2페이지, up");
                    outerDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                    setCurrentPage(1);
                } else {
                    // 현재 3페이지
                    console.log("현재 3페이지, up");
                    outerDivRef.current.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: "smooth",
                    });
                    setCurrentPage(2);
                }
            }
        };
        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener("wheel", wheelHandler);
        return () => {
            outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
        };
    }, []);

    return (
        <div ref={outerDivRef} className='outer'>
            <div className='inner section'>
                <div className='container' style={{backgroundImage: 'url("process.env.PUBLIC_URL + "/img/minn.jpg"")'}}>
                    <div className='header-logo'>
                        <img src={process.env.PUBLIC_URL + "/img/project-logo.png"} alt=""/>
                    </div>
                    <div className='main-box'>
                        <div className='l-g'>
                            <h1 className='logo'>
                                <span className='red-text'>AI</span>
                                -powered creativity<br/>shaping innovative <span className='red-text'>brands</span>.
                            </h1>
                            <button disabled className={'btn-style1 btn4'}>PLAY</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className='inner section'>
                <div className='content-box'>
                <h1 className='content-title'>AI 이미지 생성 기술은 처음이신가요?</h1>
                    <p>아래 사진들은 ai 이미지 생성 기술로 만들어진 사진들입니다 당신도 자신만의 이미지를 만들어보세요!</p>
                    <div className="box-wrap">
                        <div className='img-1'>
                            <div className="t-box">
                                <img src={process.env.PUBLIC_URL + "/img/ASD.jpeg"} alt="Hover Effect"/>
                                <div className="info">
                                    <h3>사용된 제시어</h3>
                                    <p>#beautiful lady, #(freckles), #big smile, #ruby eyes,
                                        #pigtails hair, #dark makeup, #hyperdetailed photography,
                                        #soft light, #head and shoulders portrait, #cover</p>
                                </div>
                            </div>
                        </div>
                        <div className='img-2'>
                            <div className="t-box">
                                <img src={process.env.PUBLIC_URL + "/img/Main.png"} alt="Hover Effect"/>
                                <div className="info">
                                    <h3>사용된 제시어</h3>
                                    <p>#chameleon, #hyperrealistic photography of a bioorganic entity. gold-blue-purple faceted skin,
                                        #very intricate and detailed details. technology very apparent on the body,
                                        #fantastic feeling. High quality photo that highlights the enchanting aspects. high resolution,
                                        #photographic masterpiece, #8K,</p>
                                </div>
                            </div>
                        </div>
                        <div className='img-3'>
                            <div className="t-box">
                                <img src={process.env.PUBLIC_URL + "/img/AS.png"} alt="Hover Effect"/>
                                <div className="info">
                                    <h3>사용된 제시어</h3>
                                    <p>#subsurface scattering, #Photorealistic, #Hyperrealistic, #analog style, #realistic, #film photography, #soft lighting, #heavy shadow</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className='inner section'>
                <div className='bottom-box'>
                    <div className='info'>
                        <div className='info-text'>
                            <div className='text-area'>
                                <h2>프로젝트 소개</h2>
                                <p>저희 LONI QUIZ는 카카오에서 제공하는 Karlo라는 AI 이미지 생성 API를
                                    활용하여 만들어진 퀴즈 게임입니다.
                                    <br/>
                                    LONI QUIZ는 AI 기술과 퀴즈 게임의 재미를 결합한 독특한 프로젝트로,<br/>
                                    사용자들에게 새로운 경험과 재미를 제공하기 위해 노력할것입니다.</p>
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + "/img/mi.jpg"} alt=""/>
                    </div>
                    <footer>
                        <Slider/>
                        <hr/>
                        <div>
                            <table className='footer-table'>
                                <li><a href=""><img src={process.env.PUBLIC_URL + "/img/rogogo.png"} alt=""/></a></li>
                                <li><a href="https://github.com/LONI-QUIZ-client/LONI-QUIZ-CLIENT" target='_blank'>GIT HUB</a></li>
                                <li><a href="#">고객지원</a></li>
                                <li><a href="">팀원 소개</a></li>
                                <li><a href="#">게시판(개발예정)</a></li>
                            </table>
                        </div>
                    </footer>
                </div>
            </div>
            <div className="dots-header-wrapper">
                <Dots currentPage={currentPage}/>
            </div>
        </div>
    );
};

export default Main;