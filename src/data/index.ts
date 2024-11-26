/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 10:53:39 AM
 *  Last update: 26 Nov 2024, 12:03:06 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Timestamp } from "firebase/firestore";

import { auth, Event } from "./firebase/config";
import { getAllEvents, getFavoritesForUser } from "./firebase/read";
import {
    addEvent as addEventDB,
    updateEvent as updateEventDB,
    deleteEvent as deleteEventDB,
    addFavorite as addFavoriteDB,
    removeFavorite as removeFavoriteDB
} from "./firebase/write";
import { AppDispatch } from "./state/store";
import {
    setEvents,
    addEvent as addEventThunk,
    updateEvent as updateEventThunk,
    deleteEvent as deleteEventThunk
} from "./state/eventsSlice";
import {
    setFavorites,
    addFavorite as addFavoriteThunk,
    removeFavorite as removeFavoriteThunk
} from "./state/favoritesSlice";

/**
 * Load all events from DB and save into state.
 * @param dispatch AppDispatch used to update state
 */
export async function loadEvents(dispatch: AppDispatch) {
    // get events from DB
    const events = await getAllEvents();
    
    // use dispatch to update state
    dispatch(setEvents(events));
}

/**
 * Load all favorites for the specified user from DB and save into state.
 * @param userID user ID to load for
 * @param dispatch AppDispatch used to update state
 */
export async function loadFavorites(userID: string, dispatch: AppDispatch) {
    // get favorites from DB
    const favorites = await getFavoritesForUser(userID);

    // use dispatch to update state
    dispatch(setFavorites(favorites));
}

/**
 * Add a new event to the DB and state.
 * @param creatorID user ID creating the event
 * @param title event title
 * @param description event description
 * @param startInstant instant of event start
 * @param location event location
 * @param dispatch AppDispatch used to update state
 */
export async function addEvent(creatorID: string, title: string, description: string, startInstant: Timestamp, location: string, dispatch: AppDispatch) {
    // create a new partial event object for adding to DB
    const newEvent: Partial<Event> = {
        creatorID,
        title,
        description,
        startInstant,
        location,
    };

    // first, add the event to the DB
    const eventID = await addEventDB(newEvent);

    // nothing to do if DB failed to add
    if (eventID === undefined) { return; }

    // update state with added event
    newEvent.id = eventID;
    dispatch(addEventThunk(newEvent as Event)); // cast to Event since we know all fields are satisfied
}

/**
 * Update an event in the DB and state.
 * @param updatedEvent event with updated details
 * @param dispatch AppDispatch used to update state
 */
export async function updateEvent(updatedEvent: Event, dispatch: AppDispatch) {
    // update the event in the DB
    const dbSuccess = await updateEventDB(updatedEvent);

    // nothing to do if DB failed
    if (!dbSuccess) { return; }

    // DB update succeeded, update state
    dispatch(updateEventThunk(updatedEvent));
}

/**
 * Delete an event from the DB and state.
 * @param eventID event ID to delete
 * @param dispatch AppDispatch used to update state
 */
export async function deleteEvent(eventID: string, dispatch: AppDispatch) {
    // delete the event from the DB
    const dbSuccess = await deleteEventDB(eventID);

    // nothing to do if DB failed
    if (!dbSuccess) { return; }

    // DB delete succeeded, update state
    dispatch(deleteEventThunk(eventID));
}

/**
 * Add a favorite to the logged in user's list of favorites.
 * @param eventID event ID to favorite
 * @param dispatch AppDispatch used to update state
 */
export async function addFavorite(eventID: string, dispatch: AppDispatch) {
    // get user ID from auth
    const userID = auth.currentUser?.uid;
    // can't make update if not logged in
    if (userID === undefined) {
        return;
    }

    // assume favoriting in DB will work and update state first
    dispatch(addFavoriteThunk(eventID));

    // run DB operation
    const dbSuccess = await addFavoriteDB(userID, eventID);

    // if DB failed, revert state
    if (!dbSuccess) {
        dispatch(removeFavoriteThunk(eventID));
    }
}

/**
 * Remove a favorite from the logged in user's list of favorites.
 * @param eventID event ID to unfavorite
 * @param dispatch AppDispatch used to update state
 */
export async function removeFavorite(eventID: string, dispatch: AppDispatch) {
    // get user ID from auth
    const userID = auth.currentUser?.uid;
    // can't make update if not logged in
    if (userID === undefined) {
        return;
    }

    // assume unfavoriting in DB will work and update state first
    dispatch(removeFavoriteThunk(eventID));

    // run DB operation
    const dbSuccess = await removeFavoriteDB(userID, eventID);

    // if DB failed, revert state
    if (!dbSuccess) {
        dispatch(addFavoriteThunk(eventID));
    }
}