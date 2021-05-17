import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import { ICheckboxes } from '../../../interfaces';
import { modal } from '../modal';
import DropDownValuesModal from './drop-down-values-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    input: {
        ...template(theme).input,
        background: theme.palette.gray[0],
    },
    text: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        color: theme.palette.black[0],
    },
    placeholder: {
        color: theme.palette.gray[2],
    },
}));

interface IProps {
    className?: string;
    placeholder?: string;
    values: ICheckboxes;
    labels: string[];
    onChange: (values: ICheckboxes) => void;
}

const DropDownMultiple = ({ className, values, labels, onChange, placeholder = '...' }: IProps): ReactElement => {
    const css = useStyles();

    const text = Object.entries(values)
        .reduce<string>((acc, item, index) => {
            if (item[1]) acc += labels[index] + ', ';
            return acc;
        }, '')
        ?.slice(0, -2);

    const handleClick = (): void => {
        modal.open(<DropDownValuesModal values={values} labels={labels} onChange={onChange} />);
    };

    return (
        <button type="button" className={clsx(css.input, className)} onClick={handleClick}>
            <p className={clsx(css.text, !text && css.placeholder)}>{text.trim() || placeholder}</p>
        </button>
    );
};

export default DropDownMultiple;
