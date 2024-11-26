/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 12:19:27 PM
 *  Last update: 26 Nov 2024, 12:45:36 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useEffect } from "react";
import { loadEvents, loadFavorites } from "../../../data";
import { useAppDispatch } from "../../../data/state/hooks";

interface Props {
    /** Function to call when loading is finished */
    onLoaded: () => void,
}

export function AppLoader({ onLoaded }: Props): JSX.Element {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // use an async IIFE to run effects asynchronously
        (async () => {
            await loadEvents(dispatch);
            await loadFavorites(dispatch);

            onLoaded();
        })();
    }, [])

    return <></>;
}