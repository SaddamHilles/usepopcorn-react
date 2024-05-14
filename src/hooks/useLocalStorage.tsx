import { useEffect, useState } from 'react';

function useLocalStorage<T extends {length: number}>(initialValue: T, key: string){
    const [data, setData] = useState<T>(initialValue);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        function getLocalStorageData() {
            const storedWatched = JSON.parse(
                localStorage.getItem(key) || '[]'
            );
            setData(storedWatched);
        }
        try {
            setIsLoading(true);
            getLocalStorageData();
        } catch (er) {
            console.log(er);
        } finally {
            setIsLoading(false);
        }
    }, [key]);

    useEffect(() => {
        if (data !== undefined && data.length)
            localStorage.setItem('watched', JSON.stringify(data));
    }, [data]);

    return { data, setData, isLoading };
}

export default useLocalStorage;
