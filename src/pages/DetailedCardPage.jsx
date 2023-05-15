import { Typography, Card, CardMedia, CardContent, CardActions, Button, Container, Divider, CircularProgress, ListItem, ListItemText, } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const DetailedCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detailedCardArr, setDetailedCardArr] = useState(null);
  const isAdmin = useSelector((bigState) => bigState.authSlice.isAdmin);
  //const [inputNumber, setInputNumber] = useState('');

  useEffect(() => {
    axios
      .get("/cards/card/"+id)
      .then(({ data }) => {
        console.log("data", data);
        setDetailedCardArr(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, [detailedCardArr]);

  const handleCloseBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };

/*   function handleInputChange(ev) {
    setInputNumber(ev.target.value);
    console.log(inputNumber)
    
  } */

  const handleChangeNumberBtn = async () => {
    try {
      await axios.patch("/cards/bizNumber/" + id, );
      toast.success("Card Number was changed") 
    } catch (err) {
      console.log("error when changing card number", err);
    } 
  }; 

if (!detailedCardArr) {
    return <CircularProgress />;
  }  
  return (
      <Container component="main" maxWidth="md">
        <Typography variant="h4" textAlign={"center"} my={2}>
            Detailed Business Card
        </Typography>
        <Typography variant="h6" textAlign={"center"} my={2}>
            Here you can find more details on the business..
        </Typography>
        <Divider />
        <Card sx={{ maxWidth: 'sm', marginY: 2, marginX: 'auto' }}>
          <CardMedia
            component="img"
            alt={detailedCardArr.image.alt}
            height="auto"
            image={detailedCardArr.image.url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {detailedCardArr.title}
            </Typography>
            <ListItem divider>
              <ListItemText primary={detailedCardArr.subTitle} />
            </ListItem>
            <ListItem divider>
              <ListItemText primary={detailedCardArr.description} />
            </ListItem>
            <ListItem divider>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}> Email:</Typography>
              <ListItemText primary={detailedCardArr.email} style={{ marginLeft: '10px' }}/>
            </ListItem>
            <ListItem divider>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Web: </Typography>
              <ListItemText primary={detailedCardArr.web} style={{ marginLeft: '10px' }} />
            </ListItem>
            <ListItem divider>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Adress:</Typography>
              <span style={{ marginLeft: '10px' }}>{detailedCardArr.houseNumber} {detailedCardArr.street}, {detailedCardArr.city}, {detailedCardArr.state}, {detailedCardArr.zipCode}, {detailedCardArr.country} </span>
            </ListItem>
            <ListItem divider>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Phone: </Typography>
              <ListItemText primary={detailedCardArr.phone} style={{ marginLeft: '10px' }}/>
            </ListItem>
            <ListItem divider>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Created at: </Typography>
              <ListItemText primary={new Date(detailedCardArr.createdAt).toLocaleDateString("en-US")} style={{ marginLeft: '10px' }}/>
            </ListItem>
            <ListItem divider>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Card number:</Typography>
              <ListItemText primary={ detailedCardArr.bizNumber}  style={{ marginLeft: '10px' }} />
            </ListItem> 
             {/* {isAdmin && <ListItem divider>
              <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
              <TextField
                id='inputNumber'
                label="New Card Number"
                
                value={inputNumber}
                onChange={handleInputChange}
                error={(inputsErrorsState && inputsErrorsState.bizNumber) ? true : false}
               
                helperText={inputsErrorsState && inputsErrorsState.bizNumber && inputsErrorsState.bizNumber.map((item) => (
                    <span key={"errors" + item}>{item}</span>
                  ))}
              />
              </Box>
            </ListItem>} */}
          </CardContent>
          <CardActions>
            
            <Button variant="contained" size="medium" onClick={handleCloseBtnClick}>Close</Button>
            {isAdmin && <Button variant="contained" size="medium" onClick={handleChangeNumberBtn}>Change Card Number</Button>}
            {/* <Button variant="contained" size="medium" onClick={handleChangeNumberBtn}>Change Card Number</Button> */}
          </CardActions>
    </Card>
        
      
      </Container>
  );
}

  
export default DetailedCardPage;