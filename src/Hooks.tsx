import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void] {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    const setValue = (value: any) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
}

export function useFetch(url: string): [boolean, any] {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return [ loading, data ];
};
