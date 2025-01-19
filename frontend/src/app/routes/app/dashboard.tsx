import PnmLayout from '../../../components/layouts/pnm-layout';
import ActiveLayout from '../../../components/layouts/active-layout';
import useAuth from '../../../hooks/useAuth';
import ChapterList from '../../../features/chapter/components/chapter-list';
import PNMEvents from '../../../features/event/components/pnm-events';
import { useGetActiveMemebersQuery } from '../../../features/user/api/userApi';
import Spinner from '../../../components/ui/spinner/spinner';
import ActiveList from '../../../features/user/components/actives-list';
import { useNavigate } from 'react-router-dom';
import { useGetChapterQuery } from '../../../features/chapter/api/chapterApi';

const DashboardRoute = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const { data: actives = [], isLoading: isActiveMembersLoading } = useGetActiveMemebersQuery({ chapterId: auth?.chapter ?? '' }, { skip:  !auth?.chapter });
    const { data: chapter, isLoading: isGetChapterLoading } = useGetChapterQuery(auth?.chapter ?? '', { skip: !auth?.chapter});

    if (!auth || isActiveMembersLoading || isGetChapterLoading) {
        return (
            <ActiveLayout>
                <div className='flex h-full justify-center items-center'>
                    <Spinner/>
                </div>
            </ActiveLayout>
        )
    }

    if (auth?.roles.includes('PNM')) {
        return (
            <PnmLayout>
                <div className='flex flex-col p-4 gap-10'>
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-lg ml-2'>Find Chapters</p>
                        <ChapterList />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-lg ml-2'>My Events</p>
                        <PNMEvents />
                    </div>
                </div>
            </PnmLayout>
        );
    }
    
    return (
        <ActiveLayout>
            <div className='px-4 lg:px-14'>
                <div className='hidden lg:flex h-[184px] py-8'>
                    <div className='flex w-full justify-between gap-8'>
                        <div className='flex-1 h-full bg-white rounded-2xl flex items-center shadow drop-shadow'>
                            <div className='ml-10 font-bold text-3xl'>{chapter?.name}</div>
                        </div>
                        <button
                            type='button'
                            className='shadow drop-shadow hover:drop-shadow-xl flex flex-col w-40 bg-white h-full justify-center items-center rounded-2xl gap-3'
                            // onClick={() => navigate('/profile')}
                        >
                            <div className='h-16 w-16 rounded-full overflow-hidden'>
                                <img
                                    src={auth.profilePicture}
                                    alt='Profile Picture'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <p className='text-sm text-center'>{auth.name}</p>
                        </button>
                    </div>
                </div>
                <div className='lg:hidden flex mb-4'>
                    <div className='flex w-full justify-between'>
                        <div className='flex-1 h-full bg-white rounded-lg p-1 flex justify-center items-center shadow drop-shadow'>
                            <div className='font-bold text-xl'>{chapter?.name}</div>
                        </div>
                    </div>
                </div>
                <ActiveList actives={actives}/>
            </div>
        </ActiveLayout>
    );
}

export default DashboardRoute;