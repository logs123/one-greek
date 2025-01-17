import React from 'react';
import { useToggleFollowChapterMutation } from '../api/userApi';

interface PNMFollowButtonProps {
    userId: string;
    chapterId: string;
    isFolllowing: boolean;
}

const PNMFollowButton: React.FC<PNMFollowButtonProps> = ({ userId, chapterId, isFolllowing }) => {
    const [toggleFollowChapter, { isLoading }] = useToggleFollowChapterMutation();

    const handleToggle = async () => {
        try {
            await toggleFollowChapter({ userId, chapterId }).unwrap();
        } catch (error) {
            console.error('Error toggling follow:', error);
        }
    }

    return (
        <button
            type='button'
            disabled={isLoading}
            className={`py-1 px-2 rounded-lg text-white ${isFolllowing ? 'bg-deep-pacific-blue hover:bg-light-pacific-blue' : 'bg-pacific-blue hover:bg-turquoise-blue'}`}
            onClick={handleToggle}
        >
            {isFolllowing ? 'Unfollow' : 'Follow'}
        </button>
    );
}

export default PNMFollowButton;