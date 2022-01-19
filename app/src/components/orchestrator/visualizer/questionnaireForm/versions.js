import { FormControl, Select, InputLabel } from '@material-ui/core';
import { visualizeDictionary } from 'i18n';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { AppContext } from 'App';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Versions = ({ version, setVersion, className }) => {
  const classes = useStyles();

  const { apps } = useContext(AppContext);

  const handleChange = event => {
    const value = event.target.value;
    setVersion(value);
  };
  return (
    <FormControl className={`${classes.formControl} ${className}`}>
      <InputLabel htmlFor="native-simple">
        {visualizeDictionary.labelVersions}
      </InputLabel>
      <Select
        native
        value={version}
        onChange={handleChange}
        inputProps={{
          name: 'versions',
          id: 'native-simple',
        }}
        required
      >
        <option value="">{visualizeDictionary.labelVersions}</option>
        {apps.map(({ lunaticVersion }) => {
          return (
            <option key={lunaticVersion} value={lunaticVersion}>
              {lunaticVersion}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Versions;
