import {Container, Typography, Box, Button, Grid, TextField, CircularProgress} from "@mui/material/";
import { useState } from "react";
import editCardSchema from "../validation/editValidation"
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const CreateCardPage = () => {
    const [inputState, setInputState] = useState({
    title: "", subTitle: "", description: "", state: "", country: "", city: "", street: "", houseNumber: "", zipCode: "", phone: "",email: "", web: "", url: "", alt: "",
  });

  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = editCardSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        await axios.post("/cards/", inputState);
        toast.success("A new business card has been created");
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log("err", err);
      toast.error("There was an error, the card was not saved in the system.");
      }

  };

 



  const handleCancelBtnClick = () => {
    navigate(ROUTES.HOME);
  };

  /* const handleResetBtnClick = (e) => {
    e.preventDefault();
    e.target.reset();
  }; */

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
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
          Create Card Page
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12} >
              <TextField
                required
                id="title"
                label="Title"
                fullWidth 
                value={inputState.title}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.title) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.title && inputsErrorsState.title.map((item) => (
                    <span key={"title-errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth required
                id="subTitle"
                name="subTitle"
                label="Subtitle"
                value={inputState.subTitle}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.subTitle) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.subTitle && inputsErrorsState.subTitle.map((item) => (
                    <span key={"subTitle-errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                required
                id="description"
                label="Description"
                fullWidth 
                value={inputState.description}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.description) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.description && inputsErrorsState.description.map((item) => (
                    <span key={"description-errors" + item}>{item}</span>
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
                    <span key={"phone-errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth required 
                label="Email"
                id="email"
                value={inputState.email}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.email) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.email && inputsErrorsState.email.map((item) => (
                    <span key={"email-errors" + item}>{item}</span>
                  ))}
              />
              
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth  
                label="Web"
                id="web"
                value={inputState.web}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.web) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.web && inputsErrorsState.web.map((item) => (
                    <span key={"web-errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth  
                label="Image url"
                id="url"
                value={inputState.url ? inputState.url : ""}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.url) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.url && inputsErrorsState.url.map((item) => (
                    <span key={"url-errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth 
                label="Image alt"
                id="alt"
                value={inputState.alt ? inputState.alt : ""}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.alt) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.alt && inputsErrorsState.alt.map((item) => (
                    <span key={"alt-errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth  
                label="State"
                id="state"
                value={inputState.state}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.state) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.state && inputsErrorsState.state.map((item) => (
                    <span key={"state-errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth 
                id="country"
                label="Country"
                value={inputState.country}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.country) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.country && inputsErrorsState.country.map((item) => (
                    <span key={"country-errors" + item}>{item}</span>
                  ))}
              />
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth required
                label="City"
                type="city"
                id="city"
                value={inputState.city}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.city) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.city && inputsErrorsState.city.map((item) => (
                    <span key={"city-errors" + item}>{item}.</span>
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
                    <span key={"street-errors" + item}>{item}</span>
                  ))}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth required
                label="House number"
                id="houseNumber"
                value={inputState.houseNumber}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.houseNumber) ? true : false}
                helperText={inputsErrorsState && inputsErrorsState.houseNumber && inputsErrorsState.houseNumber.map((item) => (
                    <span key={"houseNumber-errors" + item}>{item}</span>
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
                    <span key={"zipCode-errors" + item}>{item}</span>
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
                /* onClick={handleResetBtnClick} */
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
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
    

}
export default CreateCardPage;



/* {
    "title": "h@h.com",
    "subTitle": "bbb",
    "description": "ggg",
    "country": "ccccc",
    "city": "ffffff",
    "street": "nnnnn",
    "houseNumber": "mmmm",
    "phone": "mmmmmnnnn",
    "email": "f@f.com",
    "image": {
        "url": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        "alt": "Pic Of Business Card"
    },
    "bizNumber": "4224831",
    "likes": [],
    "user_id": "641b1b49d38041ad5ca1bb8c",
    "_id": "6436f4bbb5abf161cbc2a27c",
    "createdAt": "2023-04-12T18:13:15.043Z",
    "__v": 0
} */


/* const NewCardPage = () => {
  const [inputState, setInputState] = useState({
    url: "",
    alt: "",
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
    
  });
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  
  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      console.log(joiResponse);
      if (!joiResponse) {
        //move to homepage
        await axios.post("/cards/", inputState);
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log("err", err);
      toast.error("errrrrrrrrrrrrrrrror");
    }
  };

  const handleCancelBtnClick = (ev) => {
    //move to homepage
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  /*if (!inputState) {
    return <CircularProgress />;
  }*/ 