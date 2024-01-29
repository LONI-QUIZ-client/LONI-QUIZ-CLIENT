const LOCAL_PORT = '8888';

const imageCreate = '/game/lobbyChat/imageCreate';
const upScore = '/game/room/upScore';

const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

const CHAT = '/game/lobbyChat'
const LOBBY = '/game/lobby';

export const LOBBY_URL = API_BASE_URL + LOBBY;
export const LOBBY_CHAT = API_BASE_URL + CHAT;

export const IMG_URL = API_BASE_URL + imageCreate;
export const SCORE_URL = API_BASE_URL + upScore;

