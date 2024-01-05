import * as React from "react";

export default function useStorageState(
    key: string,
    initialState: string,
): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [value, setValue] = React.useState<string>(localStorage.getItem(key) || initialState);

    React.useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
}
