/*
 *  Author: Kaleb Jubar
 *  Created: 6 Nov 2024, 11:00:26 AM
 *  Last update: 26 Nov 2024, 1:04:10 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Text, TouchableOpacity } from "react-native";

import { Event } from "../../data/firebase/config";

import { GenericModal } from "../../components/common/GenericModal";

interface Props {
    /** Whether or not the modal is shown */
    visible: boolean,
    /** Function to call to close the modal */
    close: () => void,
    /** Event to display details for */
    event: Event,
}

export function EventDetailScreen({ visible, close, event }: Props): JSX.Element {
    return (
        <GenericModal visible={visible}>
            <Text>Event details here</Text>
            <TouchableOpacity onPress={close}>
                <Text>Close</Text>
            </TouchableOpacity>
        </GenericModal>
    );
}