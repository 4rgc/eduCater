function addCourse() {
	let name, code;

	httpPostAsync('/api/addCourse', `name=${name}&code=${code}`, (res) => {
		console.log('got the response: ' + res);
	});
}

function changePLink() {}

function getPLink() {
	let id = 0;

	httpGetAsync(`/api/getPLink?id=${id}`, (res) => {
		console.log('got the response: ' + res);

		let obj = JSON.parse(res);
		if (!obj['success']) throw new Error('Wrong id');

		let iframe = document.createElement('iframe');
		iframe.src = obj.link;
		iframe.type = 'application/pdf';
		document.getElementById('container').appendChild(iframe);
	});
}

function addTeacher() {
	firebase
		.auth()
		.currentUser.getIdToken()
		.then((token) => {
			let name = 'Bro Broski';

			httpPostAsync(
				'/api/addTeacher',
				`name=${name}&token=${token}`,
				(res) => {
					console.log('got the response: ' + res);
				}
			);
		});
}

function onLogin() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
			console.error(errorCode + ': ' + errorMessage);
		});
}

function onLogout() {
	let currentUser = firebase.auth().currentUser;

	if (currentUser) {
		currentUser.getIdToken().then((idToken) => {
			httpPostAsync('/logout', 'token=' + idToken, () => {});
		});
	}
	firebase
		.auth()
		.signOut()
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
			console.error(errorCode + ': ' + errorMessage);
		});
}

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		user.getIdToken().then(function (idToken) {
			httpPostAsync(
				'/login',
				`token=${idToken}&email=${user.email}`,
				() => {}
			);
		});
		document.getElementById('message').innerHTML = 'Welcome, ' + user.email;
	} else {
		document.getElementById('message').innerHTML = 'No user signed in.';
	}
});
