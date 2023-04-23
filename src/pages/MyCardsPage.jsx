import { Box, Typography, Divider, Grid, Fab, CircularProgress} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "../components/CardComponent";
import AddIcon from '@mui/icons-material/Add';
import useQueryParams from "../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";


const MyCardsPage = ({onDelete, id}) => {
  const [myCardsArr, setmyCardsArr] = useState(null);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  

 useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        console.log("data", data);
        setmyCardsArr(data);
        
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);
  console.log(myCardsArr);

  const handleDeleteCardBtnClick = (ev) => {
    onDelete(id)
  };

  const handleCreateCardBtnClick = (ev) => {
    navigate(ROUTES.CREATECARD);
  };

  if (!myCardsArr) {
    return <CircularProgress />;
  }

    return (
        <Box>
            <Typography variant="h4" textAlign={"center"} my={2}>
              My Cards Page
            </Typography>
            <Typography variant="h6" textAlign={"center"} my={2}>
              Here you can find all the business cards which created by you.
            </Typography>
            <Divider />
            <Grid container spacing={2} my={2} sx={{ position: 'relative' }}>
              {myCardsArr.map((item) => (
              <Grid item xs={12} md={4} key={item._id + Date.now()} >
                <CardComponent
                  id={item._id}
                  title={item.title}
                  subTitle={item.subTitle}
                  description={item.description}
                  phone={item.phone}
                  img={item.image ? item.image.url : ""}
                  onDelete={handleDeleteCardBtnClick}
                  //onEdit={handleEditFromInitialCardsArr}
                  canEdit={payload && (payload.biz || payload.isAdmin)}
                  city={item.city}
                  street={item.street}
                  state={item.state}
                  zipCode={item.zipCode}
                  bizNumber={item.bizNumber}
                /> 
              </Grid>
              ))}
              <Fab color="primary" aria-label="add" size='large' sx={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                marginRight: '0'}}
                onClick={handleCreateCardBtnClick}>
                <AddIcon />
              </Fab>
            </Grid>
            

        </Box>
  ); 
    
}

export default MyCardsPage; 