import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contex';
import { useDispatch } from 'react-redux';
import { saveAllPosts } from '../../redux/action';
import Post from './Post';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const PostList = () => {
  const [postsPata, setPostsData] = useState([]);
  const [postCommentInfo, setPostCommentInfo] = useState('');
  const [comentId, setComentId] = useState(null);
  const { setCurrentPostId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data } = useFetch('/posts/posts');

  useEffect(() => {
    dispatch(saveAllPosts(postsPata));
    data !== null ? setPostsData(data) : [];
  }, [data]);

  const currentPostInput = postsPata.find(({ id }) => id === comentId);

  const currentPostId = currentPostInput?.id;

  useEffect(() => {
    setCurrentPostId(currentPostId);
  }, [comentId, currentPostId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (postCommentInfo === false) {
      return false;
    } else {
      const createdBy = 'Procherk';
      let newCommentPost = {
        id: comentId,
        senderName: createdBy,
        senderCommentText: postCommentInfo
      };

      postsPata.map(({ comment }, index) => {
        if (index + 1 === newCommentPost.id) {
          comment.push(newCommentPost);
        }
      });

      const response = await axios
        .patch('/posts/' + '63b5aa0c09bfdb3035f07d83', currentPostInput)
        .then((res) => console.log(res, 'res'))
        .catch((error) => console.log('Error: ', error));
      if (response && response.data) {
        console.log(response);
        console.log(response.data);
      }
      setPostsData(postsPata);
      setPostCommentInfo('');
    }
  };

  return (
    <div>
      {postsPata.map(
        (
          {
            comment,
            photoOfPost,
            dateOfPost,
            nickName,
            countOfLikes,
            photoDescription,
            subtitle,
            id
          },
          i
        ) => (
          <Post
            key={i}
            id={id}
            handleSubmit={handleSubmit}
            postCommentInfo={postCommentInfo}
            comment={comment}
            setComentId={setComentId}
            photoOfPost={photoOfPost}
            setPostCommentInfo={setPostCommentInfo}
            nickName={nickName}
            countOfLikes={countOfLikes}
            photoDescription={photoDescription}
            subtitle={subtitle}
            dateOfPost={dateOfPost}
          />
        )
      )}
    </div>
  );
};

export default PostList;
