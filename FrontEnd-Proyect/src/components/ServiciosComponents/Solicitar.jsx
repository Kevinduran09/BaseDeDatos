import { Fragment, useState } from 'react';
import '../../styles/SolicitarServicio.css';
import { useTheme } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';
import {InputLabel} from '@mui/material';
import {MenuItem} from '@mui/material';
import {FormControl} from '@mui/material';
import {Select} from '@mui/material';

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const Solicitar = () => {

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Fragment>
      <div className="div-solicitar bg-white">
        <form className="form-solicitar">
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Servicios</InputLabel>
        <Select 
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
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
        </form>
      </div>
    </Fragment>
  );
}
