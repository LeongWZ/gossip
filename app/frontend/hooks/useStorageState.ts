/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

function useStorageState(key: string, initialState: any): [any, React.Dispatch<React.SetStateAction<any>>] {
    const [value, setValue] = React.useState<any>(
        localStorage.getItem(key) === null ? initialState : JSON.parse(localStorage.getItem(key) as string),
    );

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useStorageState;
