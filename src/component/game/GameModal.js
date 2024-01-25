import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

const GameModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    <p id="modal-description">~방만들기 코너~</p>
                    <TextField id="outlined-basic" label="방 이름" variant="outlined" />
                    <TextField id="outlined-basic" label="라운드 수" variant="outlined" />
                    <TextField id="outlined-basic" label="유저 수" variant="outlined" />
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default GameModal;
