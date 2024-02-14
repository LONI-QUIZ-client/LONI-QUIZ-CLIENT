import React, {useEffect, useState} from 'react';
import './scss/Header.scss';
import {getAutoCurrentLoginUser, getCurrentLoginUser, isLogin} from "../../config/login-util";
import {useNavigate} from "react-router-dom";
import starImage from "../../assets/img/star.png";
import logoImage from "../../user/scss/img/project-logo.png";
import {PROFILE_URL} from "../../config/host-config";

const Header = () => {
    const [HimageFile, setHImageFile] = useState(null);
    const currentUser = (isLogin() ? getCurrentLoginUser() : getAutoCurrentLoginUser());
    const currentUserNickname = currentUser?.username || '';
    const userId = currentUser?.id || '';
    const nav = useNavigate();
    const logoutHandler = e => {
        localStorage.clear();
        nav('/')
        // setImgUrl(null);
        // redirection('/login');
    };

    const fetchProfileImageHeader = async () => {
        const res = await fetch(PROFILE_URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + currentUser.token
            }
        });

        if (res.status === 200) {
            const profileData = await res.blob();
            const HimageFile = window.URL.createObjectURL(profileData);
            setHImageFile(HimageFile);
        } else {
            const errMsg = await res.text();
            alert(errMsg);
            setHImageFile(null);
        }
    };
    useEffect(() => {
        currentUserNickname && fetchProfileImageHeader();
    }, [currentUserNickname]);
    return (
        <div className="h-box">
            <img src={logoImage} alt="asd" className='header_logo'/>
            <div className="header">
                <table>
                    <tbody>
                        <tr>
                            <td className="header-table">
                                <li>
                                    <div>
                                        <img src={HimageFile || starImage} alt='미니 프로필 사진'  className='header_profile_image'/>
                                    </div>
                                </li>
                                <li>
                                    {/*<a href="/login">로그인/회원가입</a>*/}
                                    {
                                        isLogin()
                                            ?
                                            (
                                                <button className='header-login-btn' onClick={logoutHandler}>
                                                    로그아웃
                                                </button>
                                            )
                                            :
                                            (
                                                <a href="/login">로그인</a>
                                            )
                                    }
                                </li>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Header;