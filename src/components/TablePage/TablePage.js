import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});


const TablePage = ({ appState }) => {
	const { gameResults } = appState;
	const filteredResults = gameResults.map((item) => {
		item.clicksPerSeconds = item.clicks / item.seconds;
		return item;
	});
	filteredResults.sort((a, b) => b.clicksPerSeconds - a.clicksPerSeconds);
	const classes = useStyles();
	console.log(filteredResults);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Clicks</TableCell>
						<TableCell align="right">Games time</TableCell>
						<TableCell align="right">Clicks per second</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredResults.map((user) => (
						<TableRow key={Math.random(Date.now().toString())}>
							<TableCell component="th" scope="row">
								{user.userName}
							</TableCell>
							<TableCell align="right">{user.clicks}</TableCell>
							<TableCell align="right">{user.seconds}</TableCell>
							<TableCell align="right">{user.clicksPerSeconds.toFixed(2)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		appState: state.app,
	};
};

export default connect(mapStateToProps)(TablePage);