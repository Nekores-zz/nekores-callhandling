import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export const WarningIcon = withStyles(
  (theme) => ({
    icon: {
      fontSize: 20,
      width: 24,
      fill: '#c8c8c8',
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
  }),
) (
  ({classes}) => (
    <svg className={classes.icon} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="M0 0h24v24H0z"></path><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></svg>
  )
);

export const Notification = withStyles(
  theme => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgb(49, 49, 49)',
      color: '#c8c8c8',
    },
    button: {
      color: 'rgb(225, 0, 80)',
      padding: 0,
      paddingLeft: 8,
    },
  })
) (
  function Notification(props) {
    const {classes, className, message, action, open, icon, onClose, ...rest} = props;
    return (
      <Snackbar open={open}>
        <SnackbarContent
          message={
            <div className={[classes.warning, classes.container, className].join(' ')}>
              {icon && <div>
                {icon}
              </div>}
              <div className={classes.message}>
                {message}
              </div>
              {action && <div>
                <Button color="secondary" size="small" className={classes.button} onClick={onClose}>{action}</Button>
              </div>}
            </div>
          }
        />
      </Snackbar>
    );
  }
);