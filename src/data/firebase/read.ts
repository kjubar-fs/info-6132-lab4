/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 10:18:25 AM
 *  Last update: 26 Nov 2024, 11:15:20 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db, eventsCollection, Event, favoritesCollection } from "./config";

/**
 * @returns all events in the database
 */
export async function getAllEvents(): Promise<Event[]> {
    // get all events docs
    const snapshot = await getDocs(collection(db, eventsCollection));
    
    // create event list
    const eventList: Event[] = [];
    snapshot.forEach((doc) => {
        // first, make a copy of the doc data
        const newEvent = { ...doc.data() } as Event;
        // then, assign the doc ID
        newEvent.id = doc.id;

        eventList.push(newEvent);
    });

    return eventList;
}

/**
 * Get the list of favorited events for a specified user.
 * @param userID user to get favorites for
 * @returns list of favorited event IDs
 */
export async function getFavoritesForUser(userID: string): Promise<string[]> {
    // get the favorites doc for the specified user
    const favoritesDoc = await getDoc(doc(db, favoritesCollection, userID));
    const favoritesData = favoritesDoc.data();

    // if we don't have any data, return an empty list
    return favoritesData !== undefined ? favoritesData.favorites : [];
}