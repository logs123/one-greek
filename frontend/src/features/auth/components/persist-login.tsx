import { useSelector } from 'react-redux';
import usePersist from '../../../hooks/usePersist';
import { selectCurrentToken } from '../../../slices/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from '../api/authApi';
import { Outlet } from 'react-router-dom';
import Spinner from '../../../components/ui/spinner/spinner';

const PersistLogin = () => {
    const { persist } = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                    setTrueSuccess(true);
                } catch (err) {
                    console.error(err);
                }
            }

            if (!token && persist) verifyRefreshToken();
        }

        return () => {
            effectRan.current = true;
        }
    }, [persist, refresh, token]);

    let content;

    if (!persist) {
        content = <Outlet />
    } else if (isLoading) {
        content = (
            <div className='flex justify-center items-center h-svh w-full'>
                <Spinner />
            </div>
        )
    } else if (isError) {
        content = <Outlet />
    } else if (isSuccess && trueSuccess) {
        content = <Outlet />
    } else if (token && isUninitialized) {
        content = <Outlet />
    }

    return content;
}

export default PersistLogin;