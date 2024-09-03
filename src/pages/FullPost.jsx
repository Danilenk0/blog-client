import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useEffect, useState } from "react";
import axios from "../axios";

export const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError("Ошибка при загрузке данных");
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => fetchData(), 1000);
  }, [id]);

  console.log(post);
  return (
    <>
      {isLoading ? (
        <Post isLoading={isLoading} />
      ) : (
        <Post
          id={post._id}
          title={post.title}
          imageUrl={`http://localhost:8000/uploads/${post.imageUrl}`}
          user={{
            avatarUrl:
              "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
            fullName: "Keff",
          }}
          createdAt={"12 июня 2022 г."}
          viewsCount={150}
          commentsCount={3}
          tags={post.tags}
          isFullPost={true}
          isLoading={isLoading}
        >
          <p>
            {post.text}
          </p>
        </Post>
      )}

      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={isLoading}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
