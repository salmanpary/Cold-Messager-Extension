import styles from '../../styles/Pages.module.css';
import CustomButton from '../../components/Button'
import { UserAuth } from '../../context/AuthContext';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LoginIcon from '@mui/icons-material/Login';

export default function Index({ navigateToPage }) {
  const {user} = UserAuth()

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.home__buttongroup} >
          {user ? (<>
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

          </>) : (
            <>
              <h3 style={{color:'black'}}>Please login to continue</h3>
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
