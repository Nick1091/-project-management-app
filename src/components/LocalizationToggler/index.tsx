import { useTranslation } from 'react-i18next';
import { Grid, Switch } from '@mui/material';
import { Toggler } from './styled';

export const LocalizationToggler = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? i18n.changeLanguage('ru') : i18n.changeLanguage('en');
  };

  return (
    <Toggler>
      <Grid component="label" container alignItems="center" spacing={0.5}>
        <Grid item>en</Grid>
        <Grid item>
          <Switch
            checked={localStorage.getItem('i18nextLng') !== 'en'}
            onChange={(e) => handleChange(e)}
            color="default"
          />
        </Grid>
        <Grid item>ru</Grid>
      </Grid>
    </Toggler>
  );
};
