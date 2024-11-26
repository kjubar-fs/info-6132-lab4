/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 10:03:50 AM
 *  Last update: 26 Nov 2024, 10:06:30 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
    favorites: string[],
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        /**
         * Replace the entire set of favorites loaded in state.
         * Use for loading from the database for the first time.
         */
        setFavorites: (state, action: PayloadAction<string[]>) => {
            // make a copy of the input array or it may be garbage collected
            state.favorites = [...action.payload];
        },

        /**
         * Add a new favorite to the list of favorites.
         */
        addFavorite: (state, action: PayloadAction<string>) => {
            // need to make a copy of the array and object, in-place mutation won't work
            state.favorites = [...state.favorites, action.payload];
        },

        /**
         * Remove the favorite with the specified ID from the list.
         */
        removeFavorite: (state, action: PayloadAction<string>) => {
            // filter to all events except the one matching the specified ID
            state.favorites = state.favorites.filter((favoriteId) => favoriteId !== action.payload);
        },
    },
});

export const { setFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;