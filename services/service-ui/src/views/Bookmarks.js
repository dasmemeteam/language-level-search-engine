import React from 'react';
import NavigationBar from "../components/NavigationBar";
import HeaderTags from '../components/HeaderTags';
import getBookmarks from '../handlers/bookmarksHelper';
import BookmarkCard from '../components/BookmarkCard';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Divider, Tabs, Tab, Box, Typography } from '@material-ui/core';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

const useStyles = makeStyles({
    bookmarkRoot: {
        display: 'flex',
        alignItems: isMobile ? 'center' : null,
        flexDirection: isMobile ? 'column' : 'row',
        marginTop: isMobile ? '10%' : '5%',
        justifyContent: isMobile ? null : 'space-around',
        flexFlow: isMobile ? null : 'wrap'
    },
    bookmarkicon: {
        fontSize: isMobile ? '100vw !important' : '50vw !important',
        color: 'rgb(0, 0, 0, 0.1)',
        position: !isMobile ? 'fixed' : null,
        marginTop: '-5%'
    },
    tabRoot: {
        fontSize: '30px'
    },
    tabsCentered: {
        justifyContent: 'space-around'
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        borderTop: isMobile ? '1px solid #e8e8e8' : null,
    },
    tabsIndicator: {
    
    }
});


/**
 * The Bookmarks view.
 * @returns {JSX} Bookmarks view components jsx.
 */
const Bookmarks = () => {

    const classes = useStyles();

    const [deleted, setDeleted] = React.useState(false);
    const [tab, setTab] = React.useState(0);

    // get bookmark articles
    let bookmarks = getBookmarks();

    // re-render page after bookmark was deleted
    React.useEffect(() => {
        setDeleted(false)
    }, [deleted])

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    /**
     * Store the new tab in the state
     * @param {Event} event 
     * @param {Number} newValue 
     */
    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    }

    /**
     * Render the bookmarks for each language
     * @param {String} lang 
     */
    const renderTabContent = (lang) => {
        return (
            <div className={classes.bookmarkRoot}>
            {
                bookmarks[lang].length === 0
                    ?
                    <BookmarkIcon className={classes.bookmarkicon} />
                    :
                    bookmarks[lang].map((bm, index) => {
                        return <BookmarkCard key={index} bookmark={bm} setDeleted={setDeleted} />
                    })
            }
        </div>
        );
    }

    return (
        <div>
            <HeaderTags
                title="Elaisa Search Engine - Bookmarks"
                desc="Sorry, but there is no page with this path."
                keywords="Bookmarks, Lesezeichen"
            />
            <NavigationBar
                id="navBar"
            />
            { isMobile ? <br /> : <Divider /> }
            <Tabs 
                centered 
                value={tab} 
                onChange={handleChangeTab} 
                aria-label="bookmarks tabs"
                indicatorColor='secondary'
                classes={{
                    centered: classes.tabsCentered,
                    root: classes.tabsRoot,
                    indicator: classes.tabsIndicator
                }}
            >
                <Tab classes={{root: classes.tabRoot}} label="🇩🇪" {...a11yProps(0)} />
                <Tab classes={{root: classes.tabRoot}} label="🇬🇧" {...a11yProps(1)} />
                <Tab classes={{root: classes.tabRoot}} label="🇪🇸" {...a11yProps(2)} />
            </Tabs>
            {
                ['de', 'en', 'es'].map((langCode, index) => (
                    <TabPanel value={tab} index={index}>
                        {renderTabContent(langCode)}
                    </TabPanel>
                ))
            }
        </div>);

};

export default Bookmarks;