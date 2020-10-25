import React, { PureComponent, Fragment } from "react";
import {
  Avatar,
  Divider,
  LinearProgress,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Paper,
  withStyles
} from "@material-ui/core";
import { Scroll } from "components";
import { styleSheet } from "jss/components/Searchbar/SearchbarResults";

class SearchbarResults extends PureComponent {
  onClick = url => {
    //this.props.history.push(url);
    this.props.handleSearchResult(url);
  };

  render() {
    const { classes, results, opened, selectByKeyboard } = this.props;

    return (
      <Paper
        className={`${classes.wrapper} ${!opened ? classes.wrapperHidden : ""}`}
      >
        <div className={classes.dividerBar} />
        <Scroll height="240px" hideOverflowX>
          <List
            component="nav"
            classes={{ root: `${classes.list} mui-scroll` }}
          >
            {!results && <LinearProgress />}
            {results && results.length === 0 && (
              <ListItem classes={{ root: classes.listItem }}>
                <ListItemText primary={"No results"} />
              </ListItem>
            )}
            {results &&
              results.map((item, index) => (
                <Fragment key={index}>
                  {index === 0 ? null : <Divider />}
                  <ListItem
                    button
                    classes={
                      index === selectByKeyboard
                        ? { root: classes.listItemSelected }
                        : { root: classes.listItem }
                    }
                  >
                    <ListItemIcon>
                      <Avatar>{item.text.charAt(0)}</Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      onMouseDown={event => this.onClick(item.url)}
                    />
                  </ListItem>
                </Fragment>
              ))}
          </List>
        </Scroll>
      </Paper>
    );
  }
}

export default withStyles(styleSheet, { name: "SearchbarResults" })(
  SearchbarResults
);
