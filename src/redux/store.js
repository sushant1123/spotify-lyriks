import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { shazamCoreApi } from "./services/shazamCoreAPi";

export const store = configureStore({
	reducer: {
		player: playerReducer,
		[shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
