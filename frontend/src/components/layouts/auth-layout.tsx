import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
    return (
        <div className='flex flex-col h-screen lg:flex-row w-full justify-center gap-8 lg:gap-60'>
            {children}
        </div>
    );
}

export default AuthLayout;