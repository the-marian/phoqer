import ForgotPass from '../../../../pages/auth/forgot-pass';
import { render } from '../../../tests.utils';

describe('ForgotPass component', () => {
    it('match snapshot', () => {
        const { asFragment } = render(<ForgotPass />);
        expect(asFragment()).toMatchSnapshot();
    });
});
