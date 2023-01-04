import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

	const { nume, email, prenume} = data.data;

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
								<Typography className="font-bold mb-4 text-15">Prenume</Typography>
								<Typography>{prenume}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Nume</Typography>
								<Typography>{nume}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Email</Typography>
								<Typography>{email}</Typography>
							</div>

						</CardContent>
					</Card>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default AboutTab;
