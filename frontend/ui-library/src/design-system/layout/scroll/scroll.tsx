import { ReactNode, forwardRef, ComponentPropsWithoutRef, FC } from 'react';

import classNames from 'classnames';
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2';

import css from './scroll.module.scss';

const renderThumb: FC<ComponentPropsWithoutRef<'div'>> = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        backgroundColor: '#999',
        cursor: 'pointer',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export interface ScrollProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactNode;
    scrollBar?: ScrollbarProps;
}
export const Scroll = forwardRef<Scrollbars, ScrollProps>(({ children, className, scrollBar = {}, ...props }, ref) => {
    return (
        <div className={classNames(css.scroll, className)} {...props}>
            <Scrollbars
                ref={ref}
                autoHide
                universal
                autoHideTimeout={500}
                autoHideDuration={200}
                renderThumbVertical={renderThumb}
                renderThumbHorizontal={renderThumb}
                className={classNames(css.scroll, className)}
                {...scrollBar}
            >
                {children}
            </Scrollbars>
        </div>
    );
});

Scroll.displayName = 'Scroll';

export { Scrollbars };
