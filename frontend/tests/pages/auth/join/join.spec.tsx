import Join from '../../../../pages/auth/join';
import { render } from '../../../tests.utils';

describe('Join component', () => {
    it('match snapshot', () => {
        const { asFragment } = render(<Join />);
        expect(asFragment()).toMatchSnapshot();
    });
});
