import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, FormEvent, KeyboardEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import useMedia from '../../../../../../../hooks/media.hook';
import useTrans from '../../../../../../../hooks/trans.hook';
import { IDropValue } from '../../../../../../../interfaces';
import Button from '../../../../../../common/button';
import DropDown from '../../../../../../common/drop-down';
import Tooltip from '../../../../../../common/tooltip';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        position: 'relative',
        zIndex: 12,
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
        minHeight: theme.rem(4),
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
            padding: theme.rem(0.5, 1),
        }),
    },
    tooltip: {
        width: '100%',
    },
    submit: {
        width: theme.rem(5),
        height: theme.rem(4),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        ...template(theme).outline,

        ...theme.media(1060).max({
            width: theme.rem(5),
            height: theme.rem(4),
            fontSize: theme.rem(1.2),
        }),
    },
    dropdown: {
        width: theme.rem(5),
        margin: theme.rem(0, 0.5),

        '& > p': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
        },

        ...theme.media(1060).max({
            width: theme.rem(5),
            fontSize: theme.rem(1),
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

interface IProps {
    onSubmit?: (value: string, uploads: File[]) => void;
}

const ChatForm = ({ onSubmit }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(768);

    const [uploads, setUploads] = useState<File[]>([]);
    const [value, setValue] = useState<string>('');

    const handleDropDown = (value: IDropValue | null): void => {
        if (!value) return;
        switch (value.slug) {
            case 'files':
                console.log(setUploads);
                return;
        }
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        if (onSubmit) onSubmit(value, uploads);
    };

    const handleKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
        if (event.key === 'Enter' && !event.shiftKey) {
            if (!media) return;

            event.preventDefault();
            if (onSubmit) onSubmit(value, uploads);
        }
    };

    return (
        <form action="#" method="post" className={css.flex} onSubmit={handleSubmit}>
            <Tooltip classNameWrp={css.tooltip} content={trans('press_enter_send')}>
                <TextareaAutosize
                    value={value}
                    className={css.textarea}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    name="comment"
                    wrap="soft"
                    placeholder="Написать сообщение ..."
                />
            </Tooltip>

            <DropDown icon={faEllipsisV} height={4} className={css.dropdown} onChange={handleDropDown} data={setting} toLeft />

            <Button className={css.submit} type="submit">
                <FontAwesomeIcon icon={faChevronRight} />
            </Button>
        </form>
    );
};

export default ChatForm;
