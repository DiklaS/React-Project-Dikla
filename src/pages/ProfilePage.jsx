import { useState, useEffect } from "react";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import { CircularProgress } from "@mui/material";
import validateProfileSchema from "../validation/profileValidation";

const ProfilePage = () => {
  const [inputState, setInputState] = useState(null);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const [isBiz, setIsBiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users/userInfo")
      .then(({ data }) => {
        //console.log("profile data", data);
        let newInputState = {...data};
        if (data.middleName) {newInputState.middleName = data.middleName;}
        else {newInputState.middleName = "";}
        if (data.imageUrl) {newInputState.imageUrl = data.imageUrl;}
        else {newInputState.imageUrl = "";}
        if (data.imageAlt) {newInputState.imageAlt = data.imageAlt;}
        else {newInputState.imageAlt = "";}
        if (data.state) {newInputState.state = data.state;}
        else {newInputState.state = "";}
        if (data.zipCode) {newInputState.zipCode = data.zipCode;}
        else {newInputState.zipCode = "";}
        let newIsBiz = data.biz;
        delete newInputState.isAdmin;
        delete newInputState.createdAt;
        delete newInputState.__v;
        delete newInputState._id;
        delete newInputState.biz;
        setInputState(newInputState);
        setIsBiz(newIsBiz);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops"); 
      });
  }, []);
  
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateProfileSchema(inputState);
      setInputsErrorsState(joiResponse);
       
      if (joiResponse) {
        return;
      }
      await axios.put("/users/userInfo", {firstName: inputState.firstName, middleName: inputState.middleName, lastName: inputState.lastName, phone: inputState.phone, email: inputState.email, imageUrl: inputState.imageUrl, imageAlt: inputState.imageAlt, state: inputState.state, country: inputState.country, city: inputState.city, street: inputState.street, houseNumber: inputState.houseNumber, zipCode: inputState.zipCode === "" ? null : inputState.zipCode, biz: isBiz});
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };

  const handleCancelBtnClick = () => {
    navigate(ROUTES.HOME);
  };

   const handleResetBtnClick = () => {
    const initInputState ={firstName: "",middleName: "",lastName: "",phone: "",email: "",password: "",imageUrl: "",imageAlt: "",state: "",country: "",city: "",street: "",houseNumber: "",zipCode: ""
  }
    setInputState(initInputState)
    setIsBiz(false)
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
    const joiResponse = validateProfileSchema(inputState);
    setInputsErrorsState(joiResponse);
    //console.log(joiResponse)
  }, [inputState]);
 
  if (!inputState) {
    return <CircularProgress />;
  }

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
          Profile Page
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              {id: 'firstName',label: 'First Name',required: true, },
              {id: 'middleName',label: 'Middle Name', required: false, },
              {id: 'lastName',label: 'Last Name',required: true, },
              {id: 'phone',label: 'Phone',required: true, },
              {id: 'email',label: 'Email',required: true, },
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
              {<FormControlLabel
                control={<Checkbox id="biz" checked={isBiz} onChange={handleCheckChange} color="primary" />}
                label="Signup as business"
              /> }
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
                disabled={!inputState.firstName || !inputState.lastName || !inputState.phone || !inputState.email || !inputState.country || !inputState.city || !inputState.street || !inputState.houseNumber}
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

export default ProfilePage;
  