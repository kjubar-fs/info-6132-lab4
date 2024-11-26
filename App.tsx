/*
 *  Author: Kaleb Jubar
 *  Created: 26 Oct 1985, 4:15:00 AM
 *  Last update: 25 Nov 2024, 10:25:26 PM
 *  Copyright (c) 1985 - 2024 Kaleb Jubar
 */
import { StatusBar } from 'expo-status-bar';

import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';

import { RootSiblingParent } from "react-native-root-siblings";

import { LoginStack } from './src/screens/LoginScreen';

import { accentColor, primaryColor } from './src/util/constants';

// create a custom theme for React Navigation
const EventsTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: primaryColor,
        text: accentColor,
        background: "#FEFEFE",
    },
}

export default function App() {
    return (
        <RootSiblingParent>
        <NavigationContainer theme={EventsTheme}>

            <StatusBar style="light" />

            <LoginStack />

        </NavigationContainer>
        </RootSiblingParent>
    );
}