/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 1:00:55 PM
 *  Last update: 26 Nov 2024, 1:17:37 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Text, TouchableOpacity } from "react-native";

import { GenericModal } from "../../components/common/GenericModal";

import styles from "./styles";

interface Props {
    /** Whether or not the modal is shown */
    visible: boolean,
    /** Function to call to close the modal */
    close: () => void,
}

export function CreateAccountScreen({ visible, close }: Props): JSX.Element {
    return (
        <GenericModal visible={visible} cardStyles={styles.container}>
            <Text>User sign-up</Text>
            <TouchableOpacity onPress={close}>
                <Text>Close</Text>
            </TouchableOpacity>
        </GenericModal>
    );
}