import { render } from '../../../tests/tests.utils';

import { getBaseNavList } from './navigation.config';

import Navigation from './index';

describe('Navigation component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Navigation tabs={getBaseNavList()} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Navigation className="test" tabs={getBaseNavList()} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
