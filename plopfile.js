const fs = require('fs');
module.exports = plop => {
	// 创建组件与md
	plop.setGenerator('componentDocs', {
		description: 'create a component',
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
	// 创建配置文件
	plop.setGenerator('config', {
		description: 'create a config',
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
		description: 'create a config',
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
	plop.setGenerator('createdPage', {
		description: 'create a page',
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
		actions: function (data) {
			let path = '';
			if (fs.existsSync('src')) {
				path = 'src/';
			}
			const list = [
				{
					type: 'add',
					path: `${path}pages/{{type}}/{{name}}.vue`,
					force: true,
					templateFile: 'plop-templates/page/{{type}}.vue.hbs',
				},
				{
					type: 'add',
					path: `${path}pages/{{type}}/{{name}}.json`,
					force: true,
					templateFile: 'plop-templates/page/{{type}}.json.hbs',
				},
				{
					type: 'modify',
					path: `${path}pages.json`,
					force: true,
					pattern: /\/\/ 该注释是用来创建页面的，不可删除！/gi,
					templateFile: 'plop-templates/page/pages.json.hbs',
				},
			];
			return list;
		},
	});
};
