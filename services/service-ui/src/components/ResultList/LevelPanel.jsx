import React from 'react';
import { IconButton } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import LevelInfo from './LevelInfo';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import getBookmarks, { deleteBookmark } from '../../handlers/bookmarksHelper';

/**
 * The design for Expansion Panel for level difficulty infos.
*/
const ExpansionPanel = withStyles({
    root: {
        // border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            // margin: 'auto',
        },
        background: "transparent"
    },
    expanded: {
        border: '1px solid rgba(0, 0, 0, .125)'
    },
})(MuiExpansionPanel);

/**
 * The design for Expansion Panel Summary for level difficulty infos.
*/
const ExpansionPanelSummary = withStyles({
    root: {
        minHeight: 0,
        '&$expanded': {
            minHeight: 0,
        },
        padding: 0,
        paddingRight: '24px',
        paddingLeft: '4px'
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

/**
 * The design for Expansion Panel Details for level difficulty infos.
*/
const ExpansionPanelDetails = withStyles({
    root: {}
})(MuiExpansionPanelDetails);


/**
 * The Level Panel component for difficulty infos.
 * @param {object} props the given properties.
 * @return {JSX} Expansion Panel component.
*/
const LevelPanel = (props) => {

    const [isMarked, setIsMarked] = React.useState(false);

    const { websiteData, level_meta, level } = props;
    const { website, title, desc, keywords } = websiteData;

    // get bookmark articles
    let bookmarks = getBookmarks()

    React.useEffect(() => {
        // set isMarked for all articles in localStorage
        for (let bm of bookmarks) {
            if (bm.website === website) {
                setIsMarked(true)
            }
        }
    }, [bookmarks])

    /**
     * Render the BookMarkIcon given the current state of mark.
     */
    const renderBookMarkForArticle = () => {
        if (isMarked) {
            return <BookmarkIcon fontSize='medium' />
        } else {
            return <BookmarkBorderIcon fontSize='medium' />
        }
    }

    /**
     * Set the new BookMarkIcon and store the marked article to localStorage.
     * Store marked articles to bookmarks. Use a stringified array to store it in the localStorage.
     * source: https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
     */
    const handleBookMarkClicked = () => {
        // Given the isMarked state, wether add or remove article to localStorage bookmarks   
        if (isMarked) {
            // change the state and the icon
            setIsMarked(false)
            deleteBookmark(website)
        } else {
            setIsMarked(true)

            // define new bookmark object
            const newBookMark = {
                website,
                title,
                desc,
                keywords,
                level_meta,
                level
            }

            bookmarks.push(newBookMark)
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        }
    }

    return (<div style={{
        display: 'flex',
        flexDirection: 'row'
    }}>
        <IconButton aria-label='bookmark' onClick={handleBookMarkClicked}>
            {renderBookMarkForArticle()}
        </IconButton>
        <ExpansionPanel>
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<FitnessCenterIcon fontSize="medium" />}
            >
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: "flex", flexDirection: "column" }}>
                <LevelInfo level_meta={level_meta} level={level} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>);
};

export default LevelPanel;