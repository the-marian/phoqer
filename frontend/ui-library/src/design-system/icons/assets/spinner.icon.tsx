import { FC, SVGProps } from 'react';

import classNames from 'classnames';

import css from '../icons.module.scss';

export const SpinnerIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg className={classNames(css.root, props.className)} viewBox="0 0 50 50" {...props}>
            <g className={css.spinner}>
                <circle className={css.path} cx="25" cy="25" r="20" strokeWidth="5" fill="none" />
            </g>
        </svg>
    );
};
