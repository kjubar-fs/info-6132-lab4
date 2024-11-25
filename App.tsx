/*
 *  Author: Kaleb Jubar
 *  Created: 26 Oct 1985, 4:15:00 AM
 *  Last update: 25 Nov 2024, 4:15:45 PM
 *  Copyright (c) 1985 - 2024 Kaleb Jubar
 */
import { StatusBar } from 'expo-status-bar';

import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';

import { AppScreen } from './src/screens/AppScreen';

import { primaryColor } from './src/util/constants';

// create a custom theme for React Navigation
const BooksTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: primaryColor,
        background: "#FEFEFE",
    },
}

export default function App() {
    return (
        <NavigationContainer theme={BooksTheme}>

            <StatusBar style="light" />

            <AppScreen />

        </NavigationContainer>
    );
}