/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 26 Nov 2024, 12:56:25 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Text } from "react-native";

import { useFavorites } from "../../data/state/hooks";

export function FavoritesScreen(): JSX.Element {
    const favorites = useFavorites();

    return (
        <Text>{favorites[0].title}</Text>
    );
}