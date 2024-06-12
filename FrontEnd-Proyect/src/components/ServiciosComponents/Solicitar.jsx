import { Fragment, useState } from 'react';
import '../../styles/SolicitarServicio.css';
import { useTheme } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import {Input} from '@mui/material';
import { Select } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Cash in Transit',
  'Cash Managment Solutions',
  'Cash Technology',
];

const placesList = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón',
];

function getStylesService(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getStylesPlaces(place, selectedPlaces, theme) {
  return {
    fontWeight:
      selectedPlaces.indexOf(place) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const Solicitar = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPlaces(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Fragment>
      <div className='w-100 d-flex justify-content-center'>
        <div className="bg-white p-3 rounded" style={{width:'50%'}}>
          <div className="row mb-5">
            <h2>Formulario solicitud de servicio</h2>
          </div>
          <form className="form-solicitar">

            <Grid container spacing={3} justifyContent={'center'} sx={{ maxWidth: '100%' }}>

              <Grid item xs={6}>
                <FormControl sx={{ width: '100%' }} >
                  <InputLabel id="demo-multiple-name-label">Servicios</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"

                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={{ width: '100%' }}  >
                  <InputLabel id="demo-multiple-places-label">Destino</InputLabel>
                  <Select
                    labelId="demo-multiple-places-label"
                    id="demo-multiple-places"

                    value={selectedPlaces}
                    onChange={handleChange2}
                    input={<OutlinedInput label="Place" />}
                    MenuProps={MenuProps}
                  >
                    {placesList.map((place) => (
                      <MenuItem
                        key={place}
                        value={place}
                      >
                        {place}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      'DateTimePicker',
                    ]}
                  >
                    <DemoItem
                      InputLabel={<InputLabel componentName="DateTimePicker" valueType="date time" />}
                    >
                      <DateTimePicker />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField id="outlined-basic" label="Observacion" multiline variant="outlined" />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <Button variant="contained">
                  Enviar Solicitud
                </Button>
              </Grid>

            </Grid>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
