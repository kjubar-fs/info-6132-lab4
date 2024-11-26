/*
 *  Author: Kaleb Jubar
 *  Created: 6 Nov 2024, 11:00:26 AM
 *  Last update: 25 Nov 2024, 7:38:59 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Text, TouchableOpacity } from "react-native";

import { Event } from "../../data/firebase/config";

import { GenericModal } from "../../components/common/GenericModal";

interface Props {
    visible: boolean,
    close: () => void,
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