import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import useMedia from '../../../../../../../hooks/media.hook';
import { IDropValue } from '../../../../../../../interfaces';
import Button from '../../../../../../common/button';
import DropDown from '../../../../../../common/drop-down';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'flex-start',
        flexGrow: 1,
        width: '100%',
        padding: theme.rem(0.5),
        background: theme.palette.white,
        border: theme.border(0.1, theme.palette.gray[1]),
        borderRadius: theme.radius,

        ...theme.media(1060).max({
            position: 'fixed',
            bottom: theme.rem(5),
            left: '0',
            width: '100%',
            padding: theme.rem(0.8, 0.8, 1.2),
            background: theme.palette.white,
            borderRadius: 'unset',
            border: theme.border(0.1, theme.palette.gray[1]),
        }),
    },
    textarea: {
        ...template(theme).input,
        maxHeight: '70vh',
        minHeight: theme.rem(5),
        padding: theme.rem(0.5),
        border: theme.border(0.2, 'transparent'),
        boxShadow: 'unset',
        background: 'none',
        color: theme.palette.black[0],
        ...theme.hover({
            border: theme.border(0.2, 'transparent'),
        }),
        ...theme.focus({
            border: theme.border(0.2, 'transparent'),
        }),

        ...theme.media(1060).max({
            minHeight: theme.rem(4),
            padding: theme.rem(0.5, 1),
        }),
    },
    submit: {
        width: theme.rem(6),
        height: theme.rem(5),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],
        borderRadius: theme.radius,
        fontSize: theme.rem(1.6),
        ...template(theme).outline,

        ...theme.media(1060).max({
            width: theme.rem(5),
            height: theme.rem(4),
            fontSize: theme.rem(1.4),
        }),
    },
    dropdown: {
        width: theme.rem(6),
        margin: theme.rem(0, 0.5),

        '& > p': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
        },

        ...theme.media(1060).max({
            width: theme.rem(5),
            fontSize: theme.rem(1.2),
        }),
    },
}));

const setting: IDropValue[] = [
    {
        slug: 'files',
        name: 'Add files',
        type: 'main',
    },
];

const ChatForm = (): ReactElement => {
    const css = useStyles();
    const media = useMedia(1060);
    const [value, setValue] = useState<string>();

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };
    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        console.log(value);
    };

    return (
        <form action="#" method="post" className={css.flex} onSubmit={handleSubmit}>
            <TextareaAutosize
                value={value}
                className={css.textarea}
                onChange={handleChange}
                name="comment"
                wrap="soft"
                placeholder="Написать сообщение ..."
            />

            <DropDown
                icon={faEllipsisV}
                height={media ? 5 : 4}
                className={css.dropdown}
                onChange={console.log}
                data={setting}
                toLeft
            />

            <Button className={css.submit} type="submit">
                <FontAwesomeIcon icon={faChevronRight} />
            </Button>
        </form>
    );
};

export default ChatForm;
