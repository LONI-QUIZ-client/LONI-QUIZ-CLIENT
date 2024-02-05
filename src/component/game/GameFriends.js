import React, {useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import '../scss/GameModal.scss';
import {FormControlLabel, Switch, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {Input} from "reactstrap";

const GameFriends = () => {
    const ariaLabel = { 'aria-label': 'description' };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='lobby_friends'>
            <button className='create_room_btn_friend' onClick={handleOpen}>Friends</button>
            <Modal
                className='friends_box'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ width: 300, bgcolor: 'background.paper', p: 2 ,borderRadius: 2, textAlign: 'center'}}>
                    <Input placeholder="Placeholder" inputProps={ariaLabel} />
                </Box>
            </Modal>
        </div>
    );
};

export default GameFriends;