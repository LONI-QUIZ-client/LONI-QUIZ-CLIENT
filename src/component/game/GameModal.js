import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../scss/GameModal.scss';
import { LOBBY_URL } from "../../config/host-config";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import {useNavigate} from "react-router-dom";

const GameModal = () => {
    const [open, setOpen] = useState(false);
    const [totalRounds, setTotalRounds] = useState(1);
    const [maxUsers, setMaxUsers] = useState(2);
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState('');
    const [roomName, setRoomName] = useState("테스트 방"); // 기본값 설정
    const userId = "oyg12345";

    const redirect = useNavigate();

    const handleOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateRoom = () => {
        fetch(LOBBY_URL + "?page=1&amount=6", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: roomName,
                lobbyMaxRound: totalRounds,
                secret: isPrivate,
                maxCount: maxUsers,
                userId: userId,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });

        redirect('/gameRoom');
        handleClose();
    };



    return (
        <div>
            <button className='create_room_btn' onClick={handleOpen}>Create Room</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ width: 300, bgcolor: 'background.paper', p: 2 }}>
                    <h2 id="modal-title">Create Room</h2>
                    <TextField
                        id="outlined-basic"
                        label="방 이름"
                        variant="outlined"
                        value={roomName} // 방 이름에 상태 변수 사용
                        onChange={(e) => setRoomName(e.target.value)} // 사용자가 입력한 경우 상태 변수 업데이트
                    />
                    <FormControlLabel
                        sx={{
                            display: 'block',
                        }}
                        control={
                            <Switch
                                name="isPrivate"
                                color="primary"
                                checked={isPrivate}
                                onChange={() => setIsPrivate(!isPrivate)}
                            />
                        }
                        label="비밀방"
                    />
                    {isPrivate && (
                        <TextField
                            id="outlined-password-input"
                            label="비밀방 비밀번호"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}
                    <TextField
                        id="filled-number"
                        label="총 라운드 수"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        value={totalRounds}
                        onChange={(e) => setTotalRounds(Math.max(1, Math.min(4, Number(e.target.value))))}
                    />
                    <TextField
                        id="filled-number_two"
                        label="입장 유저 수"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        value={maxUsers}
                        onChange={(e) => setMaxUsers(Math.max(2, Math.min(6, Number(e.target.value))))}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleCreateRoom}>
                        Create!
                    </Button>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default GameModal;
