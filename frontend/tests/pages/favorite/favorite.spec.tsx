import Favorite from '../../../pages/favorite';
import { render } from '../../tests.utils';

describe('Favorite component', () => {
    it('match snapshot', () => {
        const { asFragment } = render(<Favorite />);
        expect(asFragment()).toMatchSnapshot();
    });
});
