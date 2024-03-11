import { ReactNode, forwardRef, ComponentPropsWithoutRef, ReactElement } from 'react';

import { Box } from '@chakra-ui/react';
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2';

const renderThumb = ({ style, ...props }: ComponentPropsWithoutRef<'div'>): ReactElement => {
    return <Box style={style} borderRadius={6} backgroundColor={'gray.600'} cursor="pointer" {...props} />;
};

export interface ScrollProps extends ScrollbarProps {
    children: ReactNode;
}
export const Scroll = forwardRef<Scrollbars, ScrollProps>(({ children, ...props }, ref): ReactElement => {
    return (
        <Scrollbars
            ref={ref}
            autoHide
            universal
            autoHideTimeout={500}
            autoHideDuration={200}
            renderThumbVertical={renderThumb}
            renderThumbHorizontal={renderThumb}
            style={{ height: '100%' }}
            {...props}
        >
            {children}
        </Scrollbars>
    );
});

Scroll.displayName = 'Scroll';

export { Scrollbars };
