import { TextField, Grid } from "@mui/material";

const SignupInputComponent = ({id, label, value, required, onChange, error, helperText}) => {
    
    return (
            
              <TextField
                key={id}
                required={required}
                fullWidth 
                id={id}
                label={label}
                //type={type}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText} 
              />
            
       

    )
}

export default SignupInputComponent;