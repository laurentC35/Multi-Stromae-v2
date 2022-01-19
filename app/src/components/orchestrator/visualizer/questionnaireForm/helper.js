import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { visualizeDictionary } from 'i18n';
import { MarkdownTypo } from 'components/designSystem';
import React from 'react';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '4em',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionDetails: {
    display: 'block',
  },
}));

const Helper = () => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <MarkdownTypo className={classes.heading}>
          {visualizeDictionary.accordionHelperTitle}
        </MarkdownTypo>
        <MarkdownTypo className={classes.secondaryHeading}>
          {visualizeDictionary.accordionHelperSubtitle}
        </MarkdownTypo>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <MarkdownTypo>{visualizeDictionary.accordionHelperBody}</MarkdownTypo>
      </AccordionDetails>
    </Accordion>
  );
};
export default Helper;
