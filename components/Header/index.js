import { UserAuth } from '../../context/AuthContext';
import styles from './Header.module.css';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';

export default function Header() {
  const {user, logOutUser} = UserAuth()

  const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ fontSize: 18, fontWeight: 600, textTransform: "none",color:"black" }}
        endIcon={<ArrowDropDownIcon />}
        startIcon={<img src={user?.photoURL} alt="Profile Picture" width={30} height={30} className={styles.navbar__profileimage} referrerPolicy="no-referrer"/>}
      >
       {user?.displayName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={()=>{
          handleClose()
          logOutUser()
        }}  sx={{fontWeight:600}} >Logout</MenuItem>
      </Menu>
    </>
  )}
  
  return (
    <nav>
        <div className={styles.navbar}>
        <img
            src="/cold-messager-logo-2.png"
            alt="Vercel Logo"
            width={156}
            height={40}
        />
        {user ? (<>
            <ProfileMenu/>
        </>) : (<>
          <Button
            href="https://www.coldmessager.com/"
            target='_blank'
            color="inherit"
            sx={{ fontSize: 18, fontWeight: 600, textTransform: "none",color:"#ff40a5" }}
            startIcon={<GoogleIcon sx={{fontSize:18,color:"#ff40a5"}}/>}
            onClick={() => chrome.tabs.reload()}
          >
          Login
        </Button>
        </>)}
      </div>
    </nav>
  );
}