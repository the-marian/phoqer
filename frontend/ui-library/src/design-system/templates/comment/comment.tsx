import { FC, MouseEvent, ReactNode, useState } from 'react';

import classNames from 'classnames';
import { GalleryModal } from 'src/design-system/feedback/modals/gallery-modal/gallery-modal';
import { Rating } from 'src/design-system/feedback/rating/rating';
import { Text } from 'src/design-system/foundation';
import { ChevronDownIcon, ChevronUpIcon } from 'src/design-system/icons';
import { Button } from 'src/design-system/inputs';
import { Image } from 'src/design-system/media/image/image';
import { UserCard } from 'src/design-system/templates/user-card/user-card';
import { generateHTML } from 'src/helpers/generate-html';
import { ID } from 'src/types/common.type';
import { ReviewItemType } from 'src/types/reviews.type';

import { CommentLoader } from './comment-loader';
import css from './comment.module.scss';

export interface Labels {
    Reply?: string;
    'Hide replies'?: string;
    'Show replies'?: string;
}

export interface CommentProps {
    locale?: string;
    labels?: Labels;
    loading?: boolean;
    children?: ReactNode;
    value: ReviewItemType;
    canReply?: boolean;
    onReply?: (value: ReviewItemType) => void;
    onUserClick?: (id: ID) => void;
    onToggleReplies?: (value: boolean) => void;
}
export const Comment: FC<CommentProps> = ({
    value,
    labels,
    onReply,
    children,
    onUserClick,
    onToggleReplies,
    loading = false,
    locale = 'en-US',
    canReply = false,
}) => {
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
    const handleClose = (): void => setGalleryIndex(null);
    const handleOpen = (index: number) => (): void => setGalleryIndex(index);

    const [openReplies, setOpenReplies] = useState(false);
    const toggleReplies = (): void => {
        if (onToggleReplies) {
            onToggleReplies(!openReplies);
        }

        setOpenReplies(!openReplies);
    };

    const handleUserClick = (event: MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();

        if (onUserClick) {
            onUserClick(value.author.id);
        }
    };

    const handleReply = (): void => {
        if (onReply) {
            onReply(value);
        }
    };

    return (
        <>
            {typeof galleryIndex === 'number' ? (
                <GalleryModal media={value.images} onClose={handleClose} index={galleryIndex} alt="Offer review" />
            ) : null}

            <div className={classNames(css.comment, 'comment')}>
                <div className={css.header}>
                    <a href={`/users/${value.author.id}`} onClick={handleUserClick}>
                        <UserCard user={{ ...value.author, createdAt: value.date as number }} locale={locale} />
                    </a>

                    {value.score && <Rating className={css.rating} value={value.score} readonly />}
                </div>

                <Text
                    as="div"
                    size="sm"
                    className={css.content}
                    dangerouslySetInnerHTML={{ __html: generateHTML(value.description) }}
                />

                {value.images.length ? (
                    <ul className={css.images}>
                        {value.images.map((image, index) => (
                            <li key={image}>
                                <button type="button" onClick={handleOpen(index)}>
                                    <Image className={css.img} src={image} alt="Offer review" draggable="false" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}

                <div className={css.repliesWrp}>
                    {value.replies ? (
                        <Button
                            size="sm"
                            variant="ghost"
                            className={css.replies}
                            onClick={toggleReplies}
                            rightIcon={openReplies ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        >
                            {openReplies
                                ? `${labels?.['Hide replies'] || 'Hide replies'} (${value.replies})`
                                : `${labels?.['Show replies'] || 'Show replies'} (${value.replies})`}
                        </Button>
                    ) : null}

                    {canReply ? (
                        <Button className={css.replies} size="sm" variant="ghost" onClick={handleReply}>
                            {labels?.Reply || 'Reply'}
                        </Button>
                    ) : null}
                </div>

                {value.replies && openReplies && children ? (
                    <div className={css.children}>
                        {loading ? (
                            <>
                                <CommentLoader />
                                <CommentLoader />
                            </>
                        ) : (
                            children
                        )}
                    </div>
                ) : null}
            </div>
        </>
    );
};
