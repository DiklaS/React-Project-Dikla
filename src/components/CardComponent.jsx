import {Card, CardActionArea, CardMedia, CardHeader,CardContent, Typography, CardActions, IconButton, Divider, Box } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CardComponent = ({
  img,
  title,
  subTitle,
  phone,
  street,
  bizNumber,
  id, userId,
  onDelete,
  onLiked,
  onEdit,
  onDetailedCard,
  updateFavoritesArr,
  canEdit, 
  city, state, zipCode, likes
}) => {
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const isAdmin = useSelector((state) => state.authSlice.isAdmin);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(() => {
    if (payload && payload._id && likes && likes.length > 0) {
      return !!likes.find(id => id === payload._id);
    }
    return false;
    });

  const handleDeleteBtnClick = () => {
    console.log("id", id);
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };

  const handleDetailedCardBtnClick = () => {
    onDetailedCard(id);
  }; 

  const handleFavoritedChange = async () => {
   setIsFavorited(isFavorited => !isFavorited); 
    try {
      
      
      await axios.patch("/cards/card-like/" + id); 
      if (isFavorited === true)
      toast.info("Card was removed from favorites");
      if (updateFavoritesArr) {
      // Fetch the updated favorites data from the server
      const response = await axios.get("/cards/get-my-fav-cards");
      const updatedFavorites = response.data;
      updateFavoritesArr(updatedFavorites);
      } else
      toast.info("Card was added to favorites");
      } catch (err) {
      console.log("error when adding favorite", err.response.data);
    }
  }; 

  
 
  /* if (!likes) {
    return <CircularProgress />;
  }  */

  return (
    <Card square raised>
      <CardActionArea onClick={handleDetailedCardBtnClick}>
        <CardMedia component="img" image={img} />
        <CardHeader title={title} subheader={subTitle}></CardHeader>
        <Divider variant="middle" />
        <CardContent>
          <Typography><strong>Phone: </strong>{phone}</Typography>
          <Typography><strong>Address:</strong> {street} {city} {state} {zipCode}</Typography>
          <Typography><strong>Card Number: </strong>{bizNumber}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent:'space-between'}}>
        <Box>
          {(isAdmin || (payload && (userId === payload._id))) && <IconButton aria-label="delete" onClick={handleDeleteBtnClick}>
          <DeleteIcon />
          </IconButton>}
          {canEdit && payload && (userId === payload._id) && <IconButton aria-label="edit" sx={{justifyContent: 'left'}} onClick={handleEditBtnClick}>
          <EditIcon />
          </IconButton>}
        </Box>
        <Box>
          {isLoggedIn && 
          <IconButton aria-label="favorite" onClick={handleFavoritedChange}>
            <FavoriteIcon color={isFavorited ? "error" : "inherit"}/>
          </IconButton>}
          <IconButton aria-label="contact" sx={{justifyContent: 'right'}}>
            <PhoneIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};

export default CardComponent;
