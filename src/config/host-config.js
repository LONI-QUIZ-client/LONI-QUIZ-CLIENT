

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

const RANK = '/user/order/score';
const USEARCH = '/user/nickname';

export const LOGIN_URL = API_BASE_URL + LOGIN;
export const JOIN_URL = API_BASE_URL + JOIN;

export const SIDE_URL = API_BASE_URL + SIDE;

export const LOBBY_URL = API_BASE_URL + LOBBY;
export const LOBBY_CHAT = API_BASE_URL + CHAT;
export const LOBBY_RANK = API_BASE_URL + RANK;
export const USER_SEARCH = API_BASE_URL + USEARCH;

export const GAME_ROOM = API_BASE_URL + ROOM;

export const IMG_URL = API_BASE_URL + imageCreate;
export const SCORE_URL = API_BASE_URL + upScore;