import React, { useState } from 'react';
import './PostHeader.css';
import { AddForm } from './AddForm/AddForm';

export const PostsHeader = ({ title, blogPosts, isLikedPosts, isAdmin }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <section className='postsHeader'>
      <h1>{title}</h1>
      {isAdmin && !isLikedPosts && (
        <button onClick={() => setShowAddForm(true)} className='showAddFormBtn'>
          Создать пост
        </button>
      )}

      {showAddForm && (
        <AddForm
          blogPosts={blogPosts}
          setShowAddForm={setShowAddForm}
        />
      )}
    </section>
  );
};
