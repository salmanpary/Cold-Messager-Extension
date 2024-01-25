import styles from './Header.module.css';
import Button from '@mui/material/Button';

export default function Header() {
  return (
    <>
      <div className={styles.navbar}>
        <p className={styles.head}>Header / Menu / Navigation</p>
        <Button variant="outlined">Login</Button>
      </div>
    </>
  );
}
