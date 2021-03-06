import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { DispatchContext } from 'docs/src/modules/components/ThemeContext';
import IncreaseIcon from '@material-ui/icons/AddCircleOutline';
import DecreaseIcon from '@material-ui/icons/RemoveCircleOutline';
import { useSelector } from 'react-redux';

const minSpacing = 0;
const maxSpacing = 20;

export default function DensityTool() {
  const dispatch = React.useContext(DispatchContext);
  function handleDensityChange(event) {
    dispatch({ type: 'SET_DENSE', payload: event.target.checked });
  }

  function handleSpacingChange(event, value) {
    dispatch({ type: 'SET_SPACING', payload: value || +event.target.value });
  }

  function increaseSpacing() {
    dispatch({ type: 'INCREASE_SPACING' });
  }

  function decreaseSpacing() {
    dispatch({ type: 'DECREASE_SPACING' });
  }

  function resetDensity() {
    dispatch({ type: 'RESET_DENSITY' });
  }

  const theme = useTheme();
  const spacingUnit = theme.spacing(1);

  const t = useSelector(state => state.options.t);

  return (
    <Grid container spacing={2}>
      <Grid container item>
        <FormControlLabel
          control={
            <Switch
              checked={theme.dense}
              onChange={handleDensityChange}
              value="dense"
              color="secondary"
            />
          }
          label={t('useHighDensity')}
        />
      </Grid>
      <Grid container item alignItems="center" spacing={2}>
        <Grid item>
          <Typography id="input-slider" gutterBottom>
            {t('spacingUnit')}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label={t('increaseSpacing')} onClick={decreaseSpacing}>
            <DecreaseIcon />
          </IconButton>
          <Input
            value={spacingUnit}
            margin="dense"
            onChange={handleSpacingChange}
            inputProps={{
              step: 1,
              min: minSpacing,
              max: maxSpacing,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          <IconButton aria-label={t('decreaseSpacing')} onClick={increaseSpacing}>
            <IncreaseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>
        <Button color="primary" variant="contained" onClick={resetDensity}>
          {t('resetDensity')}
        </Button>
      </Grid>
    </Grid>
  );
}
