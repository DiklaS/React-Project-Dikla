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


const MyCardsPage = () => {
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
  


  const handleDeleteCardBtnClick = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setmyCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  const handleEditCardBtnClick = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  const handleCreateCardBtnClick = (ev) => {
    navigate(ROUTES.CREATECARD);
  };

  if (!myCardsArr) {
    return <CircularProgress />;
  }

    return (
        <Box sx={{ position: 'relative' }}>
            <Typography variant="h4" textAlign={"center"} my={2}>
              My Cards Page
            </Typography>
            <Typography variant="h6" textAlign={"center"} my={2}>
              Here you can find all the business cards which created by you.
            </Typography>
            <Divider />
            <Grid container spacing={2} my={2} >
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
                  onEdit={handleEditCardBtnClick}
                  canEdit={payload && (payload.biz || payload.isAdmin)}
                  city={item.city}
                  street={item.street}
                  state={item.state}
                  zipCode={item.zipCode}
                  likes={item.likes}
                  bizNumber={item.bizNumber}
                /> 
              </Grid>
              ))}
              
            </Grid>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" >
              <Fab color="primary" aria-label="add" size='large' 
                  onClick={handleCreateCardBtnClick}>
                  <AddIcon />
              </Fab>
            </Box>

        </Box>
  ); 
    
}

export default MyCardsPage; 


//sx={{ position: 'relative' }}