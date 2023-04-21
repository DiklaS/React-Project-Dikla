import { useState } from "react";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControlLabel } from "@mui/material";
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
//import { FormControl } from "@mui/material";
import validateRegisterSchema from "../validation/registerValidation";
import ROUTES from "../routes/ROUTES";


const RegisterPage = () => {
  const initInputState ={
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    biz: false
  }
  const [inputState, setInputState] = useState(initInputState);
  console.log(inputState)
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      console.log(joiResponse)
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      await axios.post("/users/register", inputState);
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
    const {id, value, type, checked} =ev.target
    
    
    setInputState(prevInputState => {
      return {
        ...prevInputState,
        [id]: type === 'checkbox' ? checked : value
      }
    })
    console.log(inputState) 
    /* let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState); */
  };
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
            <Grid item md={6} xs={12} >
              <TextField
                required 
                id="firstName"
                label="First Name"
                fullWidth 
                value={inputState.firstName}
                onChange={handleInputChange}

                error={(inputsErrorsState && inputsErrorsState.firstName) ? true : false}

                helperText={inputsErrorsState && inputsErrorsState.firstName && inputsErrorsState.firstName.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}

              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth 
                id="middleName"
                label="Middle Name"
                value={inputState.middleName ? inputState.middleName : ""}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.middleName) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.middleName && inputsErrorsState.middleName.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                required
                id="lastName"
                label="Last Name"
                fullWidth 
                value={inputState.lastName}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.lastName) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.lastName && inputsErrorsState.lastName.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                required
                id="phone"
                label="Phone"
                fullWidth 
                value={inputState.phone}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.phone) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.phone && inputsErrorsState.phone.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth 
                id="email"
                label="Email"
                value={inputState.email}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.email) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.email && inputsErrorsState.email.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth 
                label="Password"
                type="password"
                id="password"
                value={inputState.password}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.password) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.password && inputsErrorsState.password.map((item) => (
                    <span key={"errors" + item}>{item}.</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth 
                label="Image url"
                id="imageUrl"
                value={inputState.imageUrl ? inputState.imageUrl : ""}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.imageUrl) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.imageUrl && inputsErrorsState.imageUrl.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth 
                label="Image alt"
                id="imageAlt"
                value={inputState.imageAlt ? inputState.imageAlt : ""}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.imageAlt) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.imageAlt && inputsErrorsState.imageAlt.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
              
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth 
                label="State"
                id="state"
                value={inputState.state ? inputState.state : ""}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.state) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.state && inputsErrorsState.state.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth required 
                label="Country"
                id="country"
                value={inputState.country}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.country) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.country && inputsErrorsState.country.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth required 
                label="City"
                id="city"
                value={inputState.city}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.city) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.city && inputsErrorsState.city.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
              
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth required 
                label="Street"
                id="street"
                value={inputState.street}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.street) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.street && inputsErrorsState.street.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth required 
                label="House Number"
                id="houseNumber"
                value={inputState.houseNumber}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.houseNumber) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.houseNumber && inputsErrorsState.houseNumber.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth 
                label="Zip"
                id="zipCode"
                value={inputState.zipCode ? inputState.zipCode : ""}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.zipCode) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.zipCode && inputsErrorsState.zipCode.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox id="biz" checked={inputState.biz} onChange={handleInputChange} color="primary" />}
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
 
export default RegisterPage;
