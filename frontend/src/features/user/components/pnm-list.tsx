import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PNMUser } from '../../../types/userTypes';
import PNMVoteButton from '../../chapter/components/pnm-vote-button';

interface PNMListProps {
    pnms: PNMUser[];
    onPNMInfoOpen: () => void;
    setSelectedPNM: (pnm: string) => void;
    setFilteredPNMs: (pnmList: PNMUser[]) => void;
    isTableView: boolean;
}

const PNMList: React.FC<PNMListProps> = ({ pnms, onPNMInfoOpen, setSelectedPNM, setFilteredPNMs }) => {
    const [filter, setFilter] = useState<string | null>(null);
    const previousFilteredPnms = useRef<PNMUser[]>([]);

    const sortedPnms = useMemo(() => {
        return [...pnms].sort((a, b) =>
            a.pnm.firstName.localeCompare(b.pnm.firstName)
        );
    }, [pnms]);

    const filteredPnms = useMemo(() => {
        if (!filter) return sortedPnms;
        return sortedPnms.filter((pnm) => {
            const vote = pnm.userVote || 'pending';
            return vote === filter;
        });
    }, [sortedPnms, filter]);

    useEffect(() => {
        if (JSON.stringify(filteredPnms) !== JSON.stringify(previousFilteredPnms.current)) {
            previousFilteredPnms.current = filteredPnms;
            setFilteredPNMs(filteredPnms);
        }
    }, [filteredPnms, setFilteredPNMs]);

    return (
        <div className="flex flex-col">
            {/* Filter Buttons */}
            <div className="flex justify-evenly text-sm lg:text-md bg-[#E4EFF3] sticky top-28 pb-4 z-10">
                <button
                    type="button"
                    className={`px-4 py-2 rounded text-white ${
                        filter === null ? 'bg-gray-300 text-black' : 'bg-pacific-blue hover:bg-turquoise-blue text-white'
                    }`}
                    onClick={() => setFilter(null)}
                >
                    All
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded ${
                        filter === 'pending' ? 'bg-gray-300 text-black' : 'bg-pacific-blue hover:bg-turquoise-blue text-white'
                    }`}
                    onClick={() => setFilter('pending')}
                >
                    Undecided
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded text-white ${
                        filter === 'yes' ? 'bg-gray-300 text-black' : 'bg-pacific-blue hover:bg-turquoise-blue text-white'
                    }`}
                    onClick={() => setFilter('yes')}
                >
                    Yes
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded text-white ${
                        filter === 'maybe' ? 'bg-gray-300 text-black' : 'bg-pacific-blue hover:bg-turquoise-blue text-white'
                    }`}
                    onClick={() => setFilter('maybe')}
                >
                    Maybe
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded text-white ${
                        filter === 'no' ? 'bg-gray-300 text-black' : 'bg-pacific-blue hover:bg-turquoise-blue text-white'
                    }`}
                    onClick={() => setFilter('no')}
                >
                    No
                </button>
            </div>

            {/* PNM Grid */}
            <div className="px-4 lg:px-14 lg:py-4 h-[calc(100vh-240px)] overflow-y-auto">
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPnms.map((pnm) => (
                        <div
                            key={pnm.pnm._id}
                            className="bg-white shadow-lg mb-2 drop-shadow-lg rounded-lg flex flex-col justify-center items-center"
                        >
                            <button
                                type="button"
                                className="p-4 flex flex-col w-full justify-center items-center gap-2 hover:brightness-75"
                                onClick={() => {
                                    setSelectedPNM(pnm.pnm._id);
                                    onPNMInfoOpen();
                                }}
                            >
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    <img
                                        src={pnm.pnm.profilePicture}
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="font-bold">
                                    {pnm.pnm.firstName} {pnm.pnm.lastName}
                                </p>
                            </button>
                            <div className="flex gap-1 p-4">
                                <PNMVoteButton
                                    pnmId={pnm.pnm._id}
                                    vote="yes"
                                    semesterName="Spring 2025"
                                    currentVote={pnm.userVote}
                                />
                                <PNMVoteButton
                                    pnmId={pnm.pnm._id}
                                    vote="maybe"
                                    semesterName="Spring 2025"
                                    currentVote={pnm.userVote}
                                />
                                <PNMVoteButton
                                    pnmId={pnm.pnm._id}
                                    vote="no"
                                    semesterName="Spring 2025"
                                    currentVote={pnm.userVote}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PNMList;
