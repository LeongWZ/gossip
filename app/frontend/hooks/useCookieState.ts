import * as React from "react";
import Cookies from "js-cookie";

function useCookieState(
    key: string,
    initialState: string | undefined,
): [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>, () => void] {
    const [value, setValue] = React.useState<string | undefined>(Cookies.get(key) || initialState);

    React.useEffect(() => {
        if (value !== undefined) {
            // Cookie set to expire in 7 days from login
            Cookies.set(key, value, { expires: 7, sameSite: "strict" });
        }
    }, [key, value]);

    const removeValueCookie = () => {
        Cookies.remove(key);
    };

    return [value, setValue, removeValueCookie];
}

export default useCookieState;
