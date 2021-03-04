import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UploadedUppyFile } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import React, { ChangeEvent, FormEvent, KeyboardEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import config from '../../../../../assets/config';
import { Theme } from '../../../../../assets/theme';
import useMedia from '../../../../../hooks/media.hook';
import useTheme from '../../../../../hooks/theme.hook';
import useUppy from '../../../../../hooks/uppy.hook';
import notifications from '../../../../Common/Notifications';

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
            height: theme.rem(1.8),
            width: theme.rem(1.6),
            margin: theme.rem(0, 1, 0, 0),
        },
    },
    textarea: {
        ...theme.input,
        margin: theme.rem(0, 0, 1),
        padding: theme.rem(1.5),
        fontSize: theme.rem(1.4),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],

        '@media (max-width: 900px)': {
            margin: 0,
        },
    },
    small: {
        display: 'block',
        margin: theme.rem(0, 0, 1),
        fontSize: theme.rem(1.2),
        color: theme.palette.gray[4],
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
        padding: theme.rem(1.2, 2),
        background: theme.palette.primary[0],
        color: theme.palette.white,
        borderRadius: theme.radius,

        '& svg': {
            height: theme.rem(1.6),
            width: theme.rem(1.6),
        },

        '@media (max-width: 1050px)': {
            margin: theme.rem(2, 0),
        },
    },
    submit: {
        margin: theme.rem(0, 0, 0, 1),
        padding: theme.rem(1.5, 2),
        background: theme.palette.primary[0],
        color: theme.palette.white,
        borderRadius: theme.radius,

        '& svg': {
            height: theme.rem(2),
            width: theme.rem(2),
        },
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
    const [theme] = useTheme();
    const media = useMedia(900);

    const [value, setValue] = useState<string>('');
    const [attachment, setAttachment] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };

    const handleAttachment = (): void => {
        setAttachment(!attachment);
    };

    const handleSubmit = async (event?: FormEvent<HTMLFormElement>): Promise<void> => {
        event?.preventDefault();
        if (!value.trim().length) return;
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
                (item: UploadedUppyFile<unknown, { images_url?: [string] }>): string =>
                    config.img + item?.response?.body?.images_url?.[0],
            );

            onSubmit(value, images);
            setAttachment(false);
            setValue('');
        } catch (error) {
            notifications('error');
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
            {media && (
                <small className={css.small}>
                    * Чтобы отправить сообщение нажмите &quot;Enter&quot;. Для переноса строки нажмите &quot;Enter + Shift&quot;.
                </small>
            )}
            <div className={css.flex}>
                <TextareaAutosize
                    value={value}
                    className={css.textarea}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    name="comment"
                    wrap="soft"
                    placeholder="Комментировать ..."
                    title='Для переноса строки нажмите "Enter + Shift". Чтобы отправить сообщение нажмите "Enter"'
                />

                {!media && (
                    <button className={css.submit} type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                )}
            </div>

            {attachment && (
                <Dashboard theme={theme === 'white' ? 'light' : 'dark'} hideUploadButton uppy={uppy} height={media ? 230 : 200} />
            )}

            <button type="button" className={css.attachment} onClick={handleAttachment}>
                {attachment ? (
                    <>
                        <FontAwesomeIcon icon={faTimes} />
                        <span>Comment without attachments</span>
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faPaperclip} />
                        <span>Add attachments</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default CommentsForm;
