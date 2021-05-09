import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ICheckboxes } from '../../../../interfaces';
import Checkboxes from '../../checkbox/checkboxes';
import { modal } from '../../modal';
import SmallModalWrp from '../../modal/small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    checkbox: {
        marginTop: 0,
    },
    list: {
        display: 'block',
        marginTop: theme.rem(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        textTransform: 'capitalize',
    },
    cancel: {
        ...template(theme).btn,
        marginRight: theme.rem(1),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],
    },
    save: {
        ...template(theme).btn,
        textTransform: 'capitalize',
    },
}));

interface IProps {
    values: ICheckboxes;
    labels: string[];
    onChange: (values: ICheckboxes) => void;
}

const DropDownValuesModal = ({ values, labels, onChange }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    const [all, setAll] = useState<boolean | null>(false);
    const [localeValue, setLocaleValue] = useState<ICheckboxes>(values);

    useEffect(() => {
        setAll(Object.values(localeValue).every(item => item));
    }, [localeValue]);

    const handleAll = (data: ICheckboxes): void => {
        setLocaleValue(
            Object.keys(localeValue).reduce<ICheckboxes>((acc, item) => {
                acc[item] = data.all;
                return acc;
            }, {}),
        );
        setAll(data.all);
    };

    const handleChange = (data: ICheckboxes): void => {
        setLocaleValue(data);
    };

    const handleSave = (): void => {
        onChange(localeValue);
        modal.close();
    };

    return (
        <SmallModalWrp>
            <Checkboxes className={css.checkbox} values={{ all }} labels={['Select all']} onChange={handleAll} />
            <hr />
            <Checkboxes className={css.list} values={localeValue} labels={labels} onChange={handleChange} />

            <div className={css.buttons}>
                <button className={css.cancel} type="button" onClick={modal.close}>
                    {trans('cancel')}
                </button>
                <button className={css.save} type="button" onClick={handleSave}>
                    {trans('save')}
                </button>
            </div>
        </SmallModalWrp>
    );
};

export default DropDownValuesModal;
