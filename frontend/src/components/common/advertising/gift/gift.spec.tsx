import { render } from '../../../../tests/tests.utils';

import Gift from './index';

describe('Gift component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Gift />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Gift style={{ margin: '10px 20px', paddingBottom: '10px', backgroundColor: '#fff' }} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
