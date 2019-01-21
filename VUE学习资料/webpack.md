---
title: Webpack
date: 2018-09-05 00:00:00 
categories: Webpack
tags: Webpack
description: Webpack常用配置
---

vue-cli写完的静态页面我们在node环境中引入没有问题，但是打包后放在服务环境下，路径却有问题了

如一个简单css语句

```
.welcome { width: 420px; height: 235px; background: url(../img/welcome.jpg) 0 0 no-repeat;
```

解决的办法很简单

build路径下utils.js文件

```
// Extract CSS when that option is specified



    // (which is the case during production build)



    if (options.extract) {



      return ExtractTextPlugin.extract({



        use: loaders,



        fallback: 'vue-style-loader',



        publicPath:'../../'            //添加此代码！！！



      })



    } else {



      return ['vue-style-loader'].concat(loaders)
```