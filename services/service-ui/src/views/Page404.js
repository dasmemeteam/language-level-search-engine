import React from 'react';
import { Typography } from "@material-ui/core";
import NavigationBar from "../components/NavigationBar";
import '../assets/css/Page404Style.css';
import HeaderTags from '../components/HeaderTags';


/**
 * The Page404 view.
 * @returns {JSX} Page404 view components jsx.
 */
const Page404 = () => (
    <div >
        <HeaderTags
            title="Elaisa Search Engine - Not Found"
            desc="Sorry, but there is no page with this path."
            keywords="Not Found, 404, Error"
        />
        <NavigationBar
            id="navBar"
        />
        <div id="root-404">
            <Typography id="typo" variant="h3">
                404 Page not found
        </Typography>
            <Typography id="typo" variant="title">
                Sorry, but I can't find this page.
          </Typography>
            <div id="gif">
                <iframe src="https://giphy.com/gifs/X2iqesUkZULQs/html5" frameBorder="0" title="Not found"></iframe>
            </div>
        </div>
    </div>

);

export default Page404;