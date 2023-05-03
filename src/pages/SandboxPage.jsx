import {Box, Divider, Typography} from "@mui/material"
import { Link, Outlet } from "react-router-dom";

const SandboxPage = () => {
    return(
        <Box sx={{ position: 'relative' }}>
            <Typography variant="h4" textAlign={"center"} my={2}>
              Sandbox Page
            </Typography>
            <Typography variant="h6" textAlign={"center"} my={2}>
              Here you can find a page inside a page.
            </Typography>
            <Divider />
            <Box sx={{background: '#00c853', my:3, height: 40,  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',}}>
            <Link to="/sandbox/sample1" style={{textDecoration: 'none'}}>SAMPLE NO. 1</Link>
            </Box>
            <Box sx={{background:'yellow', my:3, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',}}>
            <Link to="/sandbox/sample2" style={{textDecoration: 'none'}}>SAMPLE NO. 2</Link>
            </Box>
            <Box sx={{background:'orange', my:3, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',}}>
            <Link to="/sandbox/sample3" style={{textDecoration: 'none'}}>SAMPLE NO. 3</Link>
            </Box>
            <Outlet />
          
        </Box>
        

    )

}

export default SandboxPage;