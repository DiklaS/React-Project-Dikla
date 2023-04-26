import { Typography, Box, Grid, Divider, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "../components/CardComponent";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';


const FavoritesPage = () => {
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  const [favoritesArr, setFavoritesArr] = useState()

    useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        console.log("data", data);
        const userFavorites = data.filter((card) => card.likes.includes(payload._id))
        setFavoritesArr(userFavorites);
        console.log(userFavorites);
        
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
    }, [favoritesArr]);

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setFavoritesArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  }; 

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };
  
  
  if (!favoritesArr) {
    return <CircularProgress />;
  }  
    return (
        <Box>
            <Typography variant="h4" textAlign={"center"} my={2}>
              My Favorites Cards Page
            </Typography>
            <Typography variant="h6" textAlign={"center"} my={2}>
              All your favorites businesses are displayed here.
            </Typography>
            <Divider />
            <Grid container spacing={2} my={2}>
        {favoritesArr && favoritesArr.length>0 ? (favoritesArr.map((item) => (
          <Grid item xs={12} md={4} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              phone={item.phone}
              img={item.image ? item.image.url : ""}
              city={item.city}
              street={item.street}
              bizNumber={item.bizNumber}
              state={item.state}
              zipCode={item.zipCode}
              likes={item.likes}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              //onDetailedCard={handleDetailedCardFromInitialCardsArr}
              canEdit={payload && (payload.biz || payload.isAdmin)}
             
            />
          </Grid>)))
          : <Typography variant="h6" gutterBottom>
              You don't have Favorites
           </Typography>
          
        }
      </Grid>
              

            
        </Box>
  );
    
    
}

export default FavoritesPage;