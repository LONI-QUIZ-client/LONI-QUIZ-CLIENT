import React, { useEffect, useState } from 'react';
import { getCurrentLoginUser } from "../../config/login-util";

const FriendListSection = () => {
    const [followingStatus, setFollowingStatus] = useState([]);
    const [userId, setUserId] = useState(getCurrentLoginUser().id);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchFriendList = () => {
        fetch(`http://localhost:8888/follower/${userId}`)
            .then(res => res.json())
            .then(json => {
                const serverFriends = json.map(item => ({
                    fi: item.fi,
                    isFollowing: true,
                }));
                setFollowingStatus(serverFriends);
            })
            .catch(error => {
                console.error('Error fetching friend list:', error);
            });
    };

    const handleFollowToggle = async (fi) => {
        if (isUpdating) {
            // 이미 업데이트 중인 경우 중복 요청 방지
            return;
        }

        setIsUpdating(true);

        try {
            const res = await fetch("http://localhost:8888/follower/", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    fi: fi,
                    userId: userId
                })
            });

            const json = await res.json();

            if (json.updatedFollowingStatus) {
                setFollowingStatus(json.updatedFollowingStatus);
            }
        } catch (error) {
            console.error('Error following/unfollowing:', error);
        } finally {
            // 업데이트 완료 후 상태 변경
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        fetchFriendList();
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
