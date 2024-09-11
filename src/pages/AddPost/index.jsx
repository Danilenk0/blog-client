import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { useRef, useState } from "react";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import axios from "../../axios";
import cookie from "js-cookie";

export const AddPost = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef(null);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  
        },
      });
      setImageUrl(response.data.path);
      console.log(response.data.path);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const handlePostCreate = async () => {
    try {
      const token = cookie.get("token");
      const data = {
        title: title,
        text: value,
        tags: tags.split(" "),
        imageUrl: imageUrl,
      };
      const response = await axios.post("/posts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl ? (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:8000/uploads/${imageUrl}`}
            alt="Uploaded"
          />
        </>
      ) : null}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={handlePostCreate}>
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
