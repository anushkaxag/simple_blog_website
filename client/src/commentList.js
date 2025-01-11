import React from 'react';

export default ({ comments }) => {
    const renderedComments = comments.map(comment => {
        let content;

        if (comment.status === 'approved') {
            content = comment.content;
        }

        if (comment.status === 'pending') {
            content = <i>{'[This comment is awaiting moderation]'}</i>;
        }

        if (comment.status === 'rejected') {
            content = <s><i>{'[This comment has been rejected]'}</i></s>;
        }
        return <li key={comment.id}>{content}</li>;
    });

    return <ul>
        {renderedComments} 
    </ul>;
};