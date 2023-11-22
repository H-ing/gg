# gg-cli
vue项目脚手架，基于webpack，为方便掌控相关配置并提供默认最佳实践

# gg-cli开发记录
## 开始
1. 创建项目
```sh
mkdir gg-cli
cd gg-cli
npm init -y
mkdir bin
touch bin/index.js
```

2. 修改package.json，添加bin配置
```json
{
  "name": "gg-cli",
  "version": "1.0.0",
  "description": "a cli for vue project",
  "main": "index.js",
  "bin": {
    "gg": "./bin/index.js"
  },
  ....
}

```
3. 在bin/index.js文件中添加代码
```js
#!/usr/bin/env node

console.log('gg for vue project!!')
```
> 注意文件头部 `#!/usr/bin/env node`必须要加，否则运行会报错

4. 本地安装
在gg-cli目录下执行
```sh
npm link
```

5. 测试
```sh
λ gg
gg for vue project!!
```