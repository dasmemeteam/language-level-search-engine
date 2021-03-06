import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton } from '@material-ui/core/';
import Search from '@material-ui/icons/Search';

// styles 
import styles from '../../assets/jss/SearchBarNavigationBarStyle';

/**
 * The Search Bar for Navigation Bar component.
 * @param {object} props the given properties.
 * @returns {JSX} Search Bar  Navigation Bar component.
*/
const SearchBar = (props) => {

    const { classes, value, handleClickSearch } = props;

    /**
     * Calls the parent component's function onChange() with new search value.
     * @param {object} event the written search value.
    */
    const handleChange = (e) => {
        props.onChange(e.target.value);
    }

    /**
     * Calls the parent component's function onKeyDown() to search new results
     * @param {object} event the written search value.
    */
    const handleKeyDown = (e) => {
        props.onKeyDown(e);
    }

    return (
        <div style={styles.root}>
            <TextField
                onKeyDown={e => handleKeyDown(e)}
                onChange={e => handleChange(e)}
                id="outlined-full-width"
                style={{ margin: 8, borderColor: "grey" }}
                placeholder="Search for documents"
                fullWidth
                margin="normal"
                variant="outlined"
                defaultValue={value}
                InputProps={{
                    classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle search"
                            onClick={handleClickSearch}
                          >
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      ),
                }}
            />
        </div>
    );
}

export default withStyles(styles)(SearchBar);