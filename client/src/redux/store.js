import { configureStore } from "@reduxjs/toolkit";
import { projectReducer } from "./slices.js/project";

const store = configureStore({
	reducer: {
		project: projectReducer,
	},
})

export default store