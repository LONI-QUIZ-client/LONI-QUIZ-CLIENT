import React from 'react';

const FriendListSection = () => {
    return (
        <div className='list_friend_menu'>
            <h2>Friend List</h2>
            <div className='list_friends_box'>
                <ul>
                    <li>
                        <p>Friend 1</p>
                        <button className='follow_btn'>언팔로우</button>
                    </li>
                    <li>
                        <p>Friend 2</p>
                        <button className='follow_btn'>언팔로우</button>
                    </li>
                    <li>
                        <p>Friend 3</p>
                        <button className='follow_btn'>언팔로우</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FriendListSection;