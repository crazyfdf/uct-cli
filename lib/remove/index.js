const fs = require('fs');
const { removeComment, rmDir } = require('../utils');
const path = require('path');
module.exports = (name, type) => {
	let src = '';
	if (fs.existsSync('src')) {
		src = 'src/';
	}
	switch (type) {
		case 'component':
			break;
		case 'page':
			fs.readFile(`${src}pages.json`, 'utf-8', (err, data) => {
				if (!err) {
					// 2 删除其中注释，转换成js对象
					const res = JSON.parse(removeComment(data));
					const subPackages = res.subPackages;
					a: for (let i = 0; i < subPackages.length; i++) {
						b: for (let j = 0; j < subPackages[i].pages.length; j++) {
							if (subPackages[i].pages[j].name === name) {
								subPackages[i].pages.splice(j, 1);
                fs.existsSync(`${src}${subPackages[i].root}/${name}`) && rmDir(`${src}${subPackages[i].root}/${name}`, () => {console.log('删除成功~');});
								break b;
								break a;
							}
						}
					}
					fs.writeFile(`${src}pages.json`, JSON.stringify(res, null, 2), err => {});
				}
			});
			break;
		case 'app':
			rmDir(`./${name}`, () => {
				console.log('删除成功~');
			});
			break;
		default:
			break;
	}
};
