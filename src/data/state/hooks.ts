/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 11:49:52 PM
 *  Last update: 26 Nov 2024, 8:48:49 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

import { Event } from "../firebase/config";

// custom hook wrappers to provide type support
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

/**
 * @returns the current list of events in state, sorted chronologically, then by title.
 */
export function useEventList(): Event[] {
    const events = useAppSelector((state) => state.events.events);

    return sortEventList(events);
}

/**
 * @returns the current list of favorite events in state, sorted chronologically, then by title.
 */
export function useFavorites(): Event[] {
    const events = useAppSelector((state) => state.events.events);
    const favorites = useAppSelector((state) => state.favorites.favorites);

    return sortEventList(events.filter((event) => favorites.includes(event.id)));
}

/**
 * Sort the given list of events chronologically, then by title.
 * @param events event list to sort
 * @returns sorted event list
 */
function sortEventList(events: Event[]) {
    return [...events].sort((e1, e2) => {
        // get time diff in chronological order (oldest to newest)
        let diff = (e1.startInstant.seconds / 60) - (e2.startInstant.seconds / 60);

        // if events are at the same time, sort by title
        if (diff === 0) {
            diff = e1.title.localeCompare(e2.title);
        }

        return diff;
    });
}