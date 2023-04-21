import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Typography, Divider} from "@mui/material";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import ROUTES from "../routes/ROUTES";
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validation/editValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import { toast } from "react-toastify";

const EditCardPage = () => {
  const { id } = useParams();
  /*
    router: /edit/:id
    url: /edit/magafaiim
    params = {
      id: "magafaiim"
    }
    const params = useParams()
    const id = params.id
  */
  const [inputState, setInputState] = useState(null);
  // const [inputState, setInputState] = useState({
  //   img: "",
  //   title: "",
  //   price: "",
  //   description: "",
  // });
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  /*
    const params = useParams();
    params = {
      id:1
    }
    const id = params.id
  */
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          // there was errors = incorrect id
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        let newInputState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        delete newInputState.__v;

        setInputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id]);
  const handleSubmitBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      console.log(joiResponse);
      if (!joiResponse) {
        //move to homepage
        await axios.put("/cards/" + id, inputState);
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

  if (!inputState) {
    return <CircularProgress />;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginY: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" textAlign={"center"} my={2}>
          Edit Card Page
        </Typography>
        <Typography variant="h6" textAlign={"center"} my={2}>
          Here you can edit the card details.
        </Typography>
        <Divider />
      <Box
        component="img"
        sx={{
          width: '1/9',
          maxWidth: { xs: '1'},
        }}
        alt={inputState.alt}
        src={inputState.url}
      />
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
                onClick={handleSubmitBtnClick}
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
export default EditCardPage;
