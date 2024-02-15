import React, { useEffect, useState } from 'react';
import { getCurrentLoginUser } from "../../config/login-util";

const FriendListSection = () => {
    const [followingStatus, setFollowingStatus] = useState([]);

    const userId = getCurrentLoginUser().id;

    const handleFollowToggle = (fi) => {
        setFollowingStatus(prevStatus => {
            const updatedStatus = prevStatus.map(item => {
                if (item.fi === fi) {
                    return { ...item, isFollowing: !item.isFollowing };
                }
                return item;
            });
            return updatedStatus;
        });
    };

    useEffect(() => {
        fetch("http://localhost:8888/follower/" + userId)
            .then(res => res.json())
            .then(json => {
                // 서버 응답 데이터를 활용하여 친구 목록 업데이트
                const serverFriends = json.map(item => ({
                    fi: item.fi,
                    isFollowing: false, // 기본적으로 모든 친구를 언팔로우 상태로 초기화
                }));
                setFollowingStatus(serverFriends);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [userId]);

    return (
        <div className='list_friend_menu'>
            <h2>Friend List</h2>
            <div className='list_friends_box'>
                <ul>
                    {followingStatus.map((friend, index) => (
                        <li key={index}>
                            <p>{friend.fi}</p>
                            <button className='follow_btn' onClick={() => handleFollowToggle(friend.fi)}>
                                {friend.isFollowing ? '언팔로우' : '팔로우'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FriendListSection;
