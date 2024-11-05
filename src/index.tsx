import {createRoot} from "react-dom/client";
import {App} from "@/App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/redux/store";

const root = document.getElementById('root')

if (!root) {
	throw new Error('root not found')
}

const container = createRoot(root)

container.render(
	<BrowserRouter>
		<Provider store={store}>
			<App/>
		</Provider>
	</BrowserRouter>
)