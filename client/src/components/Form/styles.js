import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: theme.spacing(1),
    width: "100%",
  },
  fileInput: {
    display: "flex",
    width: "100%",
    margin: "10px 2px",
    padding: theme.spacing(1),
  },
  buttonSubmit: {
    margin: theme.spacing(1),
  },
  buttonClear: {
    margin: theme.spacing(1),
  },
}));
