import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getretete, selectretete } from '../store/reteteSlice';
import ReteteTableHead from './ReteteTableHead';

function ReteteTable(props) {
	const dispatch = useDispatch();
	const retete = useSelector(selectretete);
	const searchText = useSelector(({ reteteApp }) => reteteApp.retete.searchText);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(retete);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getretete());
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(retete, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(retete);
		}
	}, [retete, searchText]);

	function handleRequestSort(event, property) {
		property = property.toLowerCase();
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

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
		props.history.push(`/apps/reteteApp/retete/${item.id}`);
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

	function priceRangeCalculator(priceRange) {
		let priceString = '';
		for (let i = 0; i < priceRange; i++) {
			priceString += '$';
		}
		return priceString;
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<ReteteTableHead
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
									// console.log(o);
									// console.log(order);
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
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell>

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
													alt={n.denumire}
												/>
											) : (
												<img
													className="w-full block rounded"
													src="assets/images/ecommerce/product-image-placeholder.png"
													alt={n.denumire}
												/>
											)}
										</TableCell> */}

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.denumire}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.descriere}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											{priceRangeCalculator(n.priceRange)}
											{/* {} */}
										</TableCell>

										<TableCell
											className="p-4 md:p-16 truncate"
											component="th"
											scope="row"
											align="right"
										>
											{n.calorii}
										</TableCell>
										{/*<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											{n.quantity}
											<i
												className={clsx(
													'inline-block w-8 h-8 rounded mx-8',
													n.quantity <= 5 && 'bg-red',
													n.quantity > 5 && n.quantity <= 25 && 'bg-orange',
													n.quantity > 25 && 'bg-green'
												)}
											/>
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											{n.active ? (
												<Icon className="text-green text-20">check_circle</Icon>
											) : (
												<Icon className="text-red text-20">remove_circle</Icon>
											)}
										</TableCell> */}
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

export default withRouter(ReteteTable);
