const { exec } = require('child_process');

module.exports = file => {
	const commend = `cd /D ${file} && code .`;
	exec(commend, (err, stdout, stderr) => {
		if (err) {
			console.log(stderr);
		} else {
			console.log(`项目已打开`);
		}
	});
};