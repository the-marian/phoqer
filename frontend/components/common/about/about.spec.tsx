import { render } from '../../../tests/tests.utils';
import About from './index';

describe('About component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<About />, {});
        expect(asFragment()).toMatchSnapshot();
    });
});
