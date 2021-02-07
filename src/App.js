import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import GamePage from './components/GamePage/GamePage';
import TablePage from './components/TablePage/TablePage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	app: {
		padding: '50px 0 0 0',
		'& h1': {
			textAlign: 'center'
		}
  },
}));

const App = () => {
	const classes = useStyles();

	return (
		<div className={classes.app}>
		<h1>Clicker</h1>
			<Switch>
				<Route path="/" component={WelcomePage} exact />
				<Route path="/game" component={GamePage} exact />
				<Route path="/table" component={TablePage} exact />
				<Redirect to="/" />
				</Switch>
		</div>
  );
};

export default App;
