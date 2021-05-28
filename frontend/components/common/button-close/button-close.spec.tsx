import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../../tests/tests.utils';
import ButtonClose from './index';

describe('Test ButtonClose component', () => {
    it('Should match snapshot', () => {
        const { asFragment } = render(<ButtonClose />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('Should match snapshot', () => {
        const { asFragment } = render(<ButtonClose className="test" type="submit" />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('Test onClick', () => {
        const handleClick = jest.fn();
        render(<ButtonClose onClick={handleClick} />, {});
        fireEvent.click(screen.getByRole(/button/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
