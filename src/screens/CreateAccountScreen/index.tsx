/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 1:00:55 PM
 *  Last update: 26 Nov 2024, 2:02:36 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useEffect, useState } from "react";

import { Text, View, TextInput, TouchableHighlight } from "react-native";

import { GenericModal } from "../../components/common/GenericModal";

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
                    style={styles.input}
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

                <TouchableHighlight style={[styles.button, styles.signUpBtn]} onPress={() => console.log("create")} underlayColor="#0D0">
                    <Text style={styles.btnCaption}>Sign Up</Text>
                </TouchableHighlight>
            </View>
        </GenericModal>
    );
}