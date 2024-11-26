/*
 *  Author: Kaleb Jubar
 *  Created: 6 Nov 2024, 4:55:15 PM
 *  Last update: 26 Nov 2024, 9:46:42 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase app config
const firebaseConfig = {
    apiKey: "AIzaSyCnddqCH5_2uHvUF1V3bPDyzF3R3RPb-1U",
    authDomain: "info6132-1207020.firebaseapp.com",
    projectId: "info6132-1207020",
    storageBucket: "info6132-1207020.firebasestorage.app",
    messagingSenderId: "145730657228",
    appId: "1:145730657228:web:67c5a04997fc1b8fe21b69"
};

// initialize app and Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// constants/types for events data
export const eventsCollection = "events";

export type Event = {
    id: string,
    creatorID: string,
    title: string,
    description: string,
    startInstant: Timestamp,
};