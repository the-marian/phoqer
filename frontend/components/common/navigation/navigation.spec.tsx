import { render } from '../../../tests/tests.utils';
import Navigation from './index';
import { getBaseNavList } from './navigation.config';

describe('Navigation component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Navigation tabs={getBaseNavList()} />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Navigation className="test" tabs={getBaseNavList()} />, {});
        expect(asFragment()).toMatchSnapshot();
    });
});
