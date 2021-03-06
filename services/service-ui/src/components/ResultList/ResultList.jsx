import React, { useState } from 'react';
import ResultItem from './ResultItem';
import { Typography, TableBody, TablePagination, Grid } from '@material-ui/core';
import logo from '../../assets/img/logo.png'
import { Translate } from 'react-localize-redux';
import { makeStyles, withTheme } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import WikipediaSkeleton from '../Skeleton/WikipediaSkeleton';
import ResultItemSkeleton from '../Skeleton/ResultItemSkeleton';

const useStyles = makeStyles({
    resultListRoot: {
        marginRight: isMobile ? 0 : '10vh',
        marginLeft: isMobile ? 0 : '10vh',
        marginTop: isMobile ? '10%' : '2vh'
    },
    pagination: {
        marginTop: '5%'
    },
    resultDocsLength: theme => ({
        marginLeft: '2%',
        alignItems: isMobile ? 'center' : '',
        marginBottom: isMobile ? '10%' : '4vh',
        color: theme.palette.text.primary
    }),
    paginationLogo: {
        width: isMobile ? '15%' : '5%'
    }
});

/**
 * The Result list to show all result items.
 * @param {object} props the given properties.
 * @return {JSX} Result list component.
*/
const ResultList = (props) => {

    // State for current page.
    const [page, setPage] = useState(0);
    const { theme } = props;

    const classes = useStyles(theme);

    /**
     * Sets the page state if the user clicks on the next page button.
    */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const { resultDocs, resultDocsLength, searchValue, waiting } = props;

    /**
     * Render the list given the result docs.
     * @param {object} resultDocs the found result documents.
     * @return {JSX} result list.
    */
    const renderList = (resultDocs) => {

        /**
         * Sort the result documents by its PageRank.
         * @param {object} resultDocs the found result documents.
         * @return {JSX} sorted list of resultDocs.
        */
        let resultDocsSortedByPageRank = resultDocs.slice(0);
        resultDocsSortedByPageRank.sort((a, b) => {
            let x = a.pagerank;
            let y = b.pagerank;
            return x < y ? -1 : x > y ? 1 : 0;
        });

        return <Grid
            className={classes.resultListRoot}
            container
            direction='column'
            alignItems={isMobile ? 'center' : 'stretch'}
        >
            {
                waiting
                    ?
                    <WikipediaSkeleton />
                    :
                    <Typography className={classes.resultDocsLength} variant="caption">{resultDocsLength} <Translate id='UI__RESULTS_PAGE__RESULT_COUNT' /> "{searchValue}"</Typography>
            }
            <TableBody>
                {
                    waiting
                        ?
                        // show two loading previews
                        [0, 1].map((i) => <ResultItemSkeleton key={i} />)
                        :
                        resultDocsSortedByPageRank.reverse().map(doc => (
                            <ResultItem key={doc.url} waiting={waiting} website={doc.url} title={doc.title} desc={doc.meta.desc} keywords={doc.meta.keywords} date={doc.meta.date} language={doc.meta.language} level={doc.level} level_meta={doc.level_meta} />
                        ))
                            .slice(page * 10, page * 10 + 10)
                }
            </TableBody>
            {
                waiting
                    ?
                    null
                    :
                    <Grid
                        container
                        className={classes.pagination}
                        alignItems='center'
                        direction='column'
                    >
                        <img src={logo} alt="elaisa logo" className={classes.paginationLogo} />
                        <Translate>
                            {({ translate }) => {
                                return (
                                    <TablePagination
                                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${translate('UI__RESULTS_PAGE__PAGINATION__TEXT')} ${count}`}
                                        rowsPerPageOptions={[]}
                                        component="div"
                                        count={resultDocsLength}
                                        rowsPerPage={10}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={handleChangePage}
                                    />)
                            }}
                        </Translate>
                    </Grid>
            }
        </Grid>
    }

    return renderList(resultDocs);
}

export default withTheme(ResultList);
