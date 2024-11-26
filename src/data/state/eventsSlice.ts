/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 11:51:38 PM
 *  Last update: 26 Nov 2024, 12:13:40 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Event } from "../firebase/config";

interface EventsState {
    events: Event[],
}

const initialState: EventsState = {
    events: [],
};

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        /**
         * Replace the entire set of events loaded in state.
         * Use for loading from the database for the first time.
         */
        setEvents: (state, action: PayloadAction<Event[]>) => {
            // make a copy of the input array or it may be garbage collected
            state.events = [...action.payload];
        },

        /**
         * Add a new event to the list of events.
         */
        addEvent: (state, action: PayloadAction<Event>) => {
            // need to make a copy of the array and object, in-place mutation won't work
            state.events = [...state.events, { ...action.payload }];
        },

        /**
         * Delete the event with the specified ID from the list.
         */
        deleteEvent: (state, action: PayloadAction<string>) => {
            // filter to all events except the one matching the specified ID
            state.events = state.events.filter((event) => event.id !== action.payload);
        },

        /**
         * Update the details for the specified date.
         */
        updateEvent: (state, action: PayloadAction<Event>) => {
            // first, copy array
            const newEvents = [...state.events];
            // then, find the index of the event to modify
            const eventIx = newEvents.findIndex((event) => event.id === action.payload.id);
            // if we didn't find it, do nothing
            if (eventIx === -1) { return; }
            // we found it, so update the event with a copy of the provided updates
            newEvents[eventIx] = { ...action.payload };
            // update state with the updated array
            state.events = newEvents;
        },
    },
});

export const { setEvents, addEvent, deleteEvent, updateEvent } = eventsSlice.actions;

export default eventsSlice.reducer;