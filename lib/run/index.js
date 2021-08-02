const { exec } = require('child_process');

module.exports = type => {
	const commend = `npm run dev:${type}`;
	exec(commend, (err, stdout, stderr) => {
		if (err) {
			console.log(stderr);
		} else {
			console.log(`项目已启动`);
		}
	});
};
