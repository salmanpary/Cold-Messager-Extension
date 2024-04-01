import styles from '../../styles/Pages.module.css';
import CustomButton from '../../components/Button';
import { UserAuth } from '../../context/AuthContext';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import LoginIcon from '@mui/icons-material/Login';
import BasicSelect from '../Dropdown/BasicSelect';
import Button from "@mui/material/Button";
import { useState } from 'react';

export default function Index({ navigateToPage }) {
  const { user } = UserAuth();
  const options = [5,10,20,30,40,50]
  const [autoConnectCount, setAutoConnectCount] = useState(options[0])
  const handleOptionSelect = (option) =>{
    setAutoConnectCount(option)
  }

  const handleButtonClickCancel = () =>{
    chrome.storage.local.set({"enableAutoConnect": false})
    chrome.storage.local.set({"currentCount":"0"})
    chrome.tabs.reload()
  }

  const handleButtonClick = () =>{
   // Set local storage value for enableAutoConnect as true
   chrome.storage.local.set({"enableAutoConnect": true})
   // Set local storage value for countAutoConnect as autoConnectCount
   chrome.storage.local.set({"countAutoConnect": autoConnectCount.toString()});
   // setting current count in chrome.local.storage and not content script because it will get reinitialised when content script is ran again
   chrome.storage.local.set({"currentCount":"0"})
   chrome.tabs.reload()
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.home__buttongroup} style={{ display: 'flex' }}>
          {user ? (
            <>
              <CustomButton
                href='https://www.coldmessager.com/profile/new-template'
                target='_blank'
                text="New Template"
                startIcon={<LibraryAddIcon/>}
              />
              <CustomButton
                href="https://www.coldmessager.com/profile/saved-templates"
                target='_blank'
                text="Saved Templates"
                startIcon={<BookmarksIcon/>}
              />
              <div style={{  display: 'flex', justifyContent:"space-between" , alignItems: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#ffcc4b !important',
                  color: 'black',
                  width: '90%',
                  textTransform: 'none',
                  marginTop: '10px',
                  fontWeight: 'bold',
                }}
                size="large"
                startIcon={<GroupAddIcon/>}
               onClick={handleButtonClick} >
                Auto Connect
              </Button>
                <BasicSelect options = {options} onOptionSelect = {handleOptionSelect}/>
                <Button
                variant="contained"
                sx={{
                  backgroundColor: '#ffcc4b !important',
                  color: 'black',
                  width: '90%',
                  textTransform: 'none',
                  marginTop: '10px',
                  fontWeight: 'bold',
                }}
                size="large"
                startIcon={<CancelIcon/>}
               onClick={handleButtonClickCancel} >
                Cancel
              </Button>
              </div>
            </>
          ) : (
            <>
              <h3 style={{ color: 'black' }}>Please login to continue</h3>
              <CustomButton
                href="https://www.coldmessager.com/"
                target='_blank'
                text="Login"
                startIcon={<LoginIcon/>}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
