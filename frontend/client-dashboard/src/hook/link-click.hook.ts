import { MouseEvent } from 'react';

import { useNavigate } from 'react-router-dom';

type LinkClickHandler = (event: MouseEvent<HTMLAnchorElement>) => void;
export const useLinkClick = (): LinkClickHandler => {
    const navigation = useNavigate();

    return (event: MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        navigation(event.currentTarget.pathname);
    };
};
