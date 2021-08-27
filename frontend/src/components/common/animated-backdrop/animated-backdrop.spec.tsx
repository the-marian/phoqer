import { render } from '../../../tests/tests.utils';

import AnimatedBackdrop from './index';

describe('AnimatedBackdrop component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<AnimatedBackdrop />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<AnimatedBackdrop className="test" />);
        expect(asFragment()).toMatchSnapshot();
    });
});
