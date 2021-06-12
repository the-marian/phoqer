import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../../../assets/routes';
import useTrans from '../../../../../hooks/trans.hook';
import { INewOffer, IOfferCard, IRegion, IState } from '../../../../../interfaces';
import initState from '../../../../../redux/state';
import types from '../../../../../redux/types';
import Button from '../../../../common/button';
import Progress from '../../../../common/loaders/progress';
import notifications from '../../../../common/notifications';
import Tooltip from '../../../../common/tooltip';
import editOfferTemplate from './edit-content-form.style';
import validate from './edit-content-form.validations';
import StepOne from './step-one';
import StepTwo from './step-two';

const useStyles = createUseStyles(editOfferTemplate);

export interface IError {
    title?: string;
    price?: string;
    region?: string;
    category?: string;
    currency?: string;
    description?: string;
    deposit_val?: string;
    items_amount?: string;
    rental_period?: string;
    min_rent_period?: string;
    max_rent_period?: string;
    extra_requirements?: string;
}

const newOfferAdapter = (value: IOfferCard | null): INewOffer =>
    value
        ? {
              ...initState.offers.new_offer,
              title: value.title || '',
              price: value.price || 0,
              category:
                  value.category && value.category
                      ? { name: value.category, slug: value.category, type: 'main' }
                      : value.sub_category && value.sub_category
                      ? { name: value.sub_category, slug: value.sub_category, type: 'sub' }
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

const EditContentForm = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();
    const offerId = String(history.query.offerId || '');
    const trans = useTrans();
    const dispatch = useDispatch();

    const region = useSelector<IState, IRegion>(state => state.region);
    const loading = useSelector<IState, boolean>(state => state.offers.edit_offer.loading);
    const init = useSelector<IState, IOfferCard | null>(state => state.offers.single);
    const [value, setValue] = useState<INewOffer>(newOfferAdapter(init));
    const [errors, setErrors] = useState<IError>({});

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        if (!offerId) {
            history.push(routes.profile.private.my_offers());
            return;
        }

        if (validate({ value, setErrors, region: !!region.selected?.country && !!region.selected?.city })) {
            dispatch({
                type: types.PATCH_EDIT_OFFER_STATUS_START,
                offerId,
                images: init?.images,
                payload: value,
                callback: () => {
                    history.push(routes.profile.private.my_offers('active'));
                    notifications.info({
                        message: 'your_changes_successfully_published',
                    });
                },
            });
        }
    };

    const handleSave = (): void => {
        if (!offerId) {
            history.push(routes.profile.private.my_offers());
            return;
        }

        if (validate({ value, setErrors, region: !!region.selected?.country && !!region.selected?.city })) {
            dispatch({
                type: types.PATCH_OFFER_START,
                offerId,
                images: init?.images,
                payload: value,
                callback: () => {
                    notifications.info({
                        message: 'your_changes_successfully_saved',
                    });
                },
            });
        }
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <StepOne value={value} setValue={setValue} errors={errors} setErrors={setErrors} />
            <StepTwo value={value} setValue={setValue} errors={errors} setErrors={setErrors} />
            <Progress loading={loading} />
            <p className={css.mark}>
                <span className={css.red}>*</span> {trans('required_fields')}
            </p>

            <div className={css.group}>
                <Tooltip content="all_your_changes_will_be_saved">
                    <Button loading={loading} className={css.save} type="button" onClick={handleSave}>
                        {trans('save_changes')}
                    </Button>
                </Tooltip>
                <Button loading={loading} className={css.submit} type="submit">
                    {trans('publish')}
                </Button>
            </div>
        </form>
    );
};

export default EditContentForm;
