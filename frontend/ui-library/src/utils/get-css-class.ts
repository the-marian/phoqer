import classNames from 'classnames';
import { MediaProp } from 'src/types/media.type';

export const getCssClass = (key: string, property: MediaProp<string | number>): string => {
    if (typeof property === 'object') {
        const classList = Object.entries(property).map(([media, value]: [string, string | number]) => {
            if (!value) return;

            if (media === 'base') {
                return `${key}-${value}`;
            }

            return `${key}-${media}-${value}`;
        });

        return classNames(classList);
    }
    return `${key}-${property}`;
};
