/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 10:18:28 AM
 *  Last update: 27 Nov 2024, 12:31:31 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, query, runTransaction, setDoc, updateDoc, where } from "firebase/firestore";

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
        // get all users that have favorited this event
        // has to be done outside the transaction to run a query
        const snapshot = await getDocs(query(
            collection(db, favoritesCollection),
            where("favorites", "array-contains", eventID)
        ));
        const favoritesToDelete: string[] = [];
        snapshot.forEach((favoritesDoc) => {
            favoritesToDelete.push(favoritesDoc.id);
        });

        // open a transaction so that all modifications must succeed
        // because we have to remove it from all favorites lists as well as delete it
        await runTransaction(db, async (transaction) => {
            // remove from all lists
            for (const favoriteId of favoritesToDelete) {
                transaction.update(doc(db, favoritesCollection, favoriteId), {
                    favorites: arrayRemove(eventID),
                });
            }
    
            // delete from database
            transaction.delete(doc(db, eventsCollection, eventID));
        });
        
        // if we got here, it was successful
        return true;
    } catch (error) {
        // caught an error, log it and return failure
        console.error(`Error deleting event ${eventID}:`, error);
        return false;
    }
}

/**
 * Create an empty favorites list for the specified user.
 * Only for use on new users -- WILL OVERWRITE if called for an existing user.
 * @param userID user ID to create for
 * @returns true if successful, false if failed
 */
export async function createFavoritesList(userID: string): Promise<boolean> {
    try {
        // update in the database
        await setDoc(doc(db, favoritesCollection, userID), {
            favorites: [],
        });

        // if we got here, it was successful
        return true;
    } catch (error) {
        // caught an error, log it and return failure
        console.error(`Error creating favorites list for user ${userID}:`, error);
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