const path = require('path');
const { exec } = require('child_process');
// 交互式命令行
const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');

const download = require('../git');
const selectType = {
	'uni-app脚手架项目': 'direct:https://github.com.cnpmjs.org/crazyfdf/uctui-hbuilder-cli#master',
	'uni-app HBuilder项目': 'direct:https://github.com.cnpmjs.org/crazyfdf/uctui-hbuilder#master',
};
const question = [
	{
		name: 'name',
		type: 'input',
		message: '请输入项目名',
		validate(val) {
			if (val === '') {
				return '项目名不能为空';
			} else if (fs.existsSync(val)) {
				return '文件已存在';
			} else {
				return true;
			}
		},
	},
	{
		name: 'type',
		type: 'list',
		message: '请选择创建的项目类型',
		choices: ['uni-app脚手架项目', 'uni-app HBuilder项目'],
	},
];

module.exports = name => {
	try {
		// 解析文件路径
		// const filePath = path.join(__dirname, name);
		// console.log(filePath);
		// git克隆远程仓库地址
		if (name) {
			const commend = `git clone https://github.com.cnpmjs.org/crazyfdf/uctui-hbuilder-cli.git ${name}`;
			exec(commend, (err, stdout, stderr) => {
				if (err) {
					console.log(stderr);
				} else {
					chalk.green(`${name}项目创建成功`);
				}
			});
		} else {
			inquirer.prompt(question).then(answers => {
				const { name: projectName, type } = answers;
				const url = selectType[type];
				download(url, projectName);
			});
		}
	} catch (error) {
		next(error);
	}
};
