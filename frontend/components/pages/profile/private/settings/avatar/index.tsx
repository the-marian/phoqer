import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../assets/template';
import { Theme } from '../../../../../../assets/theme';
import useTrans from '../../../../../../hooks/trans.hook';
import Button from '../../../../../common/button';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: theme.rem(21),
    },
    sticky: {
        position: 'sticky',
        top: theme.rem(3),
        left: 0,
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
        ...template(theme).btn,
        position: 'relative',
        marginBottom: theme.rem(4),
        background: theme.palette.secondary[0],
        color: theme.palette.black[0],

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
            <div className={css.sticky}>
                <img className={css.img} src="/about.jpg" alt="" />
                <Button className={css.file}>
                    <FontAwesomeIcon icon={faRedo} />
                    <span>{trans('change_photo')}</span>
                    <input type="file" />
                </Button>
            </div>
        </div>
    );
};

export default Avatar;
