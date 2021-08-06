import Login from '../../../../pages/auth/login';
import { render } from '../../../tests.utils';

describe('Login component', () => {
    it('match snapshot', () => {
        const { asFragment } = render(<Login />);
        expect(asFragment()).toMatchSnapshot();
    });
});
