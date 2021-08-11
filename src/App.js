import React, {useState, useEffect} from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import PostService from './API/PostService';
import {usePosts} from './hooks/usePosts';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import MyLoader from './components/UI/loader/MyLoader';
function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    sort: '',
    query: ''
  });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter(item => item.id !== post.id))
  };

  async function fetchPosts() {
    setIsPostsLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts);
    setIsPostsLoading(false);
  };

  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <div className="App">
      <button onClick={fetchPosts}>get posts</button>
      <MyButton
        style={{marginTop: 30}}
        onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0'}} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}/>
      { isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
            <MyLoader />
          </div>
        : <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Список постов 1" />
      }
    </div>
  );
}

export default App;
