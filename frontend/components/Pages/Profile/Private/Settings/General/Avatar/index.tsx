import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../../assets/theme';
import Button from '../../../../../../Layout/Button';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        minWidth: theme.rem(20),

        ...theme.media(680).max({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
        }),
    },
    img: {
        display: 'block',
        height: theme.rem(20),
        width: theme.rem(20),
        marginBottom: theme.rem(2),
        borderRadius: '50%',
        objectFit: 'cover',
    },
    file: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.6),
        padding: theme.rem(2),
        borderRadius: theme.radius,
        transition: theme.transitions[0],

        ...theme.hover({
            background: theme.palette.gray[1],
        }),

        '& span': {
            marginLeft: theme.rem(1),
        },

        '& input': {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            display: 'block',
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
        },
    },
}));

const Avatar = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.wrp}>
            <img className={css.img} src="/about.jpg" alt="" />
            <Button className={css.file}>
                <FontAwesomeIcon icon={faRedo} />
                <span>Изменить фото</span>
                <input type="file" />
            </Button>
        </div>
    );
};

export default Avatar;
