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
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body
    }
    setPosts([...posts, newPost]);
  };

  return (
    <div className="App">
      <form>
        <MyInput
          type="text"
          value={title}
          placeholder="Название поста"
          onChange={e => setTitle(e.target.value)} />
        <MyInput
          type="text"
          value={body}
          placeholder="Описание поста"
          onChange={e => setBody(e.target.value)} />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Список постов 1" />
    </div>
  );
}

export default App;
