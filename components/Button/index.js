"use client"
import Button from "@mui/material/Button";

const CustomButton = ({text,href,target,startIcon}) => {
  return (
    <Button
      href={href}
      target={target}
      variant="contained"
      sx={{
        backgroundColor: '#ffcc4b !important',
        color: 'black',
        width: '200px',
        textTransform: 'none',
        marginTop: '10px',
        fontWeight: 'bold',
      }}
      size="large"
      startIcon={startIcon}
    >
      {text}
    </Button>
  )
}

export default CustomButton