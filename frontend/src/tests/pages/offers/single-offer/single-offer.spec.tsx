import locales from '../../../../assets/translations';
import SingleOfferPage from '../../../../pages/offers/[offerId]';
import initState from '../../../../redux/state';
import { mockSingleOffer } from '../../../__mocks__/match-media.mock';
import { render } from '../../../tests.utils';

describe('SingleOfferPage component', () => {
    describe('default', () => {
        it('match snapshot', () => {
            const { asFragment } = render(<SingleOfferPage />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('render offer info', () => {
            const { getAllByText, getByText } = render(<SingleOfferPage />, {
                preloadedState: { ...initState, offers: { ...initState.offers, single: mockSingleOffer } },
                auth: { access_token: 'test' },
            });

            expect(getAllByText(/test title/gi)).toBeTruthy();
            expect(getAllByText(/test description/gi)).toBeTruthy();
            expect(getByText(locales.en['client_provide_documents'])).toBeTruthy();
            expect(getByText(locales.en['owner_delivers_good'])).toBeTruthy();
        });
    });
});
