import { useCallback } from "react";
import useIsMount from "./useIsMount";

export default function useSafeAsyncAction() {
    const isMounted = useIsMount();

    const runSafeAsyncAction = useCallback((callback) => {
        if (isMounted()) {
            callback();
        }
    }, [isMounted]);

    return runSafeAsyncAction;
}