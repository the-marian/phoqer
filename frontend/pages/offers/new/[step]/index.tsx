import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { serverRedirect } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Container from '../../../../components/layout/container';
import Meta from '../../../../components/layout/meta';
import PageLayout from '../../../../components/layout/page-layout';
import Draft from '../../../../components/pages/offers/new/draft';
import StepFive from '../../../../components/pages/offers/new/step-five';
import StepFour from '../../../../components/pages/offers/new/step-four';
import StepOne from '../../../../components/pages/offers/new/step-one';
import StepThree from '../../../../components/pages/offers/new/step-three';
import StepTwo from '../../../../components/pages/offers/new/step-two';
import Stepper from '../../../../components/pages/offers/new/stepper';
import Success from '../../../../components/pages/offers/new/success';
import useTrans from '../../../../hooks/trans.hook';
import { INewOffer, IState, IStore } from '../../../../interfaces';
import { wrapper } from '../../../../redux/store';
import types from '../../../../redux/types';

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
    const history = useRouter();
    const trans = useTrans();

    const STEPS_TITLE = [trans('main'), trans('description'), trans('photo')];
    const [page, setPage] = useState<number | string>(1);
    const value = useSelector<IState, INewOffer>(state => state.offers.new_offer);

    useEffect(() => {
        if (history.query.step) {
            const step = String(history.query.step || '');

            /*
             * @desc don't use single if statement as it can brake the navigation logic
             * */
            if (step === '2' && !value?.isDone?.one) {
                // *
                // return to first pages if user dont fill any of required field at step one
                history.push(routes.offers.new(1));
            } else if (step === '3' && !value?.isDone?.two) {
                // *
                // return to first pages if user dont fill any of required field at step two
                history.push(routes.offers.new(1));
            } else if (['4', '5', 'success'].includes(step) && (!value?.isDone?.one || !value?.isDone?.two)) {
                // *
                // return to first pages if user dont fill any of required field at step one and two
                history.push(routes.offers.new(1));
            } else {
                setPage(step);
            }
        }
    }, [history.query.step]);

    return (
        <>
            <AuthRedirect />
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
        </>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx): Promise<void> => {
    if (serverRedirect(ctx as unknown as GetServerSidePropsContext)) return;
    ctx?.store?.dispatch({ type: types.GET_CATEGORIES_START });
    ctx?.store?.dispatch(END);
    await (ctx?.store as IStore)?.sagaTask?.toPromise();
});

export default NewOffer;
