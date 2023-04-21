import { Box, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";


const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        console.log("data", data);
        // setCardsArr(data);
        filterFunc(data);
        /* const cards = response.data;
        const card = cards.find((c) => c._id === cardId);
        setIsFavorited(card.likes?.includes(payload?._id) ?? false); */
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);

  /* const handleFavoritedChange = async () => {
    setIsFavorited(isFavorited => !isFavorited)
    try {
      await axios.patch("/cards/card-like/" + id); // /cards/:id
    } catch (err) {
      console.log("error when adding favorite", err.response.data);
    }
  }; */

  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);
  
  const handleDeleteFromInitialCardsArr = async (id) => {
    // let newCardsArr = JSON.parse(JSON.stringify(cardsArr));
    // newCardsArr = newCardsArr.filter((item) => item.id != id);
    // setCardsArr(newCardsArr);
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  const handleDetailedCardFromInitialCardsArr = (id) => {
    navigate(`/detailedcard/${id}`); 
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" textAlign={"center"} my={2}>
        Cards Page
      </Typography>
      <Typography variant="h6" textAlign={"center"} my={2}>
        Here you can find cards of all our businesses.
      </Typography>
      <Divider />
      <Grid container spacing={2} my={2}>
        {cardsArr.map((item) => (
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
              onDetailedCard={handleDetailedCardFromInitialCardsArr}
              canEdit={payload && (payload.biz || payload.isAdmin)}
             
            />
          </Grid>
          
        ))}
      </Grid>
    </Box>
  );
};


export default HomePage;
