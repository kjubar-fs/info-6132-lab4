/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 6:57:13 PM
 *  Last update: 25 Nov 2024, 9:08:45 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { Text, View, TextInput, TouchableHighlight } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AppScreen } from "../AppScreen";

import { primaryColor } from "../../util/constants";
import styles from "./styles";

const Stack = createNativeStackNavigator();

export function LoginStack(): JSX.Element {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "fade",
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="App"
                component={AppScreen}
                options={{
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: primaryColor,
                    },
                    headerTintColor: "white",
                }}
            />
        </Stack.Navigator>
    );
}

function LoginScreen(): JSX.Element {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    return (
        <View style={styles.containerOuter}>
            <View style={styles.containerInner}>
                <MaterialCommunityIcons name="calendar-clock" size={100} color="white" />
                <Text style={styles.title}>EventScape</Text>
            </View>

            <View style={styles.containerInner}>
                <View style={styles.containerInput}>
                    <Text style={styles.caption}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoComplete="email"
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </View>
                
                <View style={styles.containerInput}>
                    <Text style={styles.caption}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        autoComplete="current-password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry
                    />
                </View>
            </View>

            <TouchableHighlight
                style={styles.loginBtn}
                underlayColor="#DDD"
                // use "as never" as a little hack so we don't have to set up a param list
                onPress={() => navigation.navigate("App" as never)}
            >
                <Text style={styles.loginText}>Login</Text>
            </TouchableHighlight>
        </View>
    );
}