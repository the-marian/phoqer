import { faSmile } from '@fortawesome/free-regular-svg-icons/faSmile';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IEmojiData } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import React, { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import useMedia from '../../../../../hooks/media.hook';
import useTrans from '../../../../../hooks/trans.hook';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import Button from '../../../../common/button';
import ButtonClose from '../../../../common/button-close';
import { modal } from '../../../../common/modal';
import Tooltip from '../../../../common/tooltip';
import ChatUploadsModal from '../chat-uploads-modal';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        zIndex: 12,
        width: '100%',
    },
    flex: {
        position: 'relative',
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
            bottom: theme.rem(5.6),
            left: '0',
            width: '100%',
            padding: theme.rem(0.8, 0.8, 1.2),
            background: theme.palette.white,
            borderRadius: 'unset',
            border: theme.border(0.1, theme.palette.gray[1]),
        }),
    },
    textarea: {
        ...mixin(theme).input,
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
        ...mixin(theme).outline,

        ...theme.media(1060).max({
            width: theme.rem(5),
            height: theme.rem(4),
            fontSize: theme.rem(1.2),
            background: theme.palette.gray[1],
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
    img: {
        position: 'relative',
        display: 'inline-block',
        height: theme.rem(5),
        width: theme.rem(5),
        margin: theme.rem(0, 0.5, 0.5, 0),

        '& img': {
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            borderRadius: theme.radius,
        },
    },
    delete: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: theme.rem(2),
        width: theme.rem(2),
        margin: '0.2rem',
        cursor: 'pointer',
        borderRadius: theme.rem(0.7),

        '&::before': {
            height: '60%',
        },
        '&::after': {
            height: '60%',
        },
    },
}));

interface UploadsItemProps {
    src: string;
    onDelete: (value: string) => void;
}
const UploadsItem = ({ src, onDelete }: UploadsItemProps): ReactElement => {
    const css = useStyles();
    const handleDelete = (): void => onDelete(src);
    return (
        <div className={css.img}>
            <ButtonClose className={css.delete} onClick={handleDelete} />
            <img src={src} alt="" />
        </div>
    );
};

interface IProps {
    onSubmit?: (value: string, uploads: string[]) => void;
}

const ChatForm = ({ onSubmit }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(768);
    const desktop = useMedia(1024);

    const [emoji, setEmoji] = useState<boolean>(false);
    const handleEmoji = (): void => setEmoji(!emoji);

    const [uploads, setUploads] = useState<string[]>([]);
    const handleUploads = (): void => modal.open(<ChatUploadsModal onChange={setUploads} />);
    const handleDelete = (src: string): void => setUploads(val => val.filter(item => item !== src));

    const [value, setValue] = useState<string>('');
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => setValue(event.target.value);

    const handleSubmit = (event: FormEvent | KeyboardEvent<HTMLTextAreaElement>): void => {
        event.preventDefault();
        if (!value.trim().length) return;
        if (onSubmit) onSubmit(value, uploads);
        setValue('');
        setUploads([]);
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
        <div className={css.root}>
            {uploads?.length
                ? uploads.map<ReactElement>(src => <UploadsItem key={src} src={src} onDelete={handleDelete} />)
                : null}
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
                                    width: '40rem',
                                    height: '60rem',
                                    maxWidth: '90vw',
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
        </div>
    );
};

export default ChatForm;
