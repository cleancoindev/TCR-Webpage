import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Switch from '@material-ui/core/Switch';
import AdminTCRPage from './AdminTCRPage';
import TcrDialog from '../TcrDialog';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  button: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

class Admin extends React.Component {
  constructor(props) {
    super(props);

    const tcrs = ['Users pay', 'Peaceful', 'IDK'].map(name => (
      {
        name,
        parameters: [
          {
            key: 'Parameter #1',
            value: 0.123,
          },
          {
            key: 'Parameter #2',
            value: 0.32999991,
          },
          {
            key: 'Parameter #3',
            value: 'hello',
          },
        ],
      }
    ));
    this.state = {
      tcrDialogOpened: false,
      selectedTcr: 0,
      tcrs,
    };
  }

  onTCRSelected(selectedIndex) {
    this.setState({ selectedTcr: selectedIndex });
  }

  handleSwitch = () => {
    this.props.history.push('/player'); // eslint-disable-line 
  }

  handleTcrDialogCreate() {
    const { tcrs } = this.state;
    // TODO: should take tcr as an argument
    const newLength = tcrs.push({
      name: 'New TCR!',
      parameters: [
        {
          key: 'Parameter #1',
          value: 0.0001,
        },
        {
          key: 'Parameter #2',
          value: 'test',
        },
        {
          key: 'Parameter #3',
          value: 100,
        },
      ],
    });
    this.setState({ tcrs, tcrDialogOpened: false });
    this.onTCRSelected(newLength - 1);
  }

  handleTcrDialogCancel() {
    this.setState({ tcrDialogOpened: false });
  }

  showTcrDialog() {
    this.setState({ tcrDialogOpened: true });
  }

  render() {
    const { classes } = this.props;
    const { tcrDialogOpened, selectedTcr, tcrs } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              TCR Playground
            </Typography>
            <Switch onChange={this.handleSwitch} />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List subheader={<ListSubheader component="div">Deployed TCRs</ListSubheader>}>
            {tcrs.map((tcr, index) => (
              <ListItem
                button
                key={tcr.name}
                onClick={() => this.onTCRSelected(index)}
                selected={selectedTcr === index}
              >
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                <ListItemText primary={tcr.name} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.showTcrDialog()}
          >
            Create new TCR
          </Button>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <AdminTCRPage tcr={tcrs[selectedTcr]} />
        </main>
        <TcrDialog
          open={tcrDialogOpened}
          handleCancel={() => this.handleTcrDialogCancel()}
          handleCreate={() => this.handleTcrDialogCreate()}
        />
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Admin);
