import PnmLayout from '../../../components/layouts/pnm-layout';
import ActiveLayout from '../../../components/layouts/active-layout';
import useAuth from '../../../hooks/useAuth';

const ProfileRoute = () => {
    const auth = useAuth();

    if (auth?.roles.includes('PNM')) {
        return (
            <PnmLayout>
                <div className=''>
                    <div className='flex flex-col items-center px-20 py-4 mt-4 ml-4 rounded-2xl w-fit bg-white'>
                        <img
                            src={auth.profilePicture}
                            alt='Profile Picture'
                            className='h-32 w-32 rounded-full object-cover'
                        />
                        <p className=''>{auth.name}</p>
                        <p>{auth.email}</p>
                        <p>{auth.phoneNumber}</p>
                        <p>{auth.studentId}</p>
                        {auth.socialMediaHandles?.Instagram && (<p>{auth.socialMediaHandles.Instagram}</p>)}
                        {auth.socialMediaHandles?.LinkedIn && ( <p>{auth.socialMediaHandles.LinkedIn}</p>)}
                        <p>{auth.pnmInfo?.city}</p>
                    </div>
                </div>
            </PnmLayout>
        );
    }
    
    return (
        <ActiveLayout>
            <div className='hidden lg:flex h-[184px] py-8'>
                <div className='flex w-full justify-between gap-8'>
                    <div className='flex-1 h-full bg-white rounded-2xl flex items-center shadow drop-shadow'>
                        <div className='ml-10 font-bold text-3xl'>Profile</div>
                    </div>
                </div>
            </div>
            <div className='lg:hidden flex mb-4'>
                <div className='flex w-full justify-between'>
                    <div className='flex-1 h-full bg-white rounded-lg p-1 flex justify-center items-center shadow drop-shadow'>
                        <div className='font-bold text-xl'>Profile</div>
                    </div>
                </div>
            </div>
        </ActiveLayout>
    );
}

export default ProfileRoute;