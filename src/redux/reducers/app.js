import {
	ADD_USER_NAME,
	SET_COUNT_CLICK,
	SET_COUNT_SECONDS,
	START_TIMER,
	RESET_TIMER,
	UPDATE_GAME_RESULTS,
	SET_COUNT_LEFT_SECONDS
} from '../actionsTypes';

import { saveResults, getResults } from '../../storage';

let initialState = {
	userData: {
		userName: '',
		clicks: 0,
		seconds: 5,
		isActive: false,
		leftSeconds: 5
	},
	gameResults: getResults()
};

const app = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_USER_NAME:
			return ({
				...state,
				userData: {
					...state.userData,
					userName: payload.data
				}
			});
		case SET_COUNT_CLICK:
			return ({
				...state,
				userData: {
					...state.userData,
					clicks: payload.data
				}
			});
		case SET_COUNT_SECONDS:
			return ({
				...state,
				userData: {
					...state.userData,
					seconds: payload.data,
					leftSeconds: payload.data,
				}
			});
		case SET_COUNT_LEFT_SECONDS:
			return ({
				...state,
				userData: {
					...state.userData,
					leftSeconds: payload.data
				}
			});
		case START_TIMER:
			return ({
			...state,
				userData: {
					...state.userData,
					isActive: true
				}
			});
		case RESET_TIMER:
			return ({
				...state,
				userData: {
					...state.userData,
					isActive: false,
					clicks: 0,
					seconds: 5,
					leftSeconds: 5
				},
			});
		case UPDATE_GAME_RESULTS:
			const { userName, clicks, seconds } = state.userData;
			saveResults({userName, clicks, seconds});
			return ({
				...state,
				gameResults: getResults()
			});
		default:
			return state;
	}
}

export default app;