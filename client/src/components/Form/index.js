import { Button, Paper, TextField, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost, updatePost } from "../../actions/memory.js";
import { STORAGE_KEYS } from "../../constants/storageKeys";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const post = useSelector((state) =>
    currentId ? state.memory.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const onSubmit = (e) => {
    e.preventDefault();
    const processPost = {
      ...postData,
      name: user?.result?.name,
    };

    if (currentId) dispatch(updatePost(currentId, processPost));
    else dispatch(createPost(processPost, navigate));

    clear();
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={[classes.form, classes.root].join(" ")}
        onSubmit={onSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing a Memory" : "Creating a Memory"}
        </Typography>
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(event) =>
            setPostData({ ...postData, title: event.target.value })
          }
        />
        <TextField
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={(event) =>
            setPostData({ ...postData, message: event.target.value })
          }
        />
        <TextField
          name="tags"
          label="Tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(event) =>
            setPostData({
              ...postData,
              tags: event.target.value.split(",").map((t) => t.trim()),
            })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonClear}
          color="secondary"
          variant="contained"
          size="medium"
          onClick={clear}
          fullWidth
        >
          <ClearIcon />
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
