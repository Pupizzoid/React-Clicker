import React, {useEffect, useState} from 'react';
import { Box, Button, InputLabel, Select, MenuItem, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	setCountClicksAction,
	setCountSecondsAction,
	startTimerAction,
	resetTimerAction,
	updateGameResultsAction,
	setCountLeftSecondsAction,
	addUserNameAction
} from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  gameBox: {
		width: '400px',
    padding: '20px',
    margin: 'auto',
    boxShadow: '0 2px 4px -2px rgb(0 0 0 / 24%), 0 4px 24px -2px rgb(0 0 0 / 20%)',
		borderRadius: '5px',
		display: 'flex',
		flexWrap: 'wrap',
		'& h2': {
			width: '100%',
			textAlign: 'center'
		}
	},
	btn: {
		display: 'block',
		margin: '0 auto'
	},
	boxHalfWidth: {
		width: '50%'
	},
	btnClick: {
		width: '150px',
    height: '150px',
    borderRadius: '50%',
	},
	boxAction: {
		width: '100%',
		paddingTop: '30px',
		display: 'flex',
		justifyContent: 'center'
	},
	message: {
		width: '100%',
		textAlign: 'center',
		fontSize: '20px',
		color: theme.palette.secondary.main
	}
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const GamePage = ({
	setCountClicks,
	setCountSeconds,
	startTimer,
	resetTimer,
	updateGameResult,
	appState,
	setCountLeftSeconds,
	addUserName }) => {
	
	const { userData } = appState;
	const [message, setMessage] = useState('');
	let query = useQuery();
	const history = useHistory();
	const classes = useStyles();

	const handleStart = () => {
		startTimer();
  }

	const handleReset = () => {
		resetTimer();
		setMessage('');
	}

	useEffect(() => {
		addUserName(query.get('name'));
		let interval = null;
		if (userData.isActive && userData.leftSeconds !== 0) {
			interval = setInterval(() => {
				setCountLeftSeconds(userData.leftSeconds - 1);
			}, 1000);
		} else if (userData.isActive && userData.leftSeconds === 0) {
			console.log('hi', userData.isActive , userData.leftSeconds === 0);
			setMessage(`You made ${userData.clicks} clicks!`);
			updateGameResult();
		} else {
			clearInterval(interval);
		}
		return function cleanup () {
			clearInterval(interval);
		 }
  }, [userData.isActive, userData.leftSeconds]);

	const options = [5, 10, 15];
	const optionList = options.map(option => {
		return <MenuItem key={option} value={option}>{option} sec</MenuItem>
	})
	
	const handleChangeSelect = (e) => {
		setCountSeconds(e.target.value);
	}

	const handleCountClick = () => {
		setCountClicks(userData.clicks + 1);
	}

	const handleChangePath = (path) => {
		history.push(path);
		resetTimer();
	}

	return (
		<Box className={classes.gameBox}>
			<h2>Hello, {userData.userName}!</h2>
			<p className={classes.message}>{ message}</p>
			<div className={classes.boxHalfWidth}>
				<Button
					variant="contained"
					color="secondary"
					className={classes.btnClick}
					onClick={userData.isActive ? handleCountClick : handleStart}
					disabled={userData.leftSeconds === 0}
				>
					{userData.isActive ? 'Click' : 'Start'}
				</Button>
			</div>
			<div className={classes.boxHalfWidth}>
				<InputLabel htmlFor="time-select">Choose a time</InputLabel>
        <Select
          value={userData.leftSeconds}
					onChange={handleChangeSelect}
					labelId='time-select'
					name='time'
					fullWidth
					disabled={userData.isActive}
        >
        {optionList}
				</Select>
				<p>Timer: { userData.leftSeconds}</p>
				<p>Count of clicks: {userData.clicks}</p>
			</div>
			<div className={classes.boxAction}>
				<ButtonGroup
					size="medium"
					color="primary"
					aria-label="large outlined primary button group"
					className={classes.btnGroup}
				>
					<Button onClick={() => handleChangePath('/')}>Change Name</Button>
					<Button onClick={() => handleChangePath('/table')}>See Result</Button>
					<Button onClick={handleReset}>Reset</Button>
				</ButtonGroup>
			</div>
		</Box>
	)
}

const mapStateToProps = state => {
	return {
		appState: state.app,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCountClicks: (data) => {
			dispatch(setCountClicksAction(data))
		},
		setCountSeconds: (data) => {
			dispatch(setCountSecondsAction(data))
		},
		setCountLeftSeconds: (data) => {
			dispatch(setCountLeftSecondsAction(data))
		},
		startTimer: () => {
			dispatch(startTimerAction());
		},
		resetTimer: () => {
			dispatch(resetTimerAction());
		},
		updateGameResult: () => {
			dispatch(updateGameResultsAction());
		},
		addUserName: (data) => {
			dispatch(addUserNameAction(data));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);