import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFeedbacks } from '../store/feedbackSlice';
import FeedbackTableHead from './FeedbackTableHead';
import { Rating } from '@material-ui/lab';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    afterAvatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));







function FeedbackTable(props) {
    const dispatch = useDispatch();
    const feedbacks = useSelector(selectFeedbacks);
    const searchText = useSelector(({ feedbackApp }) => feedbackApp.feedbacks.searchText);
    const filterStars = useSelector(({ feedbackApp }) => feedbackApp.feedbacks.filterStars);
    const filterDate = useSelector(({ feedbackApp }) => feedbackApp.feedbacks.filterDate);
    const user = useSelector(({ auth }) => auth.user);
    const classes = useStyles();

    const [userMenu, setUserMenu] = useState(null);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(feedbacks);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: '',
        id: ''
    });



    useEffect(() => {
        if (filterDate && searchText && filterStars) {
            let fromDate = new Date(JSON.parse(filterDate).from);
            let untilDate = new Date(JSON.parse(filterDate).until);
            setData(_.filter(feedbacks, item => {
                let itemDate = getDate(item.timestamp);
                if ((itemDate >= fromDate && itemDate <= untilDate) && (item.comment.toLowerCase().includes(searchText.toLowerCase())) && (item.rating == parseInt(filterStars))) {
                    return true;
                }
                else { return false; }
            }));
            setPage(0);
        }
        else if (filterDate && filterStars) {
            let fromDate = new Date(JSON.parse(filterDate).from);
            let untilDate = new Date(JSON.parse(filterDate).until);
            setData(_.filter(feedbacks, item => {
                let itemDate = getDate(item.timestamp);
                if ((itemDate >= fromDate && itemDate <= untilDate) && (item.rating == parseInt(filterStars))) {
                    return true;
                }
                else { return false; }
            }));
            setPage(0);
        }
        else if (searchText) {
            setData(_.filter(feedbacks, item => item.comment.toLowerCase().includes(searchText.toLowerCase())));
            setPage(0);
        } else if (filterStars) {
            setData(_.filter(feedbacks, item => (item.rating == parseInt(filterStars))));
            setPage(0);
        } else if (filterDate) {
            let fromDate = new Date(JSON.parse(filterDate).from);
            let untilDate = new Date(JSON.parse(filterDate).until);
            setData(_.filter(feedbacks, item => {
                let itemDate = getDate(item.timestamp);
                if (itemDate >= fromDate && itemDate <= untilDate) {
                    return true;
                }
                else { return false; }
            }));
            setPage(0);
        }
        else {
            setData(feedbacks);
        }
    }, [feedbacks, searchText, filterStars, filterDate]);


    useEffect(() => {
        handleRequestSort('', 'timestamp', 'desc');
    }, []);


    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    function handleRequestSort(event, property, direction) {
        const id = property;
        setOrder({
            direction,
            id
        });
    }





    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }

    function handleClick(item) {
        props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    }

    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }


    function getDate(props) {
        var utcDate = props;
        utcDate = utcDate.substring(0, utcDate.indexOf('+'));
        utcDate = utcDate + 'Z';
        let date = new Date(utcDate);
        return date;
    }
    function getDatetoString(props) {
        let date = getDate(props);
        return (date.toLocaleString());
    }


    function getFirstLetter(props) {
        if (props != null) {
            props = props.toLocaleUpperCase()
            return props.charAt(0);
        }
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <FeedbackTableHead
                        numSelected={selected.length}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />
                    <TableBody>
                        {_.orderBy(
                            data,
                            [
                                o => {
                                    return o[order.id];
                                }

                            ],
                            [order.direction]
                        )
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(n => {
                                const isSelected = selected.indexOf(n.id) !== -1;
                                return (
                                    <TableRow
                                        className="h-64 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={isSelected}
                                        onClick={event => handleClick(n)}
                                    >
                                        {/* <TableCell className="w-40 md:w-64 text-center" padding="none">
                                            <Checkbox
                                                checked={isSelected}
                                                onClick={event => event.stopPropagation()}
                                                onChange={event => handleCheck(event, n.id)}
                                            />
                                        </TableCell> */}

                                        {/* <TableCell
                                            className="w-52 px-4 md:px-0"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            {n.images.length > 0 && n.featuredImageId ? (
                                                <img
                                                    className="w-full block rounded"
                                                    src={_.find(n.images, { id: n.featuredImageId }).url}
                                                    alt={n.name}
                                                />
                                            ) : (
                                                <img
                                                    className="w-full block rounded"
                                                    src="assets/images/ecommerce/product-image-placeholder.png"
                                                    alt={n.name}
                                                />
                                            )}
                                        </TableCell> 
                                        TEMPLATE FOR IMAGE ADD IF NEEDED*/}

                                        <TableCell className="p-20 md:p-32" component="th" scope="row">
                                            <div className={classes.root}>
                                                <div className="px-15">
                                                    {user.photoURL ? (
                                                        <Avatar className="sm:mx-4" alt="user photo" src={n.photoURL} />
                                                    ) : (
                                                        <Avatar className="sm:mx-2">{getFirstLetter(n.issuedBy)}</Avatar>
                                                    )}
                                                    <Typography component="span" variant="overline" >
                                                        {n.issuedBy}
                                                    </Typography>
                                                </div>
                                                {(n.rating) && (
                                                    <div>
                                                        <Typography component="div" className="text-11 capitalize" color="textSecondary">
                                                            Written for {n.standName} at {getDatetoString(n.timestamp)}
                                                        </Typography>
                                                        <Rating name="customized-10" value={n.rating} max={10} readOnly />
                                                        <Typography component="div" className="normal-case flex">{n.comment}</Typography>
                                                    </div>//here was rendered STARS + RATING NUMBER
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                className="flex-shrink-0 border-t-1"
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(FeedbackTable);
