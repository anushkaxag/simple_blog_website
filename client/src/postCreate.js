import React, { useState } from 'react';
import axios from 'axios';

export default() => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post('http://posts.com/posts/create', {title});
            window.location.reload();
        } catch(e) {
            console.warn("Got Exception, ", e)
        }

        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className='form-control'/>
                </div>
                <button className="btn btn-primary" disabled={!(title.length > 0)}>Submit</button>
            </form>
        </div>
    );
};