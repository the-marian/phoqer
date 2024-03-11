import { useCallback } from 'react';

import { ID } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useErrorToast } from 'src/hook/error-toast.hook';
import { useSuccessToast } from 'src/hook/success-toast.hook';
import { ordersService } from 'src/services/orders.service';

type StartRentHook = (id: ID, callback?: () => void) => void;

export const useStartRent = (): StartRentHook => {
    const { t } = useTranslation();

    const errorToast = useErrorToast();
    const successToast = useSuccessToast();

    const { currentPage, setCurrentPage } = useOrdersContext();
    return useCallback(
        (id: ID, callback): void => {
            ordersService
                .startRent(id)
                .then(() => setCurrentPage(currentPage))
                .then(() => successToast(t('You have successfully started your rental')))
                .then(callback)
                .catch(() => errorToast());
        },
        [currentPage, errorToast, setCurrentPage, successToast, t],
    );
};
