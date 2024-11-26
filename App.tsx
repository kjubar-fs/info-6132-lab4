/*
 *  Author: Kaleb Jubar
 *  Created: 26 Oct 1985, 4:15:00 AM
 *  Last update: 26 Nov 2024, 12:42:36 PM
 *  Copyright (c) 1985 - 2024 Kaleb Jubar
 */
import { Provider } from 'react-redux';
import { store } from './src/data/state/store';

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
        <Provider store={store}>
        <NavigationContainer theme={EventsTheme}>

            <StatusBar style="light" />

            <LoginStack />

        </NavigationContainer>
        </Provider>
        </RootSiblingParent>
    );
}