import PnmLayout from '../../../components/layouts/pnm-layout';
import ActiveLayout from '../../../components/layouts/active-layout';
import useAuth from '../../../hooks/useAuth';

const ProfileRoute = () => {
    const auth = useAuth();

    console.log(auth)

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
            <div>Active</div>
        </ActiveLayout>
    );
}

export default ProfileRoute;