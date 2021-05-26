import { render } from '../../../../../tests/tests.utils';
import RectSkeleton from './index';

describe('RectSkeleton component', () => {
    it('matches snapshot, without props', () => {
        const { asFragment } = render(<RectSkeleton />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot, with props', () => {
        const { asFragment } = render(<RectSkeleton amount={5} />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot, with className', () => {
        const { asFragment } = render(<RectSkeleton amount={5} className="test" />, {});
        expect(asFragment()).toMatchSnapshot();
    });
});
