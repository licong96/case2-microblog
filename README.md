# 案例-Koa2框架生态模拟新浪微博

## 课程流程

- 使用koa2脚手架工具创建项目
- 添加`corss-env`工具用来区分环境，添加`cross-env NODE_ENV=dev|production`
- 重构页面结构
- mysql下载安装、接入、建库、建表
- sequelize工具
- 数据库连接池机制
- redis & cookie 和 session
- jwt做登录 & 客户端存储用户信息
- koa2开发环境搭建
- jest单元测试
- [技术方案设计](#技术方案设计)
- [功能列表](#功能列表)
- 用户管理

## 技术选型

- 框架 koa2
- 数据库 mysql
- 缓存数据库 redis
- 登录技术 session cookie | jwt
- 前端渲染引擎 ejs
- 单元测试 jest
- 数据库操作 sequelize

## koa2路由

- `get`请求获取参数: `ctx.request.params`
- `post`请求获取参数: `ctx.request.body`


动态路由参数`:userName`:
```js
router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    userName
  }
})
// 多个参数
// router.get('/profile/:userName/:pageIndex', async (ctx, next) => {})
```

## ejs渲染引擎

[文档地址](https://ejs.bootcss.com/)

- `locals`：所有局部数据将存储在`locals`对象上，使用`locals.undefined`可以防止字段未定义报错

## mysql

- 下载、安装、建库
- 建表、sql
- 外键、连表查询

### 建表 

建立users表、建立blogs表

### 外键

- 创建外键
- 更新限制 & 删除级联
- 连表查询

创建成功之后，会有`FOREIGN KEY`标识，数据的更新被受到限制，数据的删除会同步。

**级联：**

设置更新时和删除时的值为`CASCADE`

**ER图：**

用图来表示 `blogs - userid` 外键到 `users - id`

### 连表查询

> 没有外键也是可以用的，但一般情况下都是联合起来使用

使用`inner join`：
```sql
select * from blogs inner join users on blogs.userid = users.id;
```

## Sequelize

[使用文档地址Sequelize](../database/sequelize.md)

## 数据库连接池

线上环境使用：
```js
const conf = {
	host: 'localhost',
	dialect: 'mysql'
}
// 连接池
conf.pool = {
	max: 5,	// 连接池中最大的连接数量
	min: 0,	// 最小数量
	idle: 10000, // 如果一个连接池 10s 之内没有被使用，则释放
}
const seq = new Sequelize('case2-microblog', 'root', '123456', conf)
```

## redis

安装依赖：
```bash
yarn add redis koa-redis koa-generic-session
```

配置：
```js
const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
  console.error('redis error', err);
});
```

### session配置

```js
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

app.keys = ['UIsdf_7878#$']
app.use(session({
    key: 'weibo.sid', // cookie name 默认是 `koa.sid`
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000  // 单位 ms
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))
```

## jwt

- json web token
- 用户认证成功之后，server端返回一个加密的token给客户端
- 客户端后续每次请求都带token，以示当前的用户身份

安装使用`koa-jwt`：
```bash
yarn add koa-jwt
```

安装使用加密工具`jsonwebtoken`：
```bash
yarn add jsonwebtoken
```

后续接口请求在要`headers`中添加`Authorization = Bearer ***`

### jwt和session的对比

- 都是为了解决：登录 & 存储登录用户的信息
- jwt用户信息加密存储在客户端，不依赖cookie，可跨域
- session用户信息存储在服务端，依赖cookie，默认不可跨域
- 大型系统中两者可共用
- jwt更适合于服务节点较多，跨域比较多的系统
- session更适合统一的web服务

## koa2开发环境搭建

- 配置 eslint，以及pre-commit限制提交
- inspect 调试
- 404页和错误页

### inspect调试

在`package.json - scripts`中添加`--inspect=9229`：
```
"dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon --inspect=9229 bin/www",
```

在代码中添加`debugger`就可以在浏览器DevTools中调试node。

### jest单元测试

[文档地址](https://www.jestjs.cn/)

- 常用的断言
- 测试http接口

安装`supertest`测试http接口：
```bash
yarn add supertest -D
```

使用：
```js
const request = require('supertest');
const server = require('../src/app').callback();

const http = request(server);

test('string 接口返回', async () => {
  const res = await http.get('/string');
  expect(res.body).toEqual({
    title: 'koa2 string'
  })
})
```

## 技术方案设计

- 架构设计
- 页面路由和API设计
- 数据模型设计

### 架构设计图
![image](./case2-1.png)

- routers：只负责接收参数和派发数据，校验入参规则，校验登录
- controller：负责页面逻辑处理，调用services获取数据，统一返回格式
- services：负责数据处理，操作数据库增删改查，数据格式化的处理
- cache: 缓存公共的数据到redis中

### 页面路由和API设计

routes：
- `routes -> api`负责接口
- `routes -> view`负责页面

页面：
- 注册页面 - /register
- 登录 - /login
- 首页 - /
- 个人主页 - /profile/:userName
- at页 - /atMe
- 广场 - /square
- 设置 - /setting
- 错误页 - /error
- 404 - /*

**注册页面**
- 注册接口：`/api/user/register`
- 校验用户名是否存在：`/api/user/isExist`

**登录页面**
- 登录：`api/user/login`

**用户信息设置页面**
- 修改用户信息：`/api/user/changeInfo`
- 修改密码：`/api/user/changePassword`
- 图片上传：`/api.utils/upload`
- 退出登录： `/api/user/logout`

**首页**
- 创建微博：`/api/blog/create`
- 加载更多: `/api/blog/loadMore/:pageIndex`

### 数据模型设计

- 回顾ER图
- 关系型数据库的三大范式
- 数据模型设计

**回顾ER图**
![ER图](./case2-3.png)

**关系型数据库的三大范式**
1. 属性的原子性：每一列都不可再拆解
2. 记录的唯一性：有唯一主键，其他属性都依赖于主键
3. 字段的冗余性：不存在数据冗余和传递依赖

**数据模型设计**
![image](./case2-4.png)

## 功能列表

- 用户管理
- 用户设置
- 创建微博
- 个人主页
- 广场页
- 关注和取消关注
- 首页
- `@`和回复
- `@`提到我的

### 用户管理模块

1. 页面路由和模板
2. 数据建模
3. 开发注册功能
4. 开发登录功能
5. 抽离登录验证中间件
6. 单元测试

#### 1. 页面路由和模板

回顾技术方案，添加用户管理模块的前端view路由，主要用来渲染页面

#### 2. 数据建模

回顾技术方案，使用`sequelize.define`创建表模型，添加字段和约束，执行`sync`

#### 3. 开发注册功能

回顾技术方案，开发注册接口，密码加密和用户信息校验

- 加密工具：`crypto` 
- `json-schema`校验入参规则；使用工具：`ajv`
- [json-schema 约束条件](https://blog.csdn.net/tjj3027/article/details/107376215)

### 用户设置模块

1. 页面：模板和路由
2. 开发接口：修改信息、修改密码、退出登录、图片上传

### 图片上传功能

使用插件：
- formidable-upload-koa: 上传文件
- fs-extra: 操作文件

#### 使用统一文件服务

- 图片服务器，云服务，CDN

### 创建微博

- 数据建模，外键关联
- 创建页面和模板
- 预防xss攻击
- 数据格式校验，在插入数据库之前需要做
- 单元测试，运行之前用例，再开发新用例

### 广场页

- 使用`cache`缓存广场数据

### 关注和取消关注

- 1.创建数据模型：用户关系
- 2.路由和接口开发


#### 1.创建数据模型

1. 回顾数据模型设计
2. 开发数据模型
3. 执行`sync.js`同步到数据库

## 注意点

- `services`和`controller`模块有不同的关注点，不一定是完全对应的关系，里面的函数甚至字段名都可能不一样，都有自己的关注点。


### 难点

- 数据模型设计，关联，多表查询


