import Spinner from '../../../components/ui/spinner/spinner';
import useAuth from '../../../hooks/useAuth';
import PNMFollowButton from '../../user/components/pnm-follow-button';
import { useGetPNMChaptersQuery } from '../api/chapterApi';

const ChapterList = () => {
    const auth = useAuth();

    const { data: chapters = [], isLoading } = useGetPNMChaptersQuery(auth?.id ?? '', { skip: !auth?.id });

    const sortedChapters = [...chapters].sort((a, b) => {
        if (a.isFollowing && !b.isFollowing) return -1;
        if (!a.isFollowing && b.isFollowing) return 1;

        return a.name.localeCompare(b.name);
    })

    if (!auth || isLoading) {
        return (
            <div className='flex justify-center items-center h-36 bg-white max-w-lg rounded-lg shadow-lg p-4'>
                <Spinner/>
            </div>
        )
    }

    return (
        <div className='bg-white max-w-lg rounded-lg shadow-lg p-4'>
            <div className='h-36 overflow-y-auto'>
                <ul className='divide-y divide-gray-100'>
                    {sortedChapters?.map((chapter) => (
                        <li
                            key={chapter.chapterId}
                            className='flex justify-between items-center py-1 px-2'
                        >
                            <p>
                                {chapter.name}
                            </p>
                            <PNMFollowButton userId={auth.id} chapterId={chapter.chapterId} isFolllowing={chapter.isFollowing} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChapterList;