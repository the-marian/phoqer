import { ComponentProps, forwardRef, MouseEvent } from 'react';

import { changeRoute } from '../events';

export const AppLink = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>(({ onClick, ...props }, ref) => {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onClick?.(event);
        changeRoute.submit(props.href as string);
    };

    return <a ref={ref} onClick={handleClick} {...props} />;
});

AppLink.displayName = 'AppLink';
