import React, {useState} from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'Python', body: 'Description'},
    {id: 3, title: 'C#', body: 'Description'}
  ]);
  const [post, setPost] = useState({
    title: '',
    body: ''
  });

  const addNewPost = (e) => {
    e.preventDefault();
    setPosts([...posts, {...post, id: Date.now()}]);
    setPost({title: '', body: ''});
  };

  return (
    <div className="App">
      <form>
        <MyInput
          type="text"
          value={post.title}
          placeholder="Название поста"
          onChange={e => setPost({...post, title: e.target.value})} />
        <MyInput
          type="text"
          value={post.body}
          placeholder="Описание поста"
          onChange={e => setPost({...post, body: e.target.value})} />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Список постов 1" />
    </div>
  );
}

export default App;
