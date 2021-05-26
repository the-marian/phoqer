import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import useTrans from '../../../../../hooks/trans.hook';
import Advertising from '../../../../common/advertising';
import ConfettiWrp from '../../../../common/confetti';
import newOfferTemplate from '../new-offer.style';

const useStyles = createUseStyles((theme: Theme) => newOfferTemplate(theme).end);

const Draft = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const { query } = useRouter();
    const offerId = String(query.offerId || '');

    return (
        <>
            <ConfettiWrp />
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

                <h2 className={css.title}>{trans('your_offer_was_saved_in_drafts')}</h2>

                <p className={css.text}>{trans('you_can_return_to_it')}</p>

                <div className={css.flex}>
                    <Link href={routes.profile.private.my_offers('draft')}>
                        <a className={css.btn}>{trans('view_drafts')}</a>
                    </Link>
                    <Link href={routes.offers.single(offerId)}>
                        <a className={clsx(css.btn, css.primary)} type="button">
                            {trans('view_offer')}
                        </a>
                    </Link>
                </div>

                <Advertising />
            </div>
        </>
    );
};

export default Draft;
