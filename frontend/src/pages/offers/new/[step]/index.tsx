import React, { ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import AuthRedirect from '../../../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../../../components/layout/container';
import PageLayout from '../../../../components/layout/page-layout';
import Meta from '../../../../components/meta';
import Draft from '../../../../components/pages/offers/new/draft';
import StepFive from '../../../../components/pages/offers/new/step-five';
import StepFour from '../../../../components/pages/offers/new/step-four';
import StepOne from '../../../../components/pages/offers/new/step-one';
import StepThree from '../../../../components/pages/offers/new/step-three';
import StepTwo from '../../../../components/pages/offers/new/step-two';
import Stepper from '../../../../components/pages/offers/new/stepper';
import Success from '../../../../components/pages/offers/new/success';
import useTrans from '../../../../hooks/trans.hook';
import { INewOffer, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        maxWidth: theme.rem(80),
        margin: '0 auto 5rem',
        textAlign: 'center',
        fontSize: theme.rem(3),
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        background: theme.palette.primary[0],

        ...theme.media(768).max({
            fontSize: theme.rem(2),
        }),
    },
    red: {
        color: theme.palette.red[0],
    },
    text: {
        maxWidth: theme.rem(80),
        margin: '3rem auto 5rem',
        color: theme.palette.gray[3],
        fontSize: theme.rem(1.3),
    },
}));

const STEPS: { [key: string]: JSX.Element | JSX.Element[] } = {
    1: <StepOne />,
    2: <StepTwo />,
    3: <StepThree />,
    4: <StepFour />,
    5: <StepFive />,
    draft: <Draft />,
    success: <Success />,
};

const NewOffer = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();
    const dispatch = useDispatch();

    const STEPS_TITLE = [trans('main'), trans('description'), trans('photo')];
    const [page, setPage] = useState<number | string>(1);
    const value = useSelector<IState, INewOffer>(state => state.offers.new_offer);

    useEffect(() => {
        dispatch({ type: types.GET_CATEGORIES_START });
    }, [dispatch]);

    useEffect(() => {
        if (history.query.step) {
            const step = String(history.query.step || '');

            /*
             * @desc don't use single if statement as it can brake the navigation logic
             * */
            if (step === '2' && !value?.isDone?.one) {
                // *
                // return to first per-pages if user dont fill any of required field at step one
                history.push(routes.offers.new(1), undefined, { shallow: true });
            } else if (step === '3' && !value?.isDone?.two) {
                // *
                // return to first per-pages if user dont fill any of required field at step two
                history.push(routes.offers.new(1), undefined, { shallow: true });
            } else if (['4', '5', 'success'].includes(step) && (!value?.isDone?.one || !value?.isDone?.two)) {
                // *
                // return to first per-pages if user dont fill any of required field at step one and two
                history.push(routes.offers.new(1), undefined, { shallow: true });
            } else {
                setPage(step);
            }
        }
    }, [history, history.query.step, value?.isDone?.one, value?.isDone?.two]);

    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta title={trans('create_new_offer')} h1={trans('share_with_others_and_earn')} />
                <PageLayout>
                    <Container>
                        <>
                            {[1, 2, 3].includes(+page) ? (
                                <>
                                    <h2 className={css.title}>{trans('share_with_others_and_earn')}</h2>
                                    <Stepper titles={STEPS_TITLE} current={+page} />
                                </>
                            ) : null}

                            {history.query.step !== undefined ? STEPS[page] || STEPS[1] : null}

                            {[1, 2].includes(+page) && (
                                <p className={css.text}>
                                    <span className={css.red}>*</span> {trans('required')}
                                </p>
                            )}
                        </>
                    </Container>
                </PageLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default NewOffer;
