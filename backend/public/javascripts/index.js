function getPowerpoint(width, height, div) {
	const frame = document.createElement('iframe');
	let url =
		'https://docs.google.com/presentation/d/e/2PACX-1vTHFVa5yKABK-3QfrExTVQmOmR5OcYu-pg1GkjPUmc78ZDuJSHNLObSahcsJdQVNA/embed?start=true&loop=false&delayms=30000';
	frame.src = url;
	frame.width = width;
	frame.height = height;
	document.getElementById(div).appendChild(frame);
}
