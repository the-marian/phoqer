import { render } from '../../../tests/tests.utils';
import Advertising from './index';

describe('Advertising component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Advertising />, {});
        expect(asFragment()).toMatchSnapshot();
    });
});
