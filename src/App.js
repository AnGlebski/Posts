import React, {useState} from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'Python', body: 'Description'},
    {id: 3, title: 'C#', body: 'Description'}
  ]);

  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Развание поста" />
        <input type="text" placeholder="Описание поста" />
        <MyButton>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Список постов 1" />
    </div>
  );
}

export default App;
