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
  const options = [5, 10, 20, 30, 40, 50];
  const [autoConnectCount, setAutoConnectCount] = useState(options[0]);

  const handleOptionSelect = (option) => {
    setAutoConnectCount(option);
  };

  const handleButtonClickCancel = () => {
    chrome.storage.local.set({ "enableAutoConnect": false });
    chrome.storage.local.set({ "currentCount": "0" });
    chrome.tabs.reload();
  };

  const handleButtonClick = () => {
    chrome.storage.local.set({ "enableAutoConnect": true });
    chrome.storage.local.set({ "countAutoConnect": autoConnectCount.toString() });
    chrome.storage.local.set({ "currentCount": "0" });
    chrome.tabs.reload();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.home__buttongroup} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {user ? (
            <>
            <CustomButton
                href='https://www.coldmessager.com/profile/new-template'
                target='_blank'
                text="New Template"
                startIcon={<LibraryAddIcon />}
              />
              <CustomButton
                href="https://www.coldmessager.com/profile/saved-templates"
                target='_blank'
                text="Saved Templates"
                startIcon={<BookmarksIcon />}
              />
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BasicSelect options={options} onOptionSelect={handleOptionSelect} />
                  <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#ffcc4b !important',
                        color: 'black',
                        width: '100%',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        marginTop: '15px',
                        marginBottom: '2px'
                      }}
                      size="small"
                      startIcon={<GroupAddIcon />}
                      onClick={handleButtonClick}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#E32525 !important',
                    color: 'black',
                    width: '100%',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    marginTop: '10px',
                    '&:hover': {
                      backgroundColor: '#E32525 !important',
                    },
                  }}
                  size="small"
                  startIcon={<CancelIcon />}
                  onClick={handleButtonClickCancel}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ color: 'black' }}>Please login to continue</h2>
              <CustomButton
                href="https://www.coldmessager.com/"
                target='_blank'
                text="Login"
                startIcon={<LoginIcon />}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
