import React, {useState, useEffect, useRef} from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostService from '../API/PostService';
import {usePosts} from '../hooks/usePosts';
import {useFetching} from '../hooks/useFetching';
import {getPageCount} from '../utils/pages';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import MyLoader from '../components/UI/loader/MyLoader';
import Pagination from '../components/UI/pagination/Pagination';
import {useObserver} from '../hooks/useObserver';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    sort: '',
    query: ''
  });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter(item => item.id !== post.id))
  };

  const changePage = (page) => {
    setPage(page);
  };

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  });

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page]);

  return (
    <div className="App">
      <MyButton
        style={{marginTop: 30}}
        onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0'}} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}/>
      { postError &&
        <h3>Произошла ошибка ${postError}</h3>
      }
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Список постов" />
      <div ref={lastElement} style={{height: 20, background: 'transparent'}} />
      { isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
            <MyLoader />
        </div>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages} />
    </div>
  );
};

export default Posts;
