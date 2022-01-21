import SingleOfferPage from '../../../../pages/offers/[offerId]';
import offersInit from '../../../../redux/offers/init-state';
import { render } from '../../../tests.utils';

describe('SingleOfferPage component', () => {
    describe('default', () => {
        it('match snapshot', () => {
            const { asFragment } = render(<SingleOfferPage data={offersInit.single.data} />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
