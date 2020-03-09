import React, { useState, useEffect } from "react";
import "./App.scss";
import { soundClassifier } from "ml5";

function App() {
	const [username, setUsername] = useState("");
	const [loginWindow, setLoginWindow] = useState(false);

	const gotResult = (error, result) => {
		if (error) {
			console.log(error);
			return;
		}
		// log the result
		console.log(result);
		if (result[0].label === "Hello") {
			setLoginWindow(true);
		}
	};

	const formSubmit = event => {
		event.preventDefault();
		setLoginWindow(!loginWindow);
	};

	useEffect(() => {
		const loginDetection = new soundClassifier(
			"https://teachablemachine.withgoogle.com/models/IoAT1PCX/",
			{ probabilityThreshold: 0.85 },
			modelReady
		);
		// const loginDetection = new soundClassifier(
		// 	"http://localhost:3000/models/hello-bye-v1/model.json",
		// 	{ probabilityThreshold: 0.85 },
		// 	modelReady
		// );

		function modelReady() {
			// classify sound
			loginDetection.classify(gotResult);
		}
	}, []);

	return (
		<div className="App">
			<h1>Voice login</h1>
			{loginWindow && (
				<section className="login-window">
					<h2>Please login with any username and password</h2>
					<form onSubmit={formSubmit}></form>
					<input
						onChange={e => setUsername(e.target.value)}
						value={username}
						type="text"
						placeholder="Username"
					/>
					<input type="password" placeholder="Password" />
					<input type="submit" />
				</section>
			)}
		</div>
	);
}

export default App;
