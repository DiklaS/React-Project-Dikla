import { Typography, Card, CardMedia, CardContent, CardActions, Button, Container, Divider, CircularProgress, ListItem, ListItemText  } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import {validateEditCardParamsSchema} from "../validation/editValidation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DetailedCardPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [detailedCardArr, setDetailedCardArr] = useState(null);

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
  }, []);

  const handleCloseBtnClick = (ev) => {
    navigate(ROUTES.HOME);
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
              Email: {detailedCardArr.email}
            </ListItem>
            <ListItem divider>
              Web: <ListItemText primary={detailedCardArr.web} />
            </ListItem>
            <ListItem divider>
              Adress: {detailedCardArr.houseNumber} {detailedCardArr.street}, {detailedCardArr.city}, {detailedCardArr.state}, {detailedCardArr.zipCode}, {detailedCardArr.country}
            </ListItem>
            <ListItem divider>
              Phone: <ListItemText primary={detailedCardArr.phone} />
            </ListItem>
            <ListItem divider>
              Created at: <ListItemText primary={detailedCardArr.createdAt} />
            </ListItem>  
          </CardContent>
          <CardActions>
            <Button variant="contained" size="medium" onClick={handleCloseBtnClick}>Close</Button>
          </CardActions>
    </Card>
        
      
      </Container>
  );
}

  
export default DetailedCardPage;