import { Typography, Divider, Grid, Box, List, ListItem } from "@mui/material";
import homePageImg from './homePageImg.png';
import favoritesPageImg from './FavoritesPageImg.png'
import mycardsPageImg from './mycardsPageImg.png'
import { WidthFull } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const AboutPage = () => {
    return (
        <Box>
            <Typography variant="h4" textAlign={"center"} my={2}>
              About Our Website 
            </Typography>
            <Typography variant="h6" textAlign={"center"} my={2}>
              Here you can find explaination about our Business Cards website.
            </Typography>
            <Divider />
            <Grid container spacing={2} my={2}>
                <Grid item xs={12} md={12} my={2}>
                    <Typography variant="h5" gutterBottom>Our website presents business cards of different businesses from different sections. If you are a business that wants to publish itself and to present details about it, you are welcome to join us.</Typography>    
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#bdbdbd', display: 'flex', alignItems: 'center'}}>
                    <div>
                        <Typography variant="h6" gutterBottom >Home Page</Typography>
                    <Typography>On the home page you can find all the business cards we have on our site.</Typography>
                    <List>
                        <ListItem># Clicking on the business card will bring you to a page with more details about the business.</ListItem>
                        <ListItem># Clicking on the <span style={{padding: '5px'}}> &#9829; </span> will mark this business card as a favorite.</ListItem>
                        <ListItem># Clicking on the pencil will allow editing of the card, available only to business customers who created the card.</ListItem>
                        <ListItem># Clicking on the trash bin will allow deletion of the card, available only to admin customers.</ListItem>
                    </List>
                    </div> 
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#bdbdbd', }}>
                        <img src={homePageImg} alt={'Home Page'} style={{maxWidth: '100%', height: 'auto'}}></img>
                </Grid>
                <Grid item xs={12} md={6} style={{display: 'flex', alignItems: 'center'}}>
                    <img src={favoritesPageImg} alt={'Favorites Page'} style={{maxWidth: '100%', height: 'auto'}}></img>
                </Grid>
                <Grid item xs={12} md={6} style={{display: 'flex', alignItems: 'center'}}>
                  <div>
                    <Typography variant="h6" gutterBottom>Favorites Page</Typography>
                    <Typography>Favorites page is available to registered and logged in users. All the business cards that the user has marked as favorites are saved here, so you can perform the actions on the card just like from the home page.</Typography> 
                  </div> 
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#bdbdbd', display: 'flex', alignItems: 'center'}}>
                    <div>
                    <Typography variant="h6" gutterBottom>My Cards Page</Typography>
                    <Typography>This page is available to business users who logged in. All business cards created by the user are displayed here. From this page you can also create a new card by clicking on the "+" button.</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#bdbdbd'}}>
                    <img src={mycardsPageImg} alt={'My Cards Page'} style={{maxWidth: '100%', height: 'auto'}}></img>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Typography variant="h6" gutterBottom>Sandbox Page</Typography>
                    <Typography>CRM page is available to Admin users. This page demonstrates using a page within a page as taught in class. Clicking on the link opens the corresponding page.</Typography>  
                </Grid>
                <Grid item xs={12} md={6} mb={3}>
                    <Typography variant="h6" gutterBottom>CRM Page</Typography>
                    <Typography>CRM page is available to Admin users. This table shows all users and their information details. In this table, an admin user can delete a user or edit a business status for other non-admin users. This is a bonus task.</Typography>  
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#bdbdbd'}}>
                    <Typography variant="h6" gutterBottom>Detailed Business Card Page</Typography>
                    <Typography>This page is available to all types of users, and here you can find more details about the businesses. An admin user will be able to change the business number here by clicking a button at the bottom of the card (bonus task).</Typography>  
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#bdbdbd'}}>
                    <Typography variant="h6" gutterBottom>There are several form pages on the website:</Typography>  
                    <List>
                        <ListItem># User Signup</ListItem>
                        <ListItem># User Login</ListItem>
                        <ListItem># User Profile (bonus task)</ListItem>
                        <ListItem># Creat card</ListItem>
                        <ListItem># Edit Card</ListItem>
                    </List>
                </Grid>



            </Grid>
        </Box>
    )
}

export default AboutPage;