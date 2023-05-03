import { Box, Typography, Divider, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
//import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import { useEffect, useState } from "react";
import axios from "axios";
//import CircularProgress from "@mui/material";

const UsersTablePage = () => {
    const [usersArr, setUsersArr] = useState(null);
    const [bizStatus, setBizStatus] = useState(null);
    function createData(_id, firstName, lastName, email, biz, isAdmin) {
      return { _id, firstName, lastName, email, biz, isAdmin };
    }

  useEffect(() => {
  axios
    .get("users/getAllUsers")
    .then(({ data }) => {
      //console.log("data", data);
      setUsersArr(data.users);
    })
    .catch((err) => {
      console.log("err from axios", err);
      //toast.error("Oops");
    })
  }, []);
  

    const handleDeleteFromInitialUsersArr = async (id) => {
      try {
        await axios.delete("/users/deleteUser/" + id); // /users/:id
        setUsersArr((newUsersArr) =>
          newUsersArr.filter((item) => item._id !== id)
        );
      } catch (err) {
        console.log("error when deleting", err.response.data);
      }
    }; 

    const handleStatusBtn = async (id) => {
      try {
        const newUser = usersArr.find(user => user._id === id);
          if (!newUser) {
            throw new Error("User not found");
          }
        const updatedUser = {
        ...newUser,
        biz: !newUser.biz,
        };
        const { _id, isAdmin, ...updatedUserData } = updatedUser;
        console.log("id:", id);
        await axios.put("/users/userInfo/" + id, updatedUserData); // /users/:id
        setUsersArr(prevState => prevState.map(user => user._id === id ? updatedUser : user));
      } catch (err) {
        console.log("error when updating user", err);
      }
    }; 

    if (!usersArr) {
    return <CircularProgress />;
  }

    return (
      <Box>
        <Typography variant="h4" textAlign={"center"} my={2}>
          Users Table Page
        </Typography>
        <Typography variant="h6" textAlign={"center"} my={2}>
         Here you can see all the users and their status.
        </Typography>
        <Divider/>
        <TableContainer component={Paper} sx={{ my: 3 }} >
      <Table sx={{ minWidth: 650, my: '3' }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Users id</TableCell>
            
            <TableCell align="left">First Name&nbsp;</TableCell>
            <TableCell align="left">Last Name&nbsp;</TableCell>
            <TableCell align="left">Email&nbsp;</TableCell>
            <TableCell align="left">Business&nbsp;</TableCell>
            <TableCell align="left">Admin&nbsp;</TableCell>
            <TableCell align="left">Biz Status&nbsp;</TableCell>
            <TableCell align="left">Delete User&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersArr.map((user) => (
            <TableRow key={user.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{user._id}</TableCell>
              <TableCell align="left">{user.firstName}</TableCell>
              <TableCell align="left">{user.lastName}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.biz ? "true" : "false"}</TableCell>
              <TableCell align="left">{user.isAdmin ? "true" : "false"}</TableCell>
              <TableCell align="left">{user.isAdmin ? "" : <button onClick={() => handleStatusBtn(user._id)}>change status</button>}</TableCell>
              <TableCell align="left">{user.isAdmin ? "" : <button onClick={() => handleDeleteFromInitialUsersArr(user._id)}>Delete</button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
     





  );


}

export default UsersTablePage; 