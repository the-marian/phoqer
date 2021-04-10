import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import Advertising from '../../../../common/advertising';
import ConfettiWrp from '../../../../common/confetti';
import newOfferTemplate from '../new-offer.style';

const useStyles = createUseStyles((theme: Theme) => newOfferTemplate(theme).end);

const Success = (): ReactElement => {
    const css = useStyles();
    const { query } = useRouter();
    const offerId = String(query.offerId);

    return (
        <>
            <ConfettiWrp />
            <div>
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

                    <h2 className={css.title}>Ваше объявление отправлено на модерацию</h2>

                    <p className={css.text}>
                        В ближайшее время мы проверим ваше объявление и опубликуем его. Вы можете отслеживать статус вашего
                        объявления в личном кабинете.
                    </p>

                    <div className={css.flex}>
                        <Link href={routes.profile.private.my_offers('all')}>
                            <a className={css.btn}>Перейти в личный кабинет</a>
                        </Link>
                        <Link href={routes.offers.single(offerId)}>
                            <a className={clsx(css.btn, css.primary)} type="button">
                                Просмотреть объявление
                            </a>
                        </Link>
                    </div>
                </div>

                <Advertising />
            </div>
        </>
    );
};

export default Success;
