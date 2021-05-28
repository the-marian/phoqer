import { render } from '../../../../../tests/tests.utils';
import TextSkeleton from './index';

describe('TextSkeleton component', () => {
    it('matches snapshot, without props', () => {
        const { asFragment } = render(<TextSkeleton />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot, with props', () => {
        const { asFragment } = render(<TextSkeleton amount={5} />, {});
        expect(asFragment()).toMatchSnapshot();
    });
});
