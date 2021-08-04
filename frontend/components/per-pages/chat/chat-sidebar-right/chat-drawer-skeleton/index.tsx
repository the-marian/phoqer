import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../utils/theming/theme';
import RectSkeleton from '../../../../common/loaders/skeletons/rect';
import TextSkeleton from '../../../../common/loaders/skeletons/text';

const useStyles = createUseStyles((theme: Theme) => ({
    img: {
        margin: theme.rem(0, 0, 4),
        height: theme.rem(20),
        width: '100%',
    },
    separator: {
        margin: theme.rem(5, 0),
    },
}));

const ChatDrawerSkeleton = (): ReactElement => {
    const css = useStyles();

    return (
        <div>
            <RectSkeleton className={css.img} />
            <RectSkeleton className={css.img} />

            <div className={css.separator} />
            <TextSkeleton amount={5} />

            <div className={css.separator} />
            <TextSkeleton amount={2} />
        </div>
    );
};

export default ChatDrawerSkeleton;
