import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../utils/theming/theme';
import RectSkeleton from '../rect';
import TextSkeleton from '../text';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
    },
    item: {
        display: 'flex',
        marginBottom: theme.rem(2),
        padding: theme.rem(2),
        borderRadius: theme.radius,
        boxShadow: theme.palette.shadowBorder,
    },
    img: {
        marginRight: theme.rem(2),
        height: theme.rem(10),
        minWidth: theme.rem(10),
    },
    text: {
        width: '100%',
    },
}));

interface IProps {
    className?: string;
    amount?: number;
}

const ChatsLoaders = ({ className, amount = 1 }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <ul className={className}>
            {[...Array(amount)].map((_, index) => (
                <li key={index} className={css.item}>
                    <RectSkeleton className={css.img} />
                    <div className={css.text}>
                        <TextSkeleton amount={2} />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ChatsLoaders;
