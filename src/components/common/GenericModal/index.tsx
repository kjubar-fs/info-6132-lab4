/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 7:26:19 PM
 *  Last update: 25 Nov 2024, 7:45:30 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Modal, StyleProp, View, ViewStyle } from "react-native";

import { Card } from "../Card";

import styles from "./styles";

interface Props {
    children: JSX.Element | JSX.Element[],
    visible: boolean,
    cardStyles?: StyleProp<ViewStyle>,
}

export function GenericModal({ children, visible, cardStyles }: Props): JSX.Element {
    return (
        <Modal
            visible={visible}
            transparent
        >
            <View style={styles.background}>
                <Card style={[styles.card, cardStyles]}>
                    {children}
                </Card>
            </View>
        </Modal>
    );
}