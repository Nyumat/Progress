import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Redux
import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const theme = createTheme({
	palette: {
		primary: {
			main: "#ff6f00"
		},
		white: {
			main: "#ffffff"
		},
		secondary: {
			main: "#ffcc80"
		},
		black: {
			main: "#212121"
		},
		mode: "dark"
	}
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<SnackbarProvider
						maxSnack={3}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right"
						}}>
						<App />
					</SnackbarProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
