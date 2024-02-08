import React, { useState } from 'react';

const FriendListSection = () => {
    const [followingStatus, setFollowingStatus] = useState({
        friend1: false,
        friend2: false,
        friend3: false,
    });

    const handleFollowToggle = (friend) => {
        setFollowingStatus(prevStatus => ({
            ...prevStatus,
            [friend]: !prevStatus[friend],
        }));
    };

    return (
        <div className='list_friend_menu'>
            <h2>Friend List</h2>
            <div className='list_friends_box'>
                <ul>
                    <li>
                        <p>Friend 1</p>
                        <button className='follow_btn' onClick={() => handleFollowToggle('friend1')}>
                            {followingStatus.friend1 ? '언팔로우' : '팔로우'}
                        </button>
                    </li>
                    <li>
                        <p>Friend 2</p>
                        <button className='follow_btn' onClick={() => handleFollowToggle('friend2')}>
                            {followingStatus.friend2 ? '언팔로우' : '팔로우'}
                        </button>
                    </li>
                    <li>
                        <p>Friend 3</p>
                        <button className='follow_btn' onClick={() => handleFollowToggle('friend3')}>
                            {followingStatus.friend3 ? '언팔로우' : '팔로우'}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FriendListSection;
