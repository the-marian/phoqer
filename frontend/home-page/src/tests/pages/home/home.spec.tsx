import { categories } from '@app/mock/categories';
import Home from '@app/pages';
import { render } from '@app/tests/tests.utils';

describe('Home page', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Home topOffers={[]} categories={categories} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
