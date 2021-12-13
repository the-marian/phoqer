import { render } from '../../../../../tests/tests.utils';

import LoginForm from './index';

describe('LoginForm component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<LoginForm />);
        expect(asFragment()).toMatchSnapshot();
    });
});
