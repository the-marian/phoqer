import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import Advertising from '../Advertising';
import newOfferTemplate from '../index.style';

const useStyles = createUseStyles((theme: Theme) => newOfferTemplate(theme).end);

const Draft = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    const handleDraft = (): void => {
        history.push(routes.profile.private.my_offers('draft'), undefined, { shallow: true });
    };

    return (
        <div className={css.success}>
            <svg viewBox="0 0 76 76">
                <circle cx={38} cy={38} r={36} />
                <path
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    d="M17.7,40.9l10.9,10.9l28.7-28.7"
                />
            </svg>

            <h2 className={css.title}>Ваше объявление успешно сгенерировано</h2>

            <p className={css.text}>
                Вы можете поместить его в черновики. Тогда никто не увидит ваше объявление, так что вы сможете его изменить перед
                публикацией. Или вы можете сразу опубликовать его на сайте
            </p>

            <div className={css.flex}>
                <button type="button" className={css.btn} onClick={handleDraft}>
                    Отправить в черновики
                </button>
                <button type="button" className={clsx(css.btn, css.primary)}>
                    Публиковать
                </button>
            </div>

            <Advertising />
        </div>
    );
};

export default Draft;
