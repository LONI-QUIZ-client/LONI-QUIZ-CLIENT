const LOCAL_PORT = '8888';
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

const imageCreate = '/game/lobbyChat/imageCreate';
const upScore = '/game/room/upScore';

export const IMG_URL = API_BASE_URL + imageCreate;
export const SCORE_URL = API_BASE_URL + upScore;