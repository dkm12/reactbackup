import _ from '@lodash';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import dateFunc from '@common/utils/dateFunc';
import history from '@history';
import SmartForm from '@smart-form';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import masterApi from '@common/utils/masterApi';
import { Label, GetLabel } from '@common/utils/label';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

function ApprCard(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [orgValue, setOrgValue] = useState([]);
	const [masterDataLoad, setMasterDataLoad] = useState(false);

	useEffect(() => {
		async function getMaster() {
			if (masterDataLoad) { return; }
			let orgList = await masterApi.getOrganizationalValues();
			console.log(orgList.data)
			// return;
			for await (let item of orgList.data) {
				setOrgValue(orgValue => [...orgValue, { title: item.orgValName, value: item.orgValCode }]);
			}
			await setMasterDataLoad(true);
		}
		getMaster();
	}, [dispatch])

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },

				fields: [
					{
						type: 'text',
						name: 'empCode',
						id: 'empCode',
						title: GetLabel('BL00101'),
						disabled: true
					},
					{
						type: 'text',
						name: 'officialEmailId',
						id: 'officialEmailId',
						title: GetLabel('BL00082'),
						disabled: true
					},
					{
						type: 'text',
						name: 'dptCode',
						id: 'dptCode',
						title: GetLabel('BL00073'),
						disabled: true
					},
					{
						type: 'text',
						name: 'locCode',
						id: 'locCode',
						title: GetLabel('BL00074'),
						disabled: true
					},
					{
						type: 'select',
						name: 'orgValues',
						id: 'orgValues',
						options: orgValue,
						title: GetLabel('BL00229'),
					},
					{
						type: 'text',
						name: 'message',
						id: 'message',
						title: GetLabel('BL00230'),
					},
				]
			}

		]
	};
	async function onSubmit(event) {
		console.log(event)
	}
	function onCancel() {
		history.goBack();
	}

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						A
					</Avatar>
				}
				title={props.data[0].fullname}
				subheader={props.data[0].dsgCode}
			/>
			<div className="p-16 sm:p-24">
				<SmartForm
					defaultValues={props.data[0]}
					template={template}
					watchFields={['fullName']}
					onSubmit={onSubmit}
					onCancel={onCancel}
					buttons={['send']}
				/>
			</div>
		</Card>
	);
}

export default withRouter(ApprCard);