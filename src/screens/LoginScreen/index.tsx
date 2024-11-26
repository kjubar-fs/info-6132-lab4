/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 6:57:13 PM
 *  Last update: 25 Nov 2024, 7:11:32 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { TouchableOpacity, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { AppScreen } from "../AppScreen";

import { safeAreaPadding, primaryColor } from "../../util/constants";

const Stack = createNativeStackNavigator();

export function LoginStack(): JSX.Element {
    return (
        <Stack.Navigator>
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

    return (
        <View style={{paddingTop: safeAreaPadding}}>
            <TouchableOpacity onPress={() => navigation.navigate("App" as never)}>
                {/* use "as never" as a little hack so we don't have to set up a param list */}
                <Text>Login here</Text>
            </TouchableOpacity>
        </View>
    );
}