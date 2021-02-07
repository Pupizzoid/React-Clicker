import {
	ADD_USER_NAME,
	SET_COUNT_CLICK,
	SET_COUNT_SECONDS,
	START_TIMER,
	RESET_TIMER,
	UPDATE_GAME_RESULTS,
	SET_COUNT_LEFT_SECONDS
} from './actionsTypes';

export const addUserNameAction = (data) => ({
	type: ADD_USER_NAME,
	payload: {
		data
	}
});

export const setCountClicksAction = (data) => ({
	type: SET_COUNT_CLICK,
	payload: {
		data
	}
})

export const setCountSecondsAction = (data) => ({
	type: SET_COUNT_SECONDS,
	payload: {
		data
	}
})

export const setCountLeftSecondsAction = (data) => ({
	type: SET_COUNT_LEFT_SECONDS,
	payload: {
		data
	}
})

export const startTimerAction = () => ({
	type: START_TIMER
})

export const resetTimerAction = () => ({
	type: RESET_TIMER
})

export const updateGameResultsAction = () => ({
	type: UPDATE_GAME_RESULTS
})