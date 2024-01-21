/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

function useStorageState(key: string, initialState: any): [any, React.Dispatch<React.SetStateAction<any>>] {
    const safeParse = (json_string: string): any => {
        let parsedObject = undefined;

        try {
            parsedObject = JSON.parse(json_string);
        } catch (err) {
            parsedObject = initialState;
            console.error(
                `JSON parsing failed in useStorageState(${key}, ${initialState}). ` +
                    `Reverting value back to initialState: ${initialState}.`,
            );
        }

        return parsedObject;
    };

    const [value, setValue] = React.useState<any>(
        localStorage.getItem(key) === null ? initialState : safeParse(localStorage.getItem(key) as string),
    );

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useStorageState;
