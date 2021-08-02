## uct-cli命令详解

- 局部安装，先cd到uct-cli目录下
```
npm link 
uct -h
```

- 全局安装，直接使用
```
uct -h
```

- 创建页面
```
<!-- 选择创建项目类型 -->
uct created
<!-- 直接创建项目，默认创建uni-app脚手架项目 -->
uct created [name]
```

- 创建模板页面(type:form/list/details)
```
uct plop createdPage [name] [type]
```
