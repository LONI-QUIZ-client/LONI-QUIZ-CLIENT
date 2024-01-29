

const LOCAL_PORT = '8888';
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

// 로그인, 회원가입
const LOGIN = '/user/login';
const JOIN = '/user';


// 점수, 이미지생성
const imageCreate = '/game/lobbyChat/imageCreate';
const upScore = '/game/room/upScore';

// 채팅
const CHAT = '/game/lobbyChat'
const LOBBY = '/game/lobby';

export const LOGIN_URL = API_BASE_URL + LOGIN;
export const JOIN_URL = API_BASE_URL + JOIN;

export const LOBBY_URL = API_BASE_URL + LOBBY;
export const LOBBY_CHAT = API_BASE_URL + CHAT;

export const IMG_URL = API_BASE_URL + imageCreate;
export const SCORE_URL = API_BASE_URL + upScore;


