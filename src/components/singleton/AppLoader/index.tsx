/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 12:19:27 PM
 *  Last update: 26 Nov 2024, 12:35:53 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useEffect } from "react";

interface Props {
    /** Function to call when loading is finished */
    onLoaded: () => void,
}

export function AppLoader({ onLoaded }: Props): JSX.Element {
    useEffect(() => {
        const timeoutID = setTimeout(onLoaded, 3000);

        return () => clearTimeout(timeoutID);
    }, [])

    return <></>;
}