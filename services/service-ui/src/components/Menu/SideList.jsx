import React, { Component } from 'react';
import { List, Divider, ListItem, ListItemIcon, ListItemText, Collapse, ListSubheader, Typography, Grid } from '@material-ui/core/';
import { Help, Share, ExpandLess, ExpandMore, Home, BugReport } from '@material-ui/icons/';
import MenuHelper from './MenuHelper';
import { Link } from 'react-router-dom'
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import logo from '../../assets/img/logo.png'

/**
 * Link Item for Menu to change view.
 * @param {object} props the given properties.
 * @returns {JSX} the button with Link 'to' component.
*/
const ListItemLink = (props) => {
    return <ListItem button component={Link} {...props} />;
}

/**
 * Link Item for Menu to change tab to new site.
 * @param {object} props the given properties.
 * @returns {JSX} the button with 'a' href component.
*/
const ListItemLinkHref = (props) => {
    return <ListItem button component='a' {...props} />;
}

class SideList extends Component {

    state = {
        open: false,
        splashDialogOpen: false
    }


    /**
     * Set the state for open or close the list in the menu drawer.
    */
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    /**
     * Handle opening and closing for the help splash dialog component
     */
    handleOpenSplashDialog = () => {
        localStorage.setItem('splashDialogWasOpen', false)
        this.props.onOpenedSplashDialog(false)
    }

    /**
     * Renders the menu list with all items.
     * @returns {JSX} the entire menu list with all items.
    */
    render() {
        return (
            <Grid
                container
                spacing={0}
                xs={12}
                justify='space-between'
                direction='column'
            >
                <Grid item>
                    <List
                        component="nav"
                        subheader={
                            <ListSubheader component='div'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginTop: '7%',
                                    marginBottom: '5%'
                                }}
                            >
                                <img src={logo} width='100' alt="Elaisa Search Engine Logo"></img>
                                <Typography
                                    variant='subheading'
                                    color='textSecondary'
                                    stlyle={{
                                        marginTop: '5%'
                                    }}>
                                    Menu
                                </Typography>
                            </ListSubheader>
                        }
                    >
                        {/* Home */}
                        <ListItemLink to="/" >
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText inset primary={<Translate id='UI__MENU__HOME_BUTTON' />} />
                        </ListItemLink>
                        {/* Level of Speaking Tests MENU */}
                        <ListItem button onClick={this.handleClick}>
                            <ListItemIcon>
                                <Share />
                            </ListItemIcon>
                            <ListItemText inset primary={<Translate id='UI__MENU__SPEAKING_TESTS_BUTTON' />} />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <List component="div">
                                <MenuHelper href="https://sprachtest.de/einstufungstest-deutsch" flag='🇩🇪' text="Deutsch" />
                                <MenuHelper href="https://sprachtest.de/einstufungstest-englisch" flag='🇬🇧' text="English" />
                                <MenuHelper href="https://sprachtest.de/einstufungstest-spanisch" flag='🇪🇸' text="Español" />
                            </List>
                        </Collapse>
                    </List>
                </Grid>

                <Grid item>
                    <List>
                        <Divider />
                        {/* Show Splash Dialog as Help view */}
                        <ListItemLink to='/' onClick={() => this.handleOpenSplashDialog()}>
                            <ListItemIcon>
                                <Help />
                            </ListItemIcon>
                            <ListItemText inset primary={<Translate id='UI__MENU__HELP_BUTTON' />} />
                        </ListItemLink>
                        {/* Navigate to GitHub Issue page */}
                        <ListItemLinkHref href='https://github.com/dasmemeteam/language-level-search-engine/issues' target="_blank">
                            <ListItemIcon>
                                <BugReport />
                            </ListItemIcon>
                            <ListItemText inset primary={<Translate id='UI__MENU__ISSUE_BUTTON' />} />
                        </ListItemLinkHref>
                    </List>
                </Grid >
            </Grid>
        );
    }
}

/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} returns the props containing the redux state.
 */
const mapStateToProps = state => {
    return {
        splashDialogWasOpen: state.splashDialogWasOpen
    };
};

/**
 * Maps redux signIn action to props.
 * @param {object} dispatch the current redux store.
 * @returns {any} redux action to props mapping.
*/
const mapDispatchToProps = dispatch => {
    return {
        onOpenedSplashDialog: (opened) => dispatch({ type: 'OPENED_SPLASH', opened })
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SideList);