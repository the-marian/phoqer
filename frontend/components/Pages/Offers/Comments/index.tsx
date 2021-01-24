import React, { ReactElement } from 'react';

import CommentsForm from './CommentsForm';
import CommentsList from './CommentsList';

const Comments = (): ReactElement => {
    return (
        <div>
            <CommentsForm />
            <CommentsList />
        </div>
    );
};

export default Comments;
