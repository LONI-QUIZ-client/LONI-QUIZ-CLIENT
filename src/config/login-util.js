
export const TOKEN = 'ACCESS_TOKEN';
export const ID = "USER_ID";
export const USERNAME = 'USER_NAME';

// 로그인 여부를 확인하는 함수
export const isLogin = () => !!sessionStorage.getItem(TOKEN);
export const isAutoLogin = () => !!localStorage.getItem(TOKEN);

// 로그인한 사용자의 데이터를 반환하는 함수
export const getCurrentLoginUser = () => {
    return {
        token: sessionStorage.getItem(TOKEN),
        id: sessionStorage.getItem(ID),
        username: sessionStorage.getItem(USERNAME),
    };
};

export const getAutoCurrentLoginUser = () => {
    return {
        token: localStorage.getItem(TOKEN),
        id: localStorage.getItem(ID),
        username: localStorage.getItem(USERNAME),
    };
};

export const getLoginUserCheck = () => {
    if(isLogin()){
        return getCurrentLoginUser();
    } else if(isAutoLogin()){
        return getAutoCurrentLoginUser();
    }
}

