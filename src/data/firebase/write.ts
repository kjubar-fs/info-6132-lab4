/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 10:18:28 AM
 *  Last update: 26 Nov 2024, 11:25:00 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { db, Event, eventsCollection, favoritesCollection } from "./config";

/**
 * Add a new event to the database.
 * @param event Event data to add
 * @returns ID of the created event, or undefined if failed
 */
export async function addEvent(event: Partial<Event>): Promise<string | undefined> {
    // delete ID field if it exists, as we want to use what Firebase generates
    delete event.id;

    try {
        // add to DB and get ID back
        const eventDoc = await addDoc(collection(db, eventsCollection), { ...event });
        return eventDoc.id;
    } catch (error) {
        // caught an error, log it and return failure
        console.error("Error adding event:", error);
        return undefined;
    }
}

/**
 * Update the specified event in the database.
 * @param updatedEvent Event with updated data
 * @returns true if successful, false if failed
 */
export async function updateEvent(updatedEvent: Event): Promise<boolean> {
    // extract ID from event, as we don't want to save that to the DB
    const { id, ...toUpdate } = updatedEvent;

    try {
        // update in the database
        await updateDoc(doc(db, eventsCollection, id), toUpdate);

        // if we got here, it was successful
        return true;
    } catch (error) {
        // caught an error, log it and return failure
        console.error(`Error updating event ${id}:`, error);
        return false;
    }
}

/**
 * Delete the specified event from the database.
 * @param eventID event ID to delete
 * @returns true if successful, false if failed
 */
export async function deleteEvent(eventID: string): Promise<boolean> {
    try {
        // delete from database
        await deleteDoc(doc(db, eventsCollection, eventID));
        
        // if we got here, it was successful
        return true;
    } catch (error) {
        // caught an error, log it and return failure
        console.error(`Error deleting event ${eventID}:`, error);
        return false;
    }
}

/**
 * Add a new event to the list of favorites for the specified user.
 * @param userID user ID to add for
 * @param eventID event ID to favorite
 * @returns true if successful, false if failed
 */
export async function addFavorite(userID: string, eventID: string): Promise<boolean> {
    try {
        // update in the database
        await updateDoc(doc(db, favoritesCollection, userID), {
            favorites: arrayUnion(eventID),
        });

        // if we got here, it was successful
        return true;
    } catch (error) {
        // caught an error, log it and return failure
        console.error(`Error favoriting event ${eventID}:`, error);
        return false;
    }
}

/**
 * Remove an event from the list of favorites for the specified user.
 * @param userID user ID to remove from
 * @param eventID event ID to unfavorite
 * @returns true if successful, false if failed
 */
export async function removeFavorite(userID: string, eventID: string): Promise<boolean> {
    try {
        // update in the database
        await updateDoc(doc(db, favoritesCollection, userID), {
            favorites: arrayRemove(eventID),
        });

        // if we got here, it was successful
        return true;
    } catch (error) {
        // caught an error, log it and return failure
        console.error(`Error removing event ${eventID} from favorites:`, error);
        return false;
    }
}