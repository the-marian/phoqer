import { render } from '../../../../../tests/tests.utils';

import ForgotPassForm from './index';

describe('ForgotPassForm component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<ForgotPassForm />);
        expect(asFragment()).toMatchSnapshot();
    });
});
