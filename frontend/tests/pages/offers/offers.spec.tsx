import Offers from '../../../pages/offers';
import { render } from '../../tests.utils';

describe('Offers component', () => {
    it('match snapshot', () => {
        const { asFragment } = render(<Offers />);
        expect(asFragment()).toMatchSnapshot();
    });
});
