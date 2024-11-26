/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 11:43:08 PM
 *  Last update: 26 Nov 2024, 10:07:49 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { configureStore } from "@reduxjs/toolkit";

import eventsReducer from "./eventsSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        favorites: favoritesReducer,
    },
});

// export Redux typings
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];