const LOCAL_PORT = '8888';
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

// 로그인, 회원가입
const LOGIN = '/user/login';
const JOIN = '/user';

// 사이드 이미지
const SIDE = '/side/side-menu';
// http://localhost:8888/side/side-menu

// 점수, 이미지생성
const imageCreate = '/game/lobbyChat/imageCreate';
const upScore = '/game/room/upScore';

// 채팅
const CHAT = '/game/lobbyChat';
const LOBBY = '/game/lobby';

const ROOM = '/game/Gameroom';

const PROFILE = '/user/profile-image';

// 카카오 로그인
const REACT_APP_REST_API_KEY = "b11f2fab760f545cb7340313e13ec03b"
export const REACT_APP_REDIRECT_URL = "http://localhost:3000/user/oauth"
export const REACT_API_REQUEST_URL = "http://localhost:8888/user/oauth"

const RANK = '/user/order/score';
const USEARCH = '/user/nickname';

//  팔로우
const FOLLOW = '/follower';

export const FOLLOW_URL = API_BASE_URL + FOLLOW;


export const LOGIN_URL = API_BASE_URL + LOGIN;
export const JOIN_URL = API_BASE_URL + JOIN;

export const SIDE_URL = API_BASE_URL + SIDE;

export const LOBBY_URL = API_BASE_URL + LOBBY;
export const LOBBY_CHAT = API_BASE_URL + CHAT;
export const LOBBY_RANK = API_BASE_URL + RANK;
export const USER_SEARCH = API_BASE_URL + USEARCH;

export const GAME_ROOM = API_BASE_URL + ROOM;
export const PROFILE_URL = API_BASE_URL + PROFILE;

export const IMG_URL = API_BASE_URL + imageCreate;
export const SCORE_URL = API_BASE_URL + upScore;
export const KAKAO_AUTH_URL
    = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=code`;