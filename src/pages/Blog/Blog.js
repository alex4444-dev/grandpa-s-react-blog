import React, { useState } from 'react';
import s from './Blog.module.css';
import { AddPostForm } from './AddPostForm/AddPostForm';
import { PostCard } from './PostCard/PostCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { EditPostForm } from './../../components/EditPostForm/EditPostForm';
import { Link } from 'react-router-dom';
import { useAddPost, useDeletePost, useEditPost, useGetPosts, useLikePost } from '../../api/queries';



export const Blog = ({ isAdmin }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const { data: posts, isLoading, isError, error, isFetching } = useGetPosts();


  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();
  const addMutation = useAddPost();


  if (isLoading) return <h1>Загружаю данные...</h1>;

  if (isError) return <h1>{error.message}</h1>;


  const likePost = (blogPost) => {
    const updatedPost = { ...blogPost };
    updatedPost.liked = !updatedPost.liked;
    likeMutation.mutate(updatedPost)
  };


  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      deleteMutation.mutate(blogPost)
    }
  };


  const editBlogPost = (updatedBlogPost) => {
    editMutation.mutate(updatedBlogPost)
  };

  const addNewBlogPost = (newBlogPost) => {
    addMutation.mutate(newBlogPost)

  };

  const handleAddFormShow = () => {
    setShowAddForm(true);
  };

  const handleAddFormHide = () => {
    setShowAddForm(false);
  };

  const handleEditFormShow = () => {
    setShowEditForm(true);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  const blogPosts = posts.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <PostCard
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => likePost(item)}
          deletePost={() => deletePost(item)}
          handleEditFormShow={handleEditFormShow}
          handleSelectPost={() => handleSelectPost(item)}
          isAdmin={isAdmin}
        />
        <div className={s.readMoreLink}><Link to={`/blog/${item.id}`}>Подробнее</Link></div>
      </React.Fragment>
    );
  });


  const postsOpactiy = isFetching ? 0.5 : 1;

  return (


    <div className={s.blogPage}>
      {showAddForm && (
        <AddPostForm
          addNewBlogPost={addNewBlogPost}
          handleAddFormHide={handleAddFormHide}
        />
      )}

      {showEditForm && (
        <EditPostForm
          handleEditFormHide={handleEditFormHide}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}

      <>
        <h1>Блог</h1>

        {isAdmin && (
          <div className={s.addNewPost}>
            <button className='blackBtn' onClick={handleAddFormShow}>
              Создать новый пост
            </button>
          </div>
        )}

        <div className={s.posts} style={{ opacity: postsOpactiy }}>
          {blogPosts}
        </div>
        {isFetching && <CircularProgress className={s.preloader} />}
      </>
    </div>
  );
}
