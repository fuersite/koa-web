# webpack-koa-mongodb

------

项目根据[Koa2进阶学习笔记 ](https://www.bookstack.cn/read/koa2-note/README.md)教程以及相关demo搭建而成。刚开始学习koa，觉得这个教程很不错，适合入门。同时也感谢原作者的分享。

------
想看教程的同学可以访问一下链接：
[Koa2进阶学习笔记]：https://www.bookstack.cn/read/koa2-note/README.md
源项目地址：https://github.com/ChenShenhai/koa2-note/blob/master/demo/project

------

# 学习后收获
通过教程可以很详细的了解koa是如何运作起一个web网站的。中间涉及到很多http请求处理、中间件、cookie&session、数据库操作、登录逻辑、文件上传、静态文件处理、视图文件操作、webpack搭建react前端项目。


# 丰富的demo

通过作者提供的一些demo可以更加深入的理解学习的内容。


# 我为什么还要把原作者项目重新玩一遍。

作者提供的项目并非全部都有讲解，自己走一遍流程，才能有一个系统性的概念，了解开发流程，架构是非常重要的。虽然以作者项目为基础，但是中间还是改变替换了不少。

### 具体改动：

> * 部分第三方库替换,比如babel、session
> * 使用mongodb替换mysql
> * 自定义session存储在mongodb工具类，把session存放到mongodb
> * 前端使用webpack搭建的react项目，在原来的基础上添加了webpack-dev-server 利于前端调试界面，分离开发。


### 项目启动

1、dev启动

```
// 前端启动并不生成dist文件
$ npm run dev:static

// server启动(视图调用了前端dist文件，启动之前需要编译前端代码生成dist)
$ npm run dev:server 
```

2、prod启动

```
// 前端编译生成dist文件
$ npm run build:static

// 同上dev启动
$ npm run build:server 
```
