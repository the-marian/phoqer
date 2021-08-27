import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import useMonths from '../../../../../../hooks/month.hook';
import { addZeroToNumber } from '../../../../../../utils/helpers';
import { Theme } from '../../../../../../utils/theming/theme';
import { validateDate } from '../chat-flow.utils';

const useStyles = createUseStyles((theme: Theme) => ({
    text: {
        width: '100%',
        marginTop: theme.rem(4),
        textAlign: 'center',
    },
}));

interface IDateSeparatorProps {
    prevDate?: string;
    currentDate: string;
}

const ChatDateSeparator = ({ prevDate, currentDate }: IDateSeparatorProps): ReactElement | null => {
    const css = useStyles();
    const month = useMonths();

    const currentDay = validateDate(currentDate);
    if (!prevDate) {
        return (
            <p className={css.text}>
                {addZeroToNumber(currentDay.getDate())} {month[currentDay.getMonth()]}
            </p>
        );
    }

    const prevDay = validateDate(prevDate);
    return prevDay.getDate() !== currentDay.getDate() ? (
        <p className={css.text}>
            {currentDay.getDate()} {month[currentDay.getMonth()]}
        </p>
    ) : null;
};

export default ChatDateSeparator;
