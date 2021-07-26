import React, { ChangeEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import useTrans from '../../../../../../hooks/trans.hook';
import mixin from '../../../../../../utils/theming/mixin';
import { Theme } from '../../../../../../utils/theming/theme';
import Button from '../../../../../common/button';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%',
    },
    textarea: {
        ...mixin(theme).input,
        minHeight: theme.rem(15),
        color: theme.palette.black[0],
    },
    label: {
        display: 'block',
        width: '100%',
        marginBottom: theme.rem(2),
    },
    text: {
        marginBottom: theme.rem(0.6),
        fontSize: theme.rem(1.4),
    },
    btn: {
        ...mixin(theme).btn,
        marginBottom: theme.rem(4),
    },
}));

interface IProps {
    loading: boolean;
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Bio = ({ value, onChange, loading }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    return (
        <div className={css.wrp}>
            <label className={css.label}>
                <p className={css.text}>{trans('user_bio')}</p>
                <TextareaAutosize
                    value={value}
                    onChange={onChange}
                    className={css.textarea}
                    name="bio"
                    wrap="soft"
                    placeholder={trans('start_typing')}
                />
            </label>

            <Button loading={loading} type="submit" className={css.btn}>
                {trans('apply_changes')}
            </Button>
        </div>
    );
};

export default Bio;
