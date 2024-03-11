import { FC, useState } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation';
import { StarFilledIcon, StarHalfIcon, StarIcon } from 'src/design-system/icons';

import css from './rating.module.scss';

export interface RatingHoverProps {
    length?: number;
    value?: number;
    disabled?: boolean;
    className?: string;
}
export const RatingHover: FC<RatingHoverProps> = ({ className, value = 0, length = 5 }) => {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(value > length ? length : value);

    const isInt = (rating + 1) % 1 === 0;

    return (
        <div className={classNames(css.rating, className)}>
            {[...Array(length)].map((star, index) => {
                const position = index + 1;

                const isFilledStar = position <= (hover || rating);
                const isHalfStar = !isInt && position === Math.ceil(hover || rating);

                return (
                    <button
                        type="button"
                        key={position}
                        className={css.star}
                        onClick={() => setRating(position)}
                        onMouseEnter={() => setHover(position)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        {isFilledStar ? <StarFilledIcon /> : isHalfStar ? <StarHalfIcon /> : <StarIcon />}
                    </button>
                );
            })}
            <Text>({hover || rating})</Text>
        </div>
    );
};

export const RatingRead: FC<RatingHoverProps> = ({ className, value = 0, length = 5, disabled }) => {
    const isInt = (value + 1) % 1 === 0;

    return (
        <div className={classNames(css.rating, className)}>
            {[...Array(length)].map((star, index) => {
                const position = index + 1;

                const isFilledStar = position <= value;
                const isHalfStar = !isInt && position === Math.ceil(value);

                return (
                    <div key={position} className={classNames(css.star, disabled && css.disabled)}>
                        {isFilledStar ? <StarFilledIcon /> : isHalfStar ? <StarHalfIcon /> : <StarIcon />}
                    </div>
                );
            })}
            <Text>({value})</Text>
        </div>
    );
};

export interface RatingProps extends RatingHoverProps {
    disabled?: boolean;
    readonly?: boolean;
}
export const Rating: FC<RatingProps> = ({ readonly = false, disabled = false, ...props }) =>
    readonly || disabled ? <RatingRead disabled={disabled} {...props} /> : <RatingHover {...props} />;
