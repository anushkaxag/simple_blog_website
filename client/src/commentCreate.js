import React, { useState } from 'react';
import axios from 'axios';

export default({ postId }) => {
    const [content, setContent] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post(`http://posts.com/posts/${postId}/comments`, {
                content
            });
        window.location.reload();
        } catch(e) {
            console.warn("Got Exception, ", e)
        }

        setContent('');
    };

    return (
        <div>
            <form onSubmit = {onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary" disabled={!(content.length > 0)}>Submit</button>
            </form>
        </div>
    );
};