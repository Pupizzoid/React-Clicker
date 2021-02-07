import React, { useState } from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
	form: {
		width: '400px',
		padding: '20px',
		margin: 'auto',
		boxShadow: '0 2px 4px -2px rgb(0 0 0 / 24%), 0 4px 24px -2px rgb(0 0 0 / 20%)',
		borderRadius: '5px',
	},
	btn: {
		display: 'block',
		margin: '0 auto'
	},
}));

const WelcomePage = () => {
	const classes = useStyles();
	const history = useHistory();
	const [userName, setUserName] = useState('');

	const handleChangeInput = (e) => {
		setUserName(e.target.value);
	};

	const handleSaveData = () => {
		history.push({
			pathname: '/game',
			search: `?name=${userName}`
		});
	};

	return (
		<Box className={classes.form}>
			<TextField
				id="outlined-basic"
				label="Your name"
				variant="outlined"
				placeholder="Enter your name"
				className={classes.field}
				fullWidth
				margin="normal"
				value={userName}
				onChange={handleChangeInput}
			/>
			<Button
				variant="contained"
				color="secondary"
				disabled={!userName}
				className={classes.btn}
				onClick={handleSaveData}
			>
				Go to game
			</Button>
		</Box>
	);
};

export default WelcomePage;
