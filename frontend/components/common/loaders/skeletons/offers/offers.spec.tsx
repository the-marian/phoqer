import { render } from '../../../../../tests/tests.utils';
import Offers from './index';

describe('Offers component', () => {
    it('matches snapshot, without props', () => {
        const { asFragment } = render(<Offers />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot, with props', () => {
        const { asFragment } = render(<Offers amount={5} />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot, with className', () => {
        const { asFragment } = render(<Offers amount={5} className="test" />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot, with ref', () => {
        const ref = {
            current: null,
        };
        render(<Offers ref={ref} />, {});
        expect(ref.current).not.toBe(null);
    });
});
