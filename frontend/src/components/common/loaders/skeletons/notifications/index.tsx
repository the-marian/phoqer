import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../utils/theming/theme';
import TextSkeleton from '../text';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(0, 0, 4),
    },
}));

interface IProps {
    amount?: number;
}

const NotificationsSkeleton = ({ amount }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <>
            {[...Array(amount)].map<ReactElement>((_, index) => (
                <div key={index} className={css.root}>
                    <TextSkeleton amount={2} />
                </div>
            ))}
        </>
    );
};

export default NotificationsSkeleton;
