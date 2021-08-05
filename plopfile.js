const fs = require('fs');
module.exports = plop => {
	// 创建文档组件与md
	plop.setGenerator('componentDocs', {
		description: '创建文档组件与md',
		prompts: [
			{
				type: 'input',
				name: 'name',
				default: 'MyComponent',
			},
			{
				type: 'input',
				name: 'disName',
				default: 'MyComponent',
			},
			{
				type: 'input',
				name: 'file',
				default: '',
			},
		],
		actions: [
			{
				type: 'add',
				path: `{{file}}components/{{name}}/{{name}}.vue`,
				force: true,
				templateFile: 'plop-templates/componentDocs/component.vue.hbs',
			},
			{
				type: 'add',
				path: `{{file}}components/{{name}}/{{name}}.md`,
				force: true,
				templateFile: 'plop-templates/componentDocs/component.md.hbs',
			},
		],
	});
	// 创建文档配置文件
	plop.setGenerator('config', {
		description: '创建文档配置文件',
		prompts: [
			{
				type: 'input',
				name: 'name',
				default: 'MyComponent',
			},
			{
				type: 'input',
				name: 'github',
				default: 'github',
			},
			{
				type: 'input',
				name: 'gitee',
				default: 'gitee',
			},
		],
		actions: [
			{
				type: 'modify',
				path: `{{file}}docs/.vuepress/config.js`,
				force: true,
				templateFile: 'plop-templates/config/config.js.hbs',
			},
		],
	});
	// 创建组件
	plop.setGenerator('component', {
		description: '创建组件',
		prompts: [
			{
				type: 'input',
				name: 'name',
				default: 'name',
			},
			{
				type: 'input',
				name: 'file',
				default: 'file',
			},
		],
		actions: [
			{
				type: 'modify',
				path: `{{file}}src/pages/index/index.vue`,
				pattern: /<uct-(.*)/gi,
				template: '<{{name}} class="mt100" v-bind="item"></{{name}}>',
			},
		],
	});
	// 创建页面
	plop.setGenerator('createPage', {
		description: '创建页面',
		prompts: [
			{
				type: 'input',
				name: 'name',
				default: 'name',
			},
			{
				type: 'input',
				name: 'type',
				default: 'details',
			},
		],
		// FIXME: -- 1.创建页面会导致pages.json中的注释消失
		actions: function (data) {
			let path = '';
			const style = {
				subPackages: [
					{
						root: `pages/${data.type}`,
						pages: [
							{
								path: `${data.name}/${data.name}`,
								name: data.name,
								style: {
									navigationBarTitleText: data.name,
								},
							},
						],
					},
				],
			};
			if (fs.existsSync('src')) {
				path = 'src/';
			}
			const { removeComment } = require('./lib/utils');
			// 1 读取pages.json文件
			fs.readFile(`${path}pages.json`, 'utf-8', (err, data1) => {
				if (!err) {
					// 2 删除其中注释，转换成js对象
					console.log(data1);
					const res = JSON.parse(removeComment(data1));
					// 3 将页面添加到js对象中
					// 3.1 如果有subPackages
					if (res.subPackages) {
						let flag = false;
						for (let i = 0; i < res.subPackages.length; i++) {
							// root为'pages/{type},就在该pages数组内添加style.subPackages[0].pages
							if (res.subPackages[i].root === `pages/${data.type}`) {
								flag = true;
								res.subPackages[i].pages.unshift(style.subPackages[0].pages);
								break;
							}
						}
						// root不为'pages/{type}',就在res.subPackages数组内添加style.subPackages[0]
						if (!flag) {
							res.subPackages.unshift(style.subPackages[0]);
						}
					} else {
						// 3.2 如果没有subPackages,直接添加style.subPackages
						res.subPackages = style.subPackages;
					}
					// 4 将js对象转为json写入pages.json
					fs.writeFile(`${path}pages.json`, JSON.stringify(res, null, 2), err => {});
					console.log(res);
				}
			});
			const list = [
				{
					type: 'add',
					path: `${path}pages/{{type}}/{{name}}/{{name}}.vue`,
					force: true,
					templateFile: 'plop-templates/page/{{type}}.vue.hbs',
				},
				{
					type: 'add',
					path: `${path}pages/{{type}}/{{name}}/{{name}}.json`,
					force: true,
					templateFile: 'plop-templates/page/{{type}}.json.hbs',
				},
				// {
				// 	type: 'modify',
				// 	path: `${path}pages.json`,
				// 	force: true,
				// 	pattern: /\/\/ 该注释是用来创建页面的，不可删除！/gi,
				// 	templateFile: 'plop-templates/page/pages.json.hbs',
				// },
			];
			return list;
		},
	});
};
