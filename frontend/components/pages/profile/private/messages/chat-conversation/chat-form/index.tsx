import { faSmile } from '@fortawesome/free-regular-svg-icons/faSmile';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IEmojiData } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import React, { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import useMedia from '../../../../../../../hooks/media.hook';
import useTrans from '../../../../../../../hooks/trans.hook';
import Button from '../../../../../../common/button';
import Tooltip from '../../../../../../common/tooltip';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

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
    btn: {
        width: theme.rem(5),
        height: theme.rem(4),
        marginLeft: theme.rem(0.5),
        background: theme.palette.gray[0],
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
    emoji: {
        position: 'absolute',
        bottom: theme.rem(7),
        right: theme.rem(1),
        zIndex: 11,
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
    },
}));

interface IProps {
    onSubmit?: (value: string, uploads: File[]) => void;
}

const ChatForm = ({ onSubmit }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(768);
    const desktop = useMedia(1024);

    const [emoji, setEmoji] = useState<boolean>(false);
    const handleEmoji = (): void => setEmoji(!emoji);

    const [uploads, setUploads] = useState<File[]>([]);
    const handleUploads = (): void => console.log(setUploads);

    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: FormEvent | KeyboardEvent<HTMLTextAreaElement>): void => {
        event.preventDefault();
        if (!value.trim().length) return;
        if (onSubmit) onSubmit(value, uploads);
        setValue('');
    };

    const handleKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
        if (event.key === 'Enter' && !event.shiftKey) {
            if (!media) return;
            handleSubmit(event);
        }
    };

    const onEmojiClick = (_: MouseEvent, data: IEmojiData): void => {
        setValue(val => val + data.emoji);
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

            {emoji && (
                <>
                    <div className={css.backdrop} onClick={handleEmoji} aria-hidden="true" />
                    <div className={css.emoji}>
                        <Picker
                            onEmojiClick={onEmojiClick}
                            pickerStyle={{
                                width: '50rem',
                                height: '70rem',
                                maxWidth: '95vw',
                                maxHeight: '70vh',
                                boxShadow: 'none',
                            }}
                        />
                    </div>
                </>
            )}

            {desktop && (
                <Button className={css.btn} type="button" onClick={handleEmoji}>
                    <FontAwesomeIcon icon={faSmile} />
                </Button>
            )}

            <Button className={css.btn} type="button" onClick={handleUploads}>
                <FontAwesomeIcon icon={faPaperclip} />
            </Button>

            <Button className={css.btn} type="submit">
                <FontAwesomeIcon icon={faChevronRight} />
            </Button>
        </form>
    );
};

export default ChatForm;
