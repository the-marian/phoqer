import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../../../tests/tests.utils';
import CheckTitle from './index';

describe('Test CheckTitle component', () => {
    it('Should match snapshot', () => {
        const handleClick = jest.fn();
        const { asFragment } = render(<CheckTitle onChange={handleClick}>test</CheckTitle>, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('Test onClick', () => {
        const handleClick = jest.fn();
        render(<CheckTitle onChange={handleClick}>test</CheckTitle>, {});
        fireEvent.click(screen.getByRole(/button/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Test if value changed', () => {
        const handleClick = jest.fn();
        render(
            <CheckTitle value={false} onChange={handleClick}>
                test
            </CheckTitle>,
            {},
        );
        fireEvent.click(screen.getByRole(/button/i));
        expect(handleClick).toHaveBeenCalledWith(true);
    });

    it('Test if value changed', () => {
        const handleClick = jest.fn();
        render(
            <CheckTitle value={true} onChange={handleClick}>
                test
            </CheckTitle>,
            {},
        );
        fireEvent.click(screen.getByRole(/button/i));
        expect(handleClick).toHaveBeenCalledWith(false);
    });
});
