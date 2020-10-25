import {withStyles} from '@material-ui/core/styles';
import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Subscroller from './Subscroller';
import {styleSheet} from 'jss/ScrollPanel';
import {announcements} from 'config/mockData';

class ScrollPanel extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Subscroller className={classes.scroller}  style={{height: '100vh',
        width: '100%',
        marginTop: '2px',
        padding: '44px',
        overflow: 'hidden',
        margin: 'auto'}}>
        <Typography className={classes.upperText}>
          <svg className={classes.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
          </svg>
          <span className={classes.headline}>Announcements</span>
        </Typography>
        <div style={{position: 'relative'}}>

          <Grid container spacing={0}>
            <div className={classes.outer}>
              {announcements && announcements.map((item, index) => (
                <Grid item xs={12} sm={12} key={index}>

                  <Paper className={classes.paperGrid}>
                    <div>
                      <div className={classes.secondaryWrapper}>
                        <div className={classes.pin}>
                          <Typography
                            variant="subtitle1" className={classes.sub}>
                            {item.title}
                          </Typography>
                        </div>
                        <Typography
                          variant="caption" className={classes.date}>
                          {item.date}
                        </Typography>
                      </div>
                      <Divider className={classes.divider}/>
                      <Typography
                         className={classes.text}>
                        {item.content}
                      </Typography>
                    </div>
                  </Paper>
                </Grid>))}
            </div>
          </Grid>
        </div>
    </Subscroller>

  <div className={classes.secondDiv}>
    <Typography className={classes.upperText}>
      <svg className={classes.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
      </svg>
      <span className={classes.headline}>Announcements</span>
    </Typography>
    <div className={classes.wrapperMobile}>

      <Grid container spacing={0}>
        <div className={classes.outer}>
          {announcements && announcements.map((item, index) => (
            <Grid item xs={12} sm={12} key={index}>

              <Paper className={classes.paperGrid}>
                <div>
                  <div className={classes.secondaryWrapper}>
                    <div className={classes.pin}>
                      <Typography
                        variant="subtitle1" className={classes.sub}>
                        {item.title}
                      </Typography>
                    </div>
                    <Typography
                      variant="caption" className={classes.date}>
                      {item.date}
                    </Typography>
                  </div>
                  <Divider className={classes.divider}/>
                  <Typography
                    className={classes.text}>
                    {item.content}
                  </Typography>
                </div>
              </Paper>
            </Grid>))}
        </div>
      </Grid>
  </div>
</div>
</div>

    );
  }
}
export default withStyles(styleSheet, {name: 'ScrollPanel'})(ScrollPanel);
