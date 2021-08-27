import Confirmation from '../../../../pages/auth/confirmation';
import { render, waitFor } from '../../../tests.utils';

describe('Confirmation component', () => {
    it('match snapshot', async () => {
        const { asFragment } = render(<Confirmation />);
        const lazyContent = await waitFor(() => asFragment());
        expect(lazyContent).toMatchSnapshot();
    });
});
