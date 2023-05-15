import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import ROUTES from "../routes/ROUTES";
import validateLoginSchema from "../validation/loginValidation";
import useLoggedIn from "../hooks/useLoggedIn";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();

  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateLoginSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }

      const failingsNumber = +localStorage.getItem("failingsNumber") || 0;
      const userBlockedTime = +localStorage.getItem("userBlockedTime") || 0;

      if (failingsNumber >= 3 && Date.now() - userBlockedTime < 24 * 60 * 60 * 1000) {
        toast.error("You are blocked from logging in. Please try again later.");
      return;
      }
      
      const { data } = await axios.post("/users/login", inputState);
      localStorage.setItem("token", data.token);
      loggedIn();
      //move to homepage
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("login error", err);
      toast.info(err.response.data);

      const failingsNumber = +localStorage.getItem("failingsNumber") || 0;
      localStorage.setItem("failingsNumber", failingsNumber + 1);

      if (failingsNumber + 1 === 3) {
        localStorage.setItem("userBlockedTime", Date.now());
      }
    }
  };

  const handleCancelBtnClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleResetBtnClick = () => {
    const newInputState = {email: "", password: "",
  };
    setInputState(newInputState)
    setInputsErrorsState({})
  };

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login Page
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={inputState.email}
                onChange={handleInputChange}
                error= {(inputsErrorsState && inputsErrorsState.email) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.email && inputsErrorsState.email.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={inputState.password}
                onChange={handleInputChange}
                error= {(inputsErrorsState && inputsErrorsState.password) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.password && inputsErrorsState.password.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleCancelBtnClick}
              >
              CANCEL
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button 
                fullWidth
                variant="outlined"
                onClick={handleResetBtnClick}
              >
                <LoopOutlinedIcon/>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleBtnClick}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.REGISTER}>
                <Typography variant="body2">
                  Did not have an account? Sign up
                </Typography>
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
