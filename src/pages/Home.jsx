import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useEffect, useState } from "react";
import axios from "../axios";

export const Home = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/posts");
        setPosts(response.data.posts);
      } catch (err) {
        setError("Ошибка при загрузке данных");
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => fetchData(), 1000);
  }, []);

  console.log(posts);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoading ? (
            <Post isLoading={isLoading} />
          ) : (
            posts.map((item) => (
              <Post
                key={item._id}
                _id={item._id}
                title={item.title}
                imageUrl={`http://localhost:8000/uploads/${item.imageUrl}`}
                user={{
                  avatarUrl:
                    "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                  fullName: [item["user"].fullName],
                }}
                createdAt={item.createdAt.toString().slice(0, 10)}
                viewsCount={item.viewsCount}
                commentsCount={3}
                tags={["one", "two"]}
                isLoading={false}
                isEditing={true}
              />
            ))
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={["header", "header"]} isLoading={isLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};
