import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UploadedUppyFile } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import clsx from 'clsx';
import React, { ChangeEvent, FormEvent, KeyboardEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import config from '../../../../assets/config';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useMedia from '../../../../hooks/media.hook';
import useTheme from '../../../../hooks/theme.hook';
import useTrans from '../../../../hooks/trans.hook';
import useUppy from '../../../../hooks/uppy.hook';
import notificationsModal from '../../modal/notifications-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    attachment: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.rem(1, 0),
        color: theme.palette.primary[0],
        fontSize: theme.rem(1.6),

        '& span': {
            textAlign: 'left',
        },

        '& svg': {
            margin: theme.rem(0, 1, 0, 0),
        },
    },
    textarea: {
        ...template(theme).input,
        minHeight: theme.rem(5),
        padding: theme.rem(1.5),
        fontSize: theme.rem(1.4),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],

        ...theme.media(800).max({
            margin: '0',
        }),
    },
    error: {
        border: theme.border(0.2, theme.palette.red[0]),
        ...theme.hover({
            border: theme.border(0.2, theme.palette.red[0]),
        }),
        ...theme.focus({
            border: theme.border(0.2, theme.palette.red[0]),
        }),
    },
    small: {
        display: 'block',
        margin: theme.rem(0, 0, 1),
        fontSize: theme.rem(1.2),
        color: theme.palette.gray[4],
    },
    errorText: {
        color: theme.palette.red[0],
    },
    file: {
        margin: theme.rem(1, 0),
        color: theme.palette.primary[0],
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[3],

        '& svg': {
            height: theme.rem(1.6),
            width: theme.rem(1.6),
            marginRight: theme.rem(1),
        },
    },
    btn: {
        ...template(theme).btn,

        ...theme.media(1050).max({
            margin: theme.rem(2, 0),
        }),
    },
    submit: {
        ...template(theme).btn,
        width: theme.rem(8),
        marginLeft: theme.rem(1),
    },
    disabled: {
        cursor: 'not-allowed',
    },
}));

interface IProps {
    onSubmit: (body: string, images: string[]) => void;
}

const CommentsForm = ({ onSubmit }: IProps): ReactElement => {
    const css = useStyles();
    const uppy = useUppy();
    const trans = useTrans();
    const [theme] = useTheme();
    const media = useMedia(900);

    const [error, setError] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [attachment, setAttachment] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
        setError('');
    };

    const handleAttachment = (): void => {
        setAttachment(!attachment);
    };

    const handleSubmit = async (event?: FormEvent<HTMLFormElement>): Promise<void> => {
        event?.preventDefault();
        if (!value.trim().length) {
            setError('Введите текст комментария');
            return;
        }
        if (!attachment) {
            onSubmit(value, []);
            setValue('');
            return;
        }

        if (!uppy.getFiles()?.length) {
            onSubmit(value, []);
            setValue('');
            setAttachment(false);
            return;
        }

        try {
            const res = await uppy.upload();
            if (res.failed.length > 0) throw new Error();

            const images: string[] = await res?.successful?.map(
                (item: UploadedUppyFile<unknown, { image_url?: string }>): string => config.img + item?.response?.body?.image_url,
            );

            onSubmit(value, images);
            setAttachment(false);
            setValue('');
        } catch (error) {
            notificationsModal('error');
        }
    };

    const handleKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
        if (event.key === 'Enter' && !event.shiftKey) {
            if (!media) return;

            event.preventDefault();
            await handleSubmit();
        }
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            {media && <small className={css.small}>* {trans('press_enter_send')}</small>}
            <div className={css.flex}>
                <TextareaAutosize
                    value={value}
                    className={clsx(css.textarea, error && css.error)}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    name="comment"
                    wrap="soft"
                    title={trans('press_enter_send')}
                    placeholder={trans('comment')}
                />

                {!media && (
                    <button className={css.submit} type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                )}
            </div>
            {error && <small className={clsx(css.small, css.errorText)}>{error}</small>}

            {attachment && (
                <Dashboard
                    theme={theme.includes('black') ? 'dark' : 'light'}
                    hideUploadButton
                    uppy={uppy}
                    height={media ? 230 : 200}
                />
            )}

            <button type="button" className={css.attachment} onClick={handleAttachment}>
                {attachment ? (
                    <>
                        <FontAwesomeIcon icon={faTimes} />
                        <span>{trans('comment_without_attachments')}</span>
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faPaperclip} />
                        <span>{trans('add_attachments')}</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default CommentsForm;
