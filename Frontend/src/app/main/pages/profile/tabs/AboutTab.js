import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as apiSpec from '../../../../apiSpec';


function AboutTab() {
	const [data, setData] = useState(null);

	useEffect(() => {
		axios.get(apiSpec.PROFILE).then(res => {
			setData(res.data);
		});
	}, []);

	if (!data) {
		return null;
	}

	const { city, country, email, name} = data;

	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<Card className="w-full mb-16 rounded-8">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									General Information
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Name</Typography>
								<Typography>{name}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Email</Typography>
								<Typography>{email}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">City</Typography>
								<Typography>{city}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Country</Typography>
								<Typography>{country}</Typography>
							</div>
						</CardContent>
					</Card>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default AboutTab;