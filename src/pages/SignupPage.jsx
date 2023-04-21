import { useState, useEffect } from "react";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import validateRegisterSchema from "../validation/registerValidation";
import ROUTES from "../routes/ROUTES";
import SignupInputComponent from "../components/SignupInputComponent";
import { required } from "joi";

const SignupPage = () => {
  const initInputState ={firstName: "",middleName: "",lastName: "",phone: "",email: "",password: "",imageUrl: "",imageAlt: "",state: "",country: "",city: "",street: "",houseNumber: "",zipCode: ""
  }
  const [inputState, setInputState] = useState(initInputState);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [isBiz, setIsBiz] = useState(false);
  const navigate = useNavigate();
  
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(joiResponse);
       
      if (joiResponse) {
        return;
      }
      await axios.post("/users/register", {firstName: inputState.firstName, middleName: inputState.middleName, lastName: inputState.lastName, phone: inputState.phone, email: inputState.email, password: inputState.password, imageUrl: inputState.imageUrl, imageAlt: inputState.imageAlt, state: inputState.state, country: inputState.country, city: inputState.city, street: inputState.street, houseNumber: inputState.houseNumber, zipCode: inputState.zipCode, biz: isBiz});
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };

  const handleCancelBtnClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleResetBtnClick = () => {
    const newInputState = initInputState;
    setInputState(newInputState)
    setInputsErrorsState({})
  };  

  const handleInputChange = (ev) => {
    const{id, value} = ev.target
    setInputState(prev => (
      {...prev,
      [id]: value}
    ));
   
  } 
  const handleCheckChange = (event) => {
    setIsBiz(event.target.checked);
  };

  useEffect(() => {
    const joiResponse = validateRegisterSchema(inputState);
    setInputsErrorsState(joiResponse);
    console.log(inputsErrorsState)
  }, [inputState]);
  
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register Page
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              {id: 'firstName',label: 'First Name',required: true, },
              {id: 'middleName',label: 'Middle Name', required: false, },
              {id: 'lastName',label: 'Last Name',required: true, },
              {id: 'phone',label: 'Phone',required: true, },
              {id: 'email',label: 'Email',required: true, },
              {id: 'password',label: 'Password',required: true},
              {id: 'imageUrl',label: 'Image url',required: false, },
              {id: 'imageAlt',label: 'Image alt',required: false, },
              {id: 'state',label: 'State',required: false, },
              {id: 'country',label: 'Country',required: true, },
              {id: 'city',label: 'City',required: true, }, 
              {id: 'street',label: 'Street',required: true, }, 
              {id: 'houseNumber',label: 'House number', required: true, }, 
              {id: 'zipCode',label: 'Zip',required: false, },
            ].map(({id, label, required, type}) => (
              <Grid item xs={12} sm={6} key={id}>
                <TextField
                  required={required}
                  id={id}
                  label={label}
                  fullWidth
                  value={inputState[id]}
                  onChange={handleInputChange}
                  error={(inputState[id] && inputsErrorsState && inputsErrorsState[id]) ? true : false}
                  helperText={
                  inputsErrorsState &&
                  inputState[id] &&
                  inputsErrorsState[id] &&
                  inputsErrorsState[id].map((item) => (
                    <span key={`errors${item}`}>{item}</span>
                  ))
                  }   
                />
                
            </Grid>
            ))}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox id="biz" checked={isBiz} onChange={handleCheckChange} color="primary" />}
                label="Signup as business"
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
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                sx={{mb: 5}}
                variant="contained" 
                onClick={handleBtnClick}
                disabled={!inputState.firstName || !inputState.lastName || !inputState.phone || !inputState.email || !inputState.password || !inputState.country || !inputState.city || !inputState.street || !inputState.houseNumber}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );

};
 
export default SignupPage;
