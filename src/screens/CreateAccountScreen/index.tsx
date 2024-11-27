/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 1:00:55 PM
 *  Last update: 27 Nov 2024, 12:21:01 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useEffect, useState } from "react";

import { Text, View, TextInput, TouchableHighlight } from "react-native";

import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../data/firebase/config";

import Toast from "react-native-root-toast";

import { createFavoritesList } from "../../data/firebase/write";

import { GenericModal } from "../../components/common/GenericModal";

import { validateEmail } from "../../util/functions";

import styles from "./styles";

interface Props {
    /** Whether or not the modal is shown */
    visible: boolean,
    /** Function to call to close the modal */
    close: () => void,
}

export function CreateAccountScreen({ visible, close }: Props): JSX.Element {
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [emailError, setEmailError] = useState<string>("");
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [passwordError, setPasswordError] = useState<string>("");
    const [passwordVerify, setPasswordVerify] = useState<string | undefined>(undefined);
    const [passwordVerifyError, setPasswordVerifyError] = useState<string>("");

    // hook up an effect to clear the modal when it appears
    useEffect(() => {
        if (visible === true) {
            setEmail(undefined);
            setEmailError("");
            setPassword(undefined);
            setPasswordError("");
            setPasswordVerify(undefined);
            setPasswordVerifyError("");
        }
    }, [visible]);

    const changeEmail = (newEmail: string) => {
        // always update email state
        setEmail(newEmail);

        // check if required error is necessary
        if (!newEmail) {
            setEmailError("Required");
        } else {
            setEmailError("");
        }
    };

    const changePassword = (newPass: string) => {
        // always update password state
        setPassword(newPass);

        // check if required error is necessary
        if (!newPass) {
            setPasswordError("Required");
        } else {
            setPasswordError("");
        }
    };

    const changePasswordVerify = (newPass: string) => {
        // always update password state
        setPasswordVerify(newPass);

        // check if required error is necessary
        if (!newPass) {
            setPasswordVerifyError("Required");
        } else {
            setPasswordVerifyError("");
        }
    };
    
    const createAccount = () => {
        // check if email is valid
        let emailValid = false;
        if (!email || email.trim() === "") {
            setEmailError("Required");
        } else if (!validateEmail(email)) {
            setEmailError("Email format is invalid");
        } else {
            emailValid = true;
        }

        // check if password is valid
        let passwordValid = false;
        if (!password || password.trim() === "") {
            setPasswordError("Required");
        } else if (password.length < 6) {
            setPasswordError("Must be at least 6 characters");
        } else {
            passwordValid = true;
        }

        // check confirm password matches password
        let passwordVerifyValid = false;
        if (!passwordVerify || passwordVerify.trim() === "") {
            setPasswordVerifyError("Required");
        } else if (password?.trim() !== passwordVerify.trim()) {
            setPasswordVerifyError("Must match");
        } else {
            passwordVerifyValid = true;
        }

        // do nothing if basic validation checks failed
        if (!emailValid || !passwordValid || !passwordVerifyValid) {
            return;
        }

        // attempt Firebase account creation
        createUserWithEmailAndPassword(auth, email?.trim() ?? "", password?.trim() ?? "")
            .then((credential) => {
                // close the modal
                close();

                // create an empty favorites list for the user on the DB
                // don't need to wait for the result
                createFavoritesList(credential.user.uid);

                // show a toast after reaching the home screen
                // createUserWithEmailAndPassword automatically authenticates, so we are auto-logged in
                setTimeout(() => {
                    Toast.show("Account successfully created!", {
                        duration: Toast.durations.LONG,
                        position: -100,
                    });
                }, 1000);
            })
            .catch((error: FirebaseError) => {
                Toast.show(`Unknown error creating account: ${error.message}. Try again later.`, {
                    duration: Toast.durations.LONG,
                });
            });
    };

    return (
        <GenericModal visible={visible} cardStyles={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.containerInput}>
                <View style={styles.containerCaption}>
                    <Text style={styles.caption}>Email</Text>
                    {emailError &&
                        <Text style={styles.error}>{emailError}</Text>}
                </View>

                <TextInput
                    style={[styles.input, emailError ? styles.inputHasError : undefined]}
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
                    style={[styles.input, passwordError ? styles.inputHasError : undefined]}
                    value={password}
                    onChangeText={changePassword}
                    autoComplete="new-password"
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry
                />
            </View>

            <View style={styles.containerInput}>
                <View style={styles.containerCaption}>
                    <Text style={styles.caption}>Confirm Password</Text>
                    {passwordVerifyError &&
                        <Text style={styles.error}>{passwordVerifyError}</Text>}
                </View>
                
                <TextInput
                    style={[styles.input, passwordVerifyError ? styles.inputHasError : undefined]}
                    value={passwordVerify}
                    onChangeText={changePasswordVerify}
                    autoComplete="new-password"
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry
                />
            </View>

            <View style={styles.containerBtns}>
                <TouchableHighlight style={[styles.button, styles.cancelBtn]} onPress={close} underlayColor="#D00">
                    <Text style={styles.btnCaption}>Cancel</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.button, styles.signUpBtn]} onPress={createAccount} underlayColor="#0D0">
                    <Text style={styles.btnCaption}>Sign Up</Text>
                </TouchableHighlight>
            </View>
        </GenericModal>
    );
}