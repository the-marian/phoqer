import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';
import { useReduceAnimations } from 'phoqer';
import { CSSTransition } from 'react-transition-group';

import css from './appear.module.scss';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
    timeout?: number;
}
export const Appear: FC<Props> = ({ children, timeout = 300, className, ...props }) => {
    const { isReduceAnimations } = useReduceAnimations();

    return (
        <CSSTransition in timeout={isReduceAnimations ? 0 : timeout} unmountOnExit appear>
            <div className={classNames(!isReduceAnimations && css.container, className)} {...props}>
                {children}
            </div>
        </CSSTransition>
    );
};
