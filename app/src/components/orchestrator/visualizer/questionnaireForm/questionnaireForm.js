import React, { useState, useEffect, useContext } from 'react';
import { visualizeDictionary, buttonDictionary } from 'i18n';
import { AppContext } from 'App';
import {
  QUESTIONNAIRE_EXAMPLE_URL,
  METADATA_EXAMPLE_URL,
  DATA_EXAMPLE_URL,
  SIMPSONS,
} from 'utils/constants';
import {
  Checkbox,
  Container,
  FormControlLabel,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Button } from 'components/designSystem';
import Helper from './helper';
import Examples from './examples';
import Versions from './versions';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  title: {
    textAlign: 'center',
  },
  selectionParent: {
    display: 'flex',
    alignItems: 'baseLine',
  },
  selection: {
    marginLeft: theme.spacing(3),
  },
  buttonParent: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
}));

const QuestionnaireForm = () => {
  const classes = useStyles();
  const [questionnaire, setQuestionnaire] = useState('');
  const [metadata, setMetadata] = useState('');
  const [data, setData] = useState('');
  const [readonly, setReadonly] = useState(false);
  const [version, setVersion] = useState('');

  const versionTransform = version.replace(/\./g, '-');

  const [selected, setSelected] = useState('');

  const { apps } = useContext(AppContext);
  const defaultVersion = apps[0].lunaticVersion.replace(/\./g, '-');

  useEffect(() => {
    setVersion(selected ? defaultVersion : selected);
    setQuestionnaire(
      selected ? QUESTIONNAIRE_EXAMPLE_URL(selected, defaultVersion) : selected
    );
    setMetadata(
      selected ? METADATA_EXAMPLE_URL(selected, defaultVersion) : selected
    );
    setData(selected ? DATA_EXAMPLE_URL(selected, defaultVersion) : selected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const goToQuestionnaire = e => {
    window.location.href = `${
      window.location.origin
    }/${versionTransform}/visualize?questionnaire=${encodeURIComponent(
      questionnaire
    )}
      ${metadata ? `&metadata=${encodeURIComponent(metadata)}` : ''}${
      data ? `&data=${encodeURIComponent(data)}` : ''
    }${readonly ? `&readonly=${readonly}` : ''}`;
    e.preventDefault();
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {visualizeDictionary.visualizationTitlePage}
      </Typography>
      <form onSubmit={goToQuestionnaire}>
        <TextField
          id="questionnaire-url-form"
          required
          label={visualizeDictionary.labelQuest}
          placeholder={QUESTIONNAIRE_EXAMPLE_URL(SIMPSONS, defaultVersion)}
          helperText={visualizeDictionary.helperTextQuest}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={questionnaire}
          onChange={({ target: { value: v } }) => {
            setQuestionnaire(v);
          }}
          variant="outlined"
        />
        <TextField
          id="metadata-url-form"
          label={visualizeDictionary.labelMetadata}
          placeholder={METADATA_EXAMPLE_URL(SIMPSONS, defaultVersion)}
          helperText={visualizeDictionary.helperTextMetadata}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={metadata}
          onChange={({ target: { value: v } }) => {
            setMetadata(v);
          }}
          variant="outlined"
        />
        <TextField
          id="data-url-form"
          label={visualizeDictionary.labelData}
          placeholder={DATA_EXAMPLE_URL(SIMPSONS, defaultVersion)}
          helperText={visualizeDictionary.helperTextData}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={data}
          onChange={({ target: { value: v } }) => {
            setData(v);
          }}
          variant="outlined"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={readonly}
              onChange={({ target: { checked } }) => setReadonly(checked)}
              name="readonly"
              color="primary"
            />
          }
          label={visualizeDictionary.labelReadonly}
        />
        <div className={classes.selectionParent}>
          <Typography>{visualizeDictionary.chooseVersions}</Typography>
          <Versions
            className={classes.selection}
            version={version}
            setVersion={setVersion}
          />
        </div>
        <div className={classes.selectionParent}>
          <Typography>{visualizeDictionary.chooseExamples}</Typography>
          <Examples
            className={classes.selection}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className={classes.buttonParent}>
          <Button type="submit" className={classes.button}>
            {buttonDictionary.visualize}
          </Button>
        </div>
      </form>
      <br />
      <Helper />
    </Container>
  );
};

export default QuestionnaireForm;
