import { useEffect } from 'react';

import { MediaProp } from 'src/types/media.type';

export const useCSSProperty = (id: string, key: string, property?: MediaProp<number>): void => {
    useEffect(() => {
        if (property) {
            const element = document.getElementById(id) as HTMLElement;

            if (typeof property === 'object') {
                Object.entries(property).forEach(([media, value]: [string, string | number]) => {
                    if (media === 'base') {
                        element.style.setProperty(key, property.base + 'rem');
                        return;
                    }
                    if (value) {
                        element.style.setProperty(key + '-' + media, value + 'rem');
                    }
                });
            } else {
                element.style.setProperty(key, property + 'rem');
            }
        }
    }, [property, id, key]);
};
