import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { declOfNum, moneyFormat } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import { IOfferCard, IState } from '../../../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
    req: {
        '& li': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: theme.rem(2, 0),
        },
    },
    dots: {
        flexGrow: 2,
        margin: theme.rem(0, 2),
        borderBottom: '0.1rem dashed #aaa',
    },
    emoji: {
        '& li': {
            display: 'flex',
            alignItems: 'center',
            margin: theme.rem(2, 0),
        },
        '& img': {
            height: theme.rem(3),
            width: theme.rem(3),
            marginRight: theme.rem(2),
        },
    },
    gray: {
        filter: 'grayscale(100%)',
        color: theme.palette.gray[3],
    },
}));

const Requirements = (): ReactElement => {
    const css = useStyles();
    const offer = useSelector<IState, IOfferCard>(state => state.offers.single);

    return (
        <>
            <ul className={css.req}>
                <li>
                    <span>Залоговая сумма:</span>
                    <span className={css.dots} />
                    <span>{offer?.deposit_val ? `${moneyFormat(offer?.deposit_val)}.00 грн` : 'Не указано'}</span>
                </li>
                <li>
                    <span>Минимальный срок аренды:</span>
                    <span className={css.dots} />
                    <span>
                        {offer?.min_rent_period
                            ? `${moneyFormat(offer?.min_rent_period)} ${declOfNum(offer?.min_rent_period, [
                                  'день',
                                  'дня',
                                  'дней',
                              ])}`
                            : 'Не указано'}
                    </span>
                </li>
                <li>
                    <span>Максимальный срок аренды:</span>
                    <span className={css.dots} />
                    <span>
                        {offer?.max_rent_period
                            ? `${moneyFormat(offer?.max_rent_period)} ${declOfNum(offer?.max_rent_period, [
                                  'день',
                                  'дня',
                                  'дней',
                              ])}`
                            : 'Не указано'}
                    </span>
                </li>
            </ul>
            <ul className={css.emoji}>
                <li className={offer?.is_deliverable ? undefined : css.gray}>
                    <img src="/emoji/delivery.png" alt="" />
                    <span>
                        {offer?.is_deliverable
                            ? 'Владелец осуществит доставку товара'
                            : 'Владелец НЕ осуществляет доставку товара'}
                    </span>
                </li>
                <li className={offer?.doc_needed ? undefined : css.gray}>
                    <img src="/emoji/documents.png" alt="" />
                    <span>
                        {offer?.doc_needed
                            ? 'Необходимо предоставить документы в качестве залога'
                            : 'НЕ нужно оставлять документы в качестве залога'}
                    </span>
                </li>
            </ul>
        </>
    );
};

export default Requirements;
