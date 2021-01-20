import { faCompressArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    inner: {
        position: 'relative',

        '&:hover button': {
            opacity: 1,
            pointerEvents: 'auto',
        },

        '&:focus button': {
            opacity: 1,
            pointerEvents: 'auto',
        },
    },
    textarea: {
        transition: theme.transitions[0],
    },
    resize: {
        position: 'absolute',
        bottom: theme.rem(2),
        right: theme.rem(2),
        padding: theme.rem(1),
        borderRadius: theme.radius,
        background: theme.palette.gray[1],
        opacity: 0,
        pointerEvents: 'none',
        transition: theme.transitions[0],

        '& svg': {
            height: theme.rem(1.6),
            width: theme.rem(1.8),
        },
    },
}));

interface IProps {
    value: string | number;
    name: string;
    placeholder: string;
    className: string | number;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaResize = ({ value, onChange, className, name, placeholder }: IProps): ReactElement => {
    const css = useStyles();
    const [big, useBig] = useState(false);

    const handleClick = (): void => {
        useBig(!big);
    };

    return (
        <div className={css.inner}>
            <textarea
                value={value}
                onChange={onChange}
                className={clsx(css.textarea, className)}
                name={name}
                placeholder={placeholder}
                style={{ height: big ? '55rem' : '15rem' }}
            />
            <button className={css.resize} type="button" onClick={handleClick}>
                {big ? <FontAwesomeIcon icon={faCompressArrowsAlt} /> : <FontAwesomeIcon icon={faExpandArrowsAlt} />}
            </button>
        </div>
    );
};

export default TextareaResize;
