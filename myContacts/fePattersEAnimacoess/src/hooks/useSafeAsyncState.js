import { useState, useCallback } from "react";
import useIsMount from "./useIsMount";

export default function useSafeAsyncState(initialState) {
    const [state, setState] = useState(initialState);

    const isMounted = useIsMount();

    const setSafeAsyncSate = useCallback((data) => {
        if (isMounted()) {
            setState(data);
        }
    }, [isMounted]);

    return [state, setSafeAsyncSate];
}