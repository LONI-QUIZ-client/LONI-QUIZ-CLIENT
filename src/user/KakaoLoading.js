import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {REACT_APP_REDIRECT_URL} from "../config/host-config";

const KakaoLoading = (props) => {
    const redirect = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        const kakaoLogin = async () => {
            try {
                const response = await fetch(`${REACT_APP_REDIRECT_URL}/?code=${code}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        "Access-Control-Allow-Origin": "*",
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                // Save necessary information like name to localStorage
                localStorage.setItem("name", data.account.kakaoName);
                // Redirect to the desired page after successful login
                redirect("/lobby");
            } catch (error) {
                console.error('Error during Kakao login:', error);
                // Handle error as needed
            }
        };

        kakaoLogin();
    }, [props.history]);
    return (
        <div className="KakaoLoading">
            <p>로그인 처리 중</p>
        </div>
    );
};

export default KakaoLoading;