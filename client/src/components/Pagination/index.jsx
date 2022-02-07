import { Pagination, PaginationItem } from "@material-ui/lab";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPosts } from "../../actions/memory";
import useStyles from "./styles";
import { PAGES } from '../../constants/routes'
import { QUERY_KEYS } from "../../constants/queryKeys";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.memory);
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentPage = Number(page) || 1;

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={currentPage}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`${PAGES.POSTS}?${QUERY_KEYS.PAGE}=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
