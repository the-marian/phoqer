import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import useTrans from '../../../../../../../hooks/trans.hook';
import Button from '../../../../../../common/button';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
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
        marginBottom: theme.rem(4),
        padding: theme.rem(1.5, 2),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
        transition: theme.transitions[0],
        ...template(theme).outline,

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
    const trans = useTrans();

    return (
        <div className={css.wrp}>
            <img className={css.img} src="/about.jpg" alt="" />
            <Button className={css.file}>
                <FontAwesomeIcon icon={faRedo} />
                <span>{trans('change_photo')}</span>
                <input type="file" />
            </Button>
        </div>
    );
};

export default Avatar;
