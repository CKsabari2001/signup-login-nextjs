import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const CTextField = styled(TextField)(({ error, ...props }) => ({
  width: "100%",
  maxWidth: "28rem",
  fontFamily: "Poppins, sans-serif",

  "& label": {
    fontSize: "16px",
    fontFamily: "Poppins, sans-serif",

    color: error ? "#d32f2f" : "rgba(74, 182, 62, 0.5)",
    "&.Mui-focused": {
      color: error ? "#d32f2f" : "#4ab63e",
    },

    "@media (min-width: 992px)": {
      fontSize: "18px",
    },
  },

  "& input": {
    fontSize: "16px",
    color: error ? "#d32f2f" : "#4ab63e",

    "@media (min-width: 992px)": {
      fontSize: "18px",
    },
  },

  fieldset: {
    fontFamily: "Poppins, sans-serif !important",
    borderRadius: "15px",
    borderColor: "rgba(74, 182, 62, 0.5)",
  },

  "& .MuiOutlinedInput-root:hover fieldset": {
    borderColor: error ? "#d32f2f" : "rgba(74, 182, 62, 1) ",
  },

  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: error ? "#d32f2f" : "rgba(74, 182, 62, 1)",
  },
}));

const CBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0px 0px 10px 0px rgba(74, 182, 62, 0.3)",
  backdropFilter: "blur(10px)",
  borderRadius: "15px",
  minWidth: "85%",
  rowGap: "20px",
  padding: "30px 20px",
  margin: "0 20px",

  "@media (min-width: 768px)": {
    padding: "50px 25px",
    rowGap: "30px",
    minWidth: "60%",
  },

  "@media (min-width: 1400px)": {
    padding: "80px 25px",
    minWidth: "40%",
  },
});

const CButton = styled(Button)(({ disabled, ...props }) => ({
  color: "rgba(74, 182, 62, 0.8)",
  borderColor: "rgba(74, 182, 62, 0.8)",

  "&:hover": {
    color: "rgba(74, 182, 62, 1)",
    borderColor: "rgba(74, 182, 62, 1)",
    backgroundColor: "rgba(74, 182, 62, 0.05)",
  },

  "&:disabled": {
    color: "rgba(74, 182, 62, 0.3)",
    borderColor: "rgba(74, 182, 62, 0.3)",
  },
}));

export { CTextField, CBox, CButton };
