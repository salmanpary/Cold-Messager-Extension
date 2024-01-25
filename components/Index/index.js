import styles from '../../styles/Pages.module.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Index({ navigateToPage }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>Saved Templates</Button>
        <Button>New Template</Button>
      </ButtonGroup>
      </main>
    </div>
  );
}
