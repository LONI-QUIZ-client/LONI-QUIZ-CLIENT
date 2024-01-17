import React from 'react';

const SignIn = () => {
    return (
        <div className={"sign-in-full-screen"}>
            <div className={"sign-in-background"}>
                {/*회원가입 페이지 이동*/}
                <div className={"user-sign-up-move-button"}></div>
                {/*로그인 모달창*/}
                <div className={"user-sign-in-modal"}>
                    {/*로그인 입력*/}
                    <div className={"sign-in-items"}>
                        {/*id*/}
                        <div className={"sign-in-id-item"}>
                            <div className={"sign-in-id-icon-cell"}></div>
                            <input className={"sign-in-id-input"}/>
                        </div>
                        {/*password*/}
                        <div className={"sign-in-password-item"}>
                            <div className={"sign-in-password-icon-cell"}></div>
                            <input className={"sign-in-password-input"}/>
                        </div>
                        {/*auto-login-check*/}
                        <div className={"auto-sign-in-check"}></div>
                    </div>
                    {/*로그인 버튼*/}
                    <div className={"sign-in-buttons"}>
                        {/*로그인 실패시 오류 메시지*/}
                        <div className={"sign-in-error-message"}></div>
                        {/*loni-quiz 으로 로그인*/}
                        <div className={"loni-quiz-sign-in-button"}></div>
                        {/*kakao 으로 로그인*/}
                        <div className={"kakao-sign-in-button"}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;