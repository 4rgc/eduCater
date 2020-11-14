function addCourse() {
	let name, code;

	httpPostAsync('/api/addCourse', `name=${name}&code=${code}`, (res) => {
		console.log('got the response: ' + res);
	});
}
