import React, { useState } from 'react';
import { ActiveUser } from '../../../types/userTypes';
import useAuth from '../../../hooks/useAuth';
import AdminButton from './admin-button';
import VerifyButton from './verify-button';

interface ActiveListProps {
    actives: ActiveUser[];
}

type Column = keyof ActiveUser;

const ActiveList: React.FC<ActiveListProps> = ({ actives }) => {
    const auth = useAuth();
    const [sortedColumn, setSortedColumn] = useState<Column | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: Column) => {
        const order = sortedColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortedColumn(column);
        setSortOrder(order);
    }

    const sortedUsers = auth?.roles.includes('Admin')
    ? [...actives]
        .sort((a, b) => {
            if (a.isVerified !== b.isVerified) {
                return a.isVerified ? 1 : -1;
            }
            if (!sortedColumn) return 0;
            if (a[sortedColumn] < b[sortedColumn]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortedColumn] > b[sortedColumn]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        })
    : [...actives]
        .filter(user => user.isVerified)
        .sort((a, b) => {
            if (!sortedColumn) return 0;
            if (a[sortedColumn] < b[sortedColumn]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortedColumn] > b[sortedColumn]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    function formatPhoneNumber(phoneNumber: string) {
        const cleaned = phoneNumber.replace(/\D/g, '');
    
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
            return `1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        } else {
            return phoneNumber;
        }
    }

    return (
        <div className='mx-auto overflow-x-auto'>
            <div className=''>
                <table className='w-full min-w-max'>
                    <thead>
                        <tr className='bg-[#7CAFC0]'>
                            <th className='rounded-tl-lg w-20 border border-[#DEEFF3]'></th>
                            <th
                                className='border border-[#DEEFF3] p-2 text-left text-xs sm:text-sm lg:text-base cursor-pointer hover:bg-[#93cfe3] text-white'
                                onClick={() => handleSort('lastName')}
                            >
                                Last Name
                            </th>
                            <th
                                className='border border-[#DEEFF3] p-2 text-left text-xs sm:text-sm lg:text-base cursor-pointer hover:bg-[#93cfe3] text-white'
                                onClick={() => handleSort('firstName')}
                            >
                                First Name
                            </th>
                            <th
                                className='border border-[#DEEFF3] p-2 text-left text-xs sm:text-sm lg:text-base cursor-pointer hover:bg-[#93cfe3] text-white'
                                onClick={() => handleSort('email')}
                            >
                                Email
                            </th>
                            <th
                                className={`${auth?.roles.includes('Admin') ? '' : 'rounded-tr-lg'} border border-[#DEEFF3] p-2 text-left text-xs sm:text-sm lg:text-base cursor-pointer hover:bg-[#93cfe3] text-white`}
                                onClick={() => handleSort('phoneNumber')}
                            >
                                Phone
                            </th>
                            {auth?.roles.includes('Admin') &&
                                <th className='w-20 border rounded-tr-lg border-[#DEEFF3] text-xs sm:text-sm text-white'>Verify</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((user) => (
                            <tr key={user._id} className='bg-white'>
                                <td className='border border-[#DEEFF3]'>
                                    <div className='flex p-1 justify-center'>
                                        {(auth?.roles.includes('Admin') && user.isVerified && user._id !== auth.id) ?
                                            <AdminButton
                                                userId={user._id}
                                                profilePicture={user.profilePicture}
                                                isAdmin={user.roles.includes('Admin')}
                                            />
                                        :
                                            <img
                                                src={user.profilePicture}
                                                alt='Profile Picture'
                                                className='w-10 h-10 rounded-full object-cover'
                                            />
                                        }
                                    </div>
                                </td>
                                <td className='p-2 border border-[#DEEFF3]'>{user.lastName}</td>
                                <td className='p-2 border border-[#DEEFF3]'>{user.firstName}</td>
                                <td className='p-2 border border-[#DEEFF3]'>{user.email}</td>
                                <td className='p-2 border border-[#DEEFF3]'>{formatPhoneNumber(user.phoneNumber)}</td>
                                {auth?.roles.includes('Admin') &&
                                    <td className='p-2 border border-[#DEEFF3] text-center align-middle'>
                                        {!user.isVerified &&
                                            <VerifyButton
                                                userId={user._id}
                                            />
                                        }
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ActiveList;