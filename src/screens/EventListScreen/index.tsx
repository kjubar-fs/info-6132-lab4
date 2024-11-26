/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 25 Nov 2024, 7:04:53 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Text, TouchableOpacity } from "react-native";

import { ScreenWrapper } from "../../components/common/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../HomeScreen";

export function EventListScreen(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const fakeEvent = {
        id: "1",
        author: "Blob",
        checkedOut: false,
        coverURL: "string",
        description: "string",
        rating: 2,
        title: "Title",
    };

    return (
        // <ScreenWrapper>
        <>
            <Text>Event list here</Text>
            <TouchableOpacity onPress={() => navigation.navigate("eventDetail", { event: fakeEvent })}>
                <Text>Go to detail</Text>
            </TouchableOpacity>
        </>
        // </ScreenWrapper>
    );
}