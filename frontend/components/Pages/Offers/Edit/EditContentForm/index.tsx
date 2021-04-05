import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

import { moneyFormat, numberValidation } from '../../../../../assets/helpers';
import * as helpers from '../../../../../assets/helpers';
import template from '../../../../../assets/template';
import { Theme } from '../../../../../assets/theme';
import { ICategories, IDropValue, INewOffer, IOfferCard, IState } from '../../../../../interfaces';
import initState from '../../../../../redux/state';
import CheckTitle from '../../../../Common/Checkbox/CheckTitle';
import CheckYesNo from '../../../../Common/Checkbox/CheckYesNo';
import DropDown from '../../../../Common/DropDown';
import Input from '../../../../Common/Input';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-between',

        '& > div': {
            flexBasis: '48%',
        },

        ...theme.media(500).max({
            display: 'block',
        }),
    },
    inner: {
        margin: theme.rem(3, 0),
    },
    title: {
        margin: theme.rem(0, 0, 4),

        '&:not(:nth-of-type(1))': {
            margin: theme.rem(4, 0),
        },
    },
    subtitle: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
    },
    textarea: {
        ...template(theme).input,
        width: '100%',
        height: theme.rem(10),
        background: theme.palette.gray[1],
        padding: theme.rem(2),
        boxShadow: theme.shadow[1],
    },
    red: {
        color: theme.palette.red[0],
    },
    errors: {
        border: theme.border(0.1, theme.palette.red[0]),
        borderRadius: theme.radius,
    },
    errorsText: {
        marginTop: theme.rem(1),
        color: theme.palette.red[0],
        fontSize: theme.rem(1.2),
    },
    mark: {
        margin: theme.rem(1, 0, 4),
        fontSize: theme.rem(1.2),
    },
    region: {
        ...template(theme).btn,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        background: theme.palette.gray[1],
        color: theme.palette.black[0],

        '& span': {
            textAlign: 'left',
            width: 'calc(100% - 2.5rem)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
    },
    inputWrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inactive: {
        pointerEvents: 'none',
        opacity: '0.4',
    },
}));

const newOfferAdapter = (value: IOfferCard | null): INewOffer =>
    value
        ? {
              ...initState.offers.new_offer,

              title: value.title || '',
              price: value.price || 0,
              category: value.category ? ({ name: value.category_name, slug: value.category, type: 'main' } as IDropValue) : null,
              sub_category: value.sub_category
                  ? ({ name: value.sub_category_name, slug: value.sub_category, type: 'sub' } as IDropValue)
                  : null,
              is_deliverable: value.is_deliverable,

              doc_needed: value.doc_needed,
              description: value.description,
              deposit_val: value.deposit_val || null,
              min_rent_period: value.min_rent_period || 0,
              max_rent_period: value.max_rent_period || 0,
              extra_requirements: value.extra_requirements || '',
              optional: {
                  deposit_val: !!value.deposit_val,
                  min_rent_period: !!value.min_rent_period,
                  max_rent_period: !!value.max_rent_period,
              },
          }
        : initState.offers.new_offer;

interface IError {
    title?: string;
    price?: string;
    category?: string;
    description?: string;
    deposit_val?: string;
    min_rent_period?: string;
    max_rent_period?: string;
    extra_requirements?: string;
}

const EditContentForm = (): ReactElement => {
    const css = useStyles();

    const init = useSelector<IState, IOfferCard | null>(state => state.offers.single);
    const [value, setValue] = useState<INewOffer>(newOfferAdapter(init));
    const [errors, setErrors] = useState<IError>({});

    // categories
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = helpers.formatCatList(data);

    const handleChangeText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue({ ...(value || {}), [event.target.name]: event.target.value });
        setErrors({});
    };
    const handleDelivery = (is_deliverable: boolean): void => {
        setValue({ ...value, is_deliverable });
        setErrors({});
    };
    const handleCategory = (category: IDropValue | null): void => {
        setValue({ ...value, [category?.type === 'main' ? 'category' : 'sub_category']: category?.slug });
        setErrors({});
    };
    const handleDocs = (doc_needed: boolean): void => {
        setValue({ ...value, doc_needed });
        setErrors({});
    };
    const handleNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        setErrors({});
        const num = event.target.value.replace(/ /gi, '').trim();
        if (numberValidation(num)) return;
        setValue({ ...value, [event.target.name]: num === '' ? null : +num });
    };
    const handleDeposit = (deposit_val: boolean): void => {
        setErrors({});
        setValue({
            ...value,
            deposit_val: null,
            optional: { ...value.optional, deposit_val },
        });
    };
    const handleMin = (min_rent_period: boolean): void => {
        setErrors({});
        setValue({
            ...value,
            min_rent_period: null,
            optional: { ...value.optional, min_rent_period },
        });
    };
    const handleMax = (max_rent_period: boolean): void => {
        setErrors({});
        setValue({
            ...value,
            max_rent_period: null,
            optional: { ...value.optional, max_rent_period },
        });
    };

    return (
        <form action="#" method="post">
            <h2 className={css.title}>Основное</h2>
            <div className={css.inner}>
                <h3 className={css.subtitle}>
                    Название объявления <span className={css.red}>*</span>
                </h3>
                <Input
                    value={value.title || ''}
                    onChange={handleChangeText}
                    name="title"
                    type="text"
                    placeholder="Название"
                    errors={errors.title}
                />
            </div>
            <div className={css.inner}>
                <h3 className={css.subtitle}>
                    Укажите ваше местоположение <span className={css.red}>*</span>
                </h3>
                <button type="button" className={css.region}>
                    <FontAwesomeIcon icon={faCompass} />
                    <span>
                        Киев, Киевская область Киев, Киевская область Киев, Киевская область Киев, Киевская область Киев, Киевская
                        область
                    </span>
                </button>
            </div>
            <CheckYesNo value={value.is_deliverable} onChange={handleDelivery}>
                Укажите возможность доставки вашего товара в другой город
            </CheckYesNo>
            <div className={css.flex}>
                {!!categories.length && (
                    <div className={css.inner}>
                        <h3 className={css.subtitle}>
                            Выберите категорию товара <span className={css.red}>*</span>
                        </h3>
                        <div className={clsx(errors.category && css.errors)}>
                            <DropDown data={categories} placeholder="Выберите категорию" onChange={handleCategory} withSub />
                        </div>
                        {errors.category && <small className={css.errorsText}>{errors.category}</small>}
                    </div>
                )}
                <div className={css.inner}>
                    <h3 className={css.subtitle}>
                        Цена (грн/день) <span className={css.red}>*</span>
                    </h3>
                    <Input
                        value={moneyFormat(value.price || 0)}
                        onChange={handleChangeText}
                        type="text"
                        placeholder="Цена"
                        name="price"
                        errors={errors.price}
                    />
                </div>
            </div>

            <h2 className={css.title}>Описание</h2>
            <CheckYesNo value={value.doc_needed} onChange={handleDocs}>
                Укажите нужно ли предоставить документы для оренды вашего товара
            </CheckYesNo>
            <div className={css.inner}>
                <h3 className={css.subtitle}>
                    Описание товара <span className={css.red}>*</span>
                </h3>
                <TextareaAutosize
                    cacheMeasurements
                    value={value?.description}
                    onChange={handleChangeText}
                    wrap="soft"
                    className={clsx(css.textarea, errors.description && css.errors)}
                    name="description"
                    placeholder="Описание"
                />
                {errors.description && <small className={css.errorsText}>{errors.description}</small>}
            </div>
            <div className={css.inner}>
                <CheckTitle value={value.optional.deposit_val} onChange={handleDeposit}>
                    Залоговая сума (грн)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.deposit_val || css.inactive)}>
                    <Input
                        value={moneyFormat(value.deposit_val || 0)}
                        onChange={handleNumber}
                        name="deposit_val"
                        placeholder="Введите число"
                        readOnly={!value.optional.deposit_val}
                        errors={errors.deposit_val}
                    />
                </div>
            </div>
            <div className={css.inner}>
                <CheckTitle value={value.optional.min_rent_period} onChange={handleMin}>
                    Минимальный срок аренды (дней)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.min_rent_period || css.inactive)}>
                    <Input
                        value={moneyFormat(value.min_rent_period || 0)}
                        onChange={handleNumber}
                        name="min_rent_period"
                        placeholder="Введите число"
                        readOnly={!value.optional.min_rent_period}
                        errors={errors.min_rent_period}
                    />
                </div>
                {errors.min_rent_period && <small className={css.errorsText}>{errors.min_rent_period}</small>}
            </div>
            <div className={css.inner}>
                <CheckTitle value={value.optional.max_rent_period} onChange={handleMax}>
                    Максимальный срок аренды (дней)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.max_rent_period || css.inactive)}>
                    <Input
                        value={moneyFormat(value.max_rent_period || 0)}
                        onChange={handleNumber}
                        name="max_rent_period"
                        placeholder="Введите число"
                        readOnly={!value.optional.max_rent_period}
                        errors={errors.max_rent_period}
                    />
                </div>
            </div>
            <div className={css.inner}>
                <h3 className={css.title}>Дополнительные требования</h3>
                <TextareaAutosize
                    value={value.extra_requirements}
                    onChange={handleChangeText}
                    wrap="soft"
                    className={css.textarea}
                    name="extra_requirements"
                    placeholder="Дополнительно"
                />
            </div>

            <p className={css.mark}>
                <span className={css.red}>*</span> Обязательные поля
            </p>
        </form>
    );
};

export default EditContentForm;
