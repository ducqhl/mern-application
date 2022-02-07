import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getPostsBySearch, getTags } from "../../actions/memory.js";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { PAGES } from "../../constants/routes";
import Form from "../Form";
import Paginate from "../Pagination";
import Posts from "../Posts";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const page = query.get(QUERY_KEYS.PAGE) || 1;
  const searchQuery = query.get(QUERY_KEYS.SEARCH);
  const tagsQuery = query.get(QUERY_KEYS.TAGS);

  const [currentId, setCurrentId] = useState(null);
  const tags = useSelector((state) => state.memory.tags);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const searchPost = () => {
    if (search?.trim() || selectedTags?.length) {
      const tagsString = selectedTags.join(",");
      const searchString = search || "none";
      const searchQueryPage = `${PAGES.POSTS}?${QUERY_KEYS.SEARCH}=${searchString}&${QUERY_KEYS.TAGS}=${tagsString}`;
      console.log(tagsString);
      dispatch(getPostsBySearch({ search, tags: tagsString }));
      navigate(searchQueryPage);
    } else {
      navigate(PAGES.HOME);
    }
  };

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const isLoadingTags = tags && tags?.length < 1;

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {isLoadingTags && (
                <Grid
                  style={{
                    margin: "10px 0",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Grid>
              )}
              {!isLoadingTags && (
                <Autocomplete
                  style={{
                    margin: "10px 0",
                  }}
                  multiple
                  id="tags-standard"
                  options={tags}
                  getOptionLabel={(option) => option}
                  onChange={(event, values) => setSelectedTags(values)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tags"
                      placeholder="tag"
                    />
                  )}
                />
              )}
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tagsQuery && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
