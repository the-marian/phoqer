import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UploadedUppyFile } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import clsx from 'clsx';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import config from '../../../../../assets/config';
import { Theme } from '../../../../../assets/theme';
import useMedia from '../../../../../hooks/media.hook';
import useUppy from '../../../../../hooks/uppy.hook';
import Switcher from '../../../../Common/Switcher';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',

        '& span': {
            textAlign: 'left',
        },

        '& svg': {
            height: theme.rem(1.8),
            width: theme.rem(1.8),
            margin: theme.rem(0, 1),
        },
    },
    textarea: {
        ...theme.input,
        padding: theme.rem(2),
        fontSize: theme.rem(1.6),
        background: theme.palette.gray[1],
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
    switcher: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: theme.rem(2, 0),

        '@media (max-width: 1050px)': {
            display: 'block',
        },
    },
    btn: {
        padding: theme.rem(1.2, 3),
        background: theme.palette.primary[0],
        color: theme.palette.white,
        borderRadius: theme.radius,
        fontSize: theme.rem(1.6),

        '@media (max-width: 1050px)': {
            margin: theme.rem(2, 0),
        },
    },
    disabled: {
        cursor: 'not-allowed',
    },
}));

interface IProps {
    onSubmit: (value: string, images: { url: string }[]) => void;
}

const CommentsForm = ({ onSubmit }: IProps): ReactElement => {
    const css = useStyles();
    const uppy = useUppy();
    const media = useMedia(900);

    const [value, setValue] = useState<string>('');
    const [attachment, setAttachment] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };

    const handleAttachment = (value: boolean): void => {
        setAttachment(value);
    };

    useEffect(() => {
        const handler = (res): void => {
            const images: { url: string }[] = res?.successful?.map(
                (item: UploadedUppyFile<string, { images_url: [string] }>) => ({
                    url: config.img + item?.response?.body?.images_url?.[0],
                }),
            );

            onSubmit(value, images);
        };

        uppy.on('complete', handler);
        return () => {
            uppy.off('complete', handler);
        };
    }, []);

    const handleSubmit = (): void => {
        if (!value) return;
        onSubmit(value, []);
        setValue('');
    };

    return (
        <>
            <TextareaAutosize
                value={value}
                className={css.textarea}
                onChange={handleChange}
                name="comment"
                placeholder="Оставте ваш отзыв"
            />

            <div className={css.switcher}>
                <Switcher onClick={handleAttachment}>
                    <div className={css.flex}>
                        <FontAwesomeIcon icon={faPaperclip} />
                        <span>{attachment ? 'Comment without attachments' : 'Add attachments'}</span>
                    </div>
                </Switcher>

                {!attachment && (
                    <button className={clsx(css.btn, !value && css.disabled)} type="button" onClick={handleSubmit}>
                        Комментировать
                    </button>
                )}
            </div>

            {attachment && <Dashboard uppy={uppy} height={media ? 400 : 300} />}
        </>
    );
};

export default CommentsForm;
