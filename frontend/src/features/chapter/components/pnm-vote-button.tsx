import React from 'react';
import { useTogglePNMFinalVoteMutation } from '../api/chapterApi';
import useAuth from '../../../hooks/useAuth';

interface PNMVoteButtonProps {
    pnmId: string;
    vote: string;
    semesterName: string;
    currentVote: string;
}

const PNMVoteButton: React.FC<PNMVoteButtonProps> = ({ pnmId, vote, semesterName, currentVote }) => {
    const auth = useAuth();
    const [toggleVote, { isLoading }] = useTogglePNMFinalVoteMutation();

    const handleVote = async () => {
        try {
            await toggleVote({ chapterId: auth?.chapter || '', semesterName, pnmId, vote }).unwrap();
        } catch (error) {
            console.error('Error voting on PNM', error);
        }
    }

    const isDisabled = vote === currentVote

    return (
        <button
            disabled={isDisabled || isLoading}   
            className={`flex px-3 py-1 text-xs sm:text-sm md:text-md rounded text-white
                ${vote === currentVote ? 'bg-gray-300' :
                    vote === 'yes' ? 'bg-green-500' :
                        vote === 'maybe' ? 'bg-[#FFD301]' :
                            'bg-[#D61F1F]'}`}    
            onClick={handleVote}
        >
            {vote.charAt(0).toUpperCase() + vote.slice(1)}
        </button>
    )
}

export default PNMVoteButton;