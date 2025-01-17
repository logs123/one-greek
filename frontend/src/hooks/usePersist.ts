import { useState, useEffect } from 'react';

const usePersist = () => {
    const [persist, setPersist] = useState(() => {
        const storedValue = localStorage.getItem('persist');
        return storedValue ? JSON.parse(storedValue) : false;
    });

    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist));
    }, [persist]);

    const enablePersist = () => setPersist(true);
    const disablePersist = () => setPersist(false);

    return { persist, enablePersist, disablePersist };
}

export default usePersist;