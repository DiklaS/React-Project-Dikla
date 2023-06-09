import { Box, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import { filterData } from "../components/filterFunc";



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
      filterFunc(data);
    })
    .catch((err) => {
      console.log("err from axios", err);
      toast.error("Oops");
    });
  
    /* const filterFunc = (data) => {
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter.toLowerCase();;
    }
    if (originalCardsArr) {
      
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.title.toLowerCase().startsWith(filter) || card.bizNumber.toLowerCase().startsWith(filter))
      );
    } else if (data) {
      
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.toLowerCase().startsWith(filter) || card.bizNumber.toLowerCase().startsWith(filter)));
    }
  }; 
  
  }, [qparams.filter]);*/

  const filterFunc = (data) => {
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter.toLowerCase();;
    }
      const newOriginalCardsArr = JSON.parse(
        JSON.stringify(originalCardsArr || data)
      );
      const filteredData = filterData(newOriginalCardsArr, filter);
      setOriginalCardsArr(newOriginalCardsArr);
      setCardsArr(filteredData);
    };
  }, [qparams.filter]);
  
  
  const handleDeleteFromInitialCardsArr = async (id) => {
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
              userId={item.user_id}
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
