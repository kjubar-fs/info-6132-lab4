/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 6:57:13 PM
 *  Last update: 25 Nov 2024, 11:19:37 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useEffect, useState } from "react";

import { Text, View, TextInput, TouchableHighlight, TouchableOpacity } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../data/firebase/config";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Toast from "react-native-root-toast";

import { AppScreen } from "../AppScreen";

import { validateEmail } from "../../util/functions";
import { primaryColor } from "../../util/constants";
import styles from "./styles";

const Stack = createNativeStackNavigator();

export function LoginStack(): JSX.Element {
    const navigation = useNavigation();

    return (
        // I've opted to use a stack here instead of conditional rendering so that it's animated without extra work
        <Stack.Navigator>
            <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="app"
                component={AppScreen}
                options={{
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: primaryColor,
                    },
                    headerTintColor: "white",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                signOut(auth)
                                    .then(() => {
                                        navigation.goBack();
                                    })
                                    .catch((error: FirebaseError) => {
                                        Toast.show(`Error signing out: ${error.code}`, {
                                            duration: Toast.durations.LONG,
                                        });
                                    })
                            }}
                        >
                            <Text style={styles.logoutText}>Log Out</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function LoginScreen(): JSX.Element {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

    // set up reauth listener as a mount effect
    useEffect(() => {
        // get return value to unsubscribe on unmount
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // we have a user, so just go ahead and move to the app screen
            if (user) {
                // use "as never" as a little hack so we don't have to set up a param list
                navigation.navigate("app" as never);
            }
        });

        // return the unsubscribe function to be called when unmounting
        return unsubscribe;
    }, []);

    const changeEmail = (newEmail: string) => {
        // always update email state
        setEmail(newEmail);

        // check if required error is necessary
        if (!newEmail) {
            setEmailError("Email is required");
        } else {
            setEmailError("");
        }
    };

    const changePassword = (newPass: string) => {
        // always update password state
        setPassword(newPass);

        // check if required error is necessary
        if (!newPass) {
            setPasswordError("Password is required");
        } else {
            setPasswordError("");
        }
    };

    const login = () => {
        // check if email is valid
        let emailValid = false;
        if (!email) {
            setEmailError("Email is required");
        } else if (!validateEmail(email)) {
            setEmailError("Email format is invalid");
        } else {
            emailValid = true;
        }

        // check if password is valid
        let passwordValid = false;
        if (!password) {
            setPasswordError("Password is required");
        } else {
            passwordValid = true;
        }

        // do nothing if basic validation checks failed
        if (!emailValid || !passwordValid) {
            return;
        }

        // attempt Firebase login
        signInWithEmailAndPassword(auth, email ?? "", password ?? "")
            .then(() => {
                // clear fields
                setEmail("");
                setPassword("");

                // don't need to call navigate here, the onAuthStateChanged handler will do that for us
            })
            .catch((error: FirebaseError) => {
                if (error.code === "auth/invalid-credential") {
                    Toast.show("Invalid email or password.", {
                        duration: Toast.durations.LONG,
                    });
                } else {
                    Toast.show(`Unknown error logging in: ${error.message}`, {
                        duration: Toast.durations.LONG,
                    });
                }
            });
    };

    return (
        <View style={styles.containerOuter}>
            <View style={styles.containerInner}>
                <MaterialCommunityIcons name="calendar-clock" size={100} color="white" />
                <Text style={styles.title}>EventScape</Text>
            </View>

            <View style={styles.containerInner}>
                <View style={styles.containerInput}>
                    <View style={styles.containerCaption}>
                        <Text style={styles.caption}>Email</Text>
                        {emailError &&
                            <Text style={styles.error}>{emailError}</Text>}
                    </View>
                    
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={changeEmail}
                        keyboardType="email-address"
                        autoComplete="email"
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </View>
                
                <View style={styles.containerInput}>
                    <View style={styles.containerCaption}>
                        <Text style={styles.caption}>Password</Text>
                        {passwordError &&
                            <Text style={styles.error}>{passwordError}</Text>}
                    </View>
                    
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={changePassword}
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
                onPress={login}
            >
                <Text style={styles.loginText}>Login</Text>
            </TouchableHighlight>
        </View>
    );
}