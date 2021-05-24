import { render } from '../../../tests/tests.utils';
import Banner from './index';

describe('Banner component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Banner />, {});
        expect(asFragment()).toMatchSnapshot();
    });
});
