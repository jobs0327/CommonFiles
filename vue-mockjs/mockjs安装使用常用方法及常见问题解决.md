## Mock.js

### 作用

- 根据数据模板生成模拟数据
- 模拟 Ajax 请求，生成并返回模拟数据
- 基于 HTML 模板生成模拟数据

### 用法（常用）

- 浏览器

```
<script src="http://mockjs.com/dist/mock.js"></script>
```

- Node

``` 
npm install mockjs
```

### 语法规范

```shell
1. 数据模板定义 DTD（Data Temaplte Definition，DTD）
2. 数据占位符定义 DPD（Data Placeholder Definition，DPD）
```

#### DTD

- 数据模板中的每个属性由 3 部分构成：属性名、生成规则（可选）、属性值

```javascript
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

- 七种格式

```javascript
'name|min-max': value
'name|count': value
'name|min-max.dmin-dmax': value
'name|min-max.dcount': value
'name|count.dmin-dmax': value
'name|count.dcount': value
'name|+step': value

//属性值决定了最终值的初始值和类型。
```

- 生成规则
  - 属性值是字符串 **String** 
    - `'name|min-max': 'value'` 通过重复 `'value'` 生成一个字符串，重复次数大于等于 `min`，小于等于 `max`。
    - `'name|count': 'value'` 通过重复 `'value'` 生成一个字符串，重复次数等于 `count`。
  - 属性值是数字 **Number** 
    - `'name|+1': 100` 属性值自动加 1，初始值为 100
    - `'name|1-100': 100` 生成一个大于等于 1、小于等于 100 的整数，属性值 100 只用来确定类型。
    - `'name|1-100.1-10': 100` 生成一个浮点数，整数部分大于等于 1、小于等于 100，小数部分保留 1 到 10 位。
  - 属性值是布尔型 **Boolean** 
    - `'name|1': value` 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率是 1/2。
    - `'name|min-max': value` 随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。
  - 属性值是对象 **Object**
    - `'name|min-max': {}` 从属性值 `{}` 中随机选取 `min` 到 `max` 个属性。
    - `'name|count': {}` 从属性值 `{}` 中随机选取 `count` 个属性。
  - 属性值是数组 **Array**
    - `'name|1': [{}, {} ...]` 从属性值 `[{}, {} ...]` 中随机选取 1 个元素，作为最终值。
    - `'name|min-max': [{}, {} ...]` 通过重复属性值 `[{}, {} ...]` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。
    - `'name|count': [{}, {} ...]` 通过重复属性值 `[{}, {} ...]` 生成一个新数组，重复次数为 `count`。
  - 属性值是数组 **Function**
    - `'name': function(){}` 执行函数 `function(){}`，取其返回值作为最终的属性值，上下文为 `'name'` 所在的对象。

#### DPD

占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。占位符 的格式为：

```
@占位符
@占位符(参数 [, 参数])
```

**注意：**

1. 用 `@` 来标识其后的字符串是 占位符（一般用大写）。

   ```
   name: {
       first: '@FIRST',
       middle: '@FIRST',
       last: '@LAST',
       full: '@first @middle @last'
   }
   ```

2. 占位符 引用的是 `Mock.Random` 中的方法。

3. 通过 `Mock.Random.extend()` 来扩展自定义占位符。

4. 占位符可以引用并优先引用数据模板中的属性。

### Mock

- mock

  ```
  Mock.mock( rurl, rtype, function(options) )
  
  记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
  ```

- mockjax（插件库）

- tpl 【handlebars  Mustache 】

- xtpl 【KISSY XTempalte 】

- heredoc （多行html模板）

### Mock.Random **

| Type                                                  | Method                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| [Basics](http://mockjs.com/0.1/#Basics)               | [boolean](http://mockjs.com/0.1/#boolean), [natural](http://mockjs.com/0.1/#natural), [integer](http://mockjs.com/0.1/#integer), [float](http://mockjs.com/0.1/#float), [character](http://mockjs.com/0.1/#character), [string](http://mockjs.com/0.1/#string), [range](http://mockjs.com/0.1/#range), [date](http://mockjs.com/0.1/#date), [time](http://mockjs.com/0.1/#time), [datetime](http://mockjs.com/0.1/#datetime), [now](http://mockjs.com/0.1/#now) |
| [Image](http://mockjs.com/0.1/#Image)                 | [image](http://mockjs.com/0.1/#image), [dataImage](http://mockjs.com/0.1/#dataImage) |
| [Color](http://mockjs.com/0.1/#Color)                 | [color](http://mockjs.com/0.1/#color)                        |
| [Text](http://mockjs.com/0.1/#Text)                   | [paragraph](http://mockjs.com/0.1/#paragraph), [sentence](http://mockjs.com/0.1/#sentence), [word](http://mockjs.com/0.1/#word), [title](http://mockjs.com/0.1/#title) |
| [Name](http://mockjs.com/0.1/#Name)                   | [first](http://mockjs.com/0.1/#first), [last](http://mockjs.com/0.1/#last), [name](http://mockjs.com/0.1/#name) |
| [Web](http://mockjs.com/0.1/#Web)                     | [url](http://mockjs.com/0.1/#url), [domain](http://mockjs.com/0.1/#domain), [email](http://mockjs.com/0.1/#email), [ip](http://mockjs.com/0.1/#ip), [tld](http://mockjs.com/0.1/#tld) |
| [Address](http://mockjs.com/0.1/#Address)             | [area](http://mockjs.com/0.1/#area), [region](http://mockjs.com/0.1/#region) |
| [Helpers](http://mockjs.com/0.1/#Helpers)             | [capitalize](http://mockjs.com/0.1/#capitalize), [upper](http://mockjs.com/0.1/#upper), [lower](http://mockjs.com/0.1/#lower), [pick](http://mockjs.com/0.1/#pick), [shuffle](http://mockjs.com/0.1/#shuffle) |
| [Miscellaneous](http://mockjs.com/0.1/#Miscellaneous) | [guid](http://mockjs.com/0.1/#guid), [id](http://mockjs.com/0.1/#id) |

注： 

- range返回的是一个整型数据，结束位置必选（文档错误），默认从零开始

- 如果需要生成高度自定义的图片，使用Random.image()

- 随机字符【中文 + c】

  ```javascript
  Random.character() //返回一个随机字符
  ```

- 随机字符串【中文 + c】

  ```JavaScript
  Random.string() //返回一个随机字符串
  ```

- 布尔值

  ```javascript
  Random.boolean() //返回一个随机的布尔值。
  ```

- 获取一个随机格式化日期时间字符串

  ```JavaScript
  Random.datetime(formate)
  formate = 'yyyy-MM-dd HH-mm-ss' // 默认
  ```

- 自然数

  ``` javascript
  Random.natural() //0 - 9007199254740992
  ```

- 浮点数

  ```JavaScript
  Random.float(min, max, dmin, dmax) //这里整数部分表示数值，小数部分表示位数
  ```

- 中文名：

  ```javascript
  Random.chineseName(count)
  count = 1 //生成个数，默认1
  ```

- 文档地址： http://mockjs.com/0.1/#mock

### 项目配置

- 在`src`目录下创建文件夹`mock`，根据模块创建相应的`mock`文件

- 在`main.js`引入mock文件

  ```javascript
  // 引入mockjs
  require('./mock/index.js')
  ```

  

### 常见问题

- `mock` 接口 `type` 不能使用大写，大写不能被监听到

- 请求路径包含变量: 使用正则去匹配

  ```javascript
  Mock.mock(/\/api\/healthPlat\/getRecipeDetail\/\w*\/\w*/, 'get', record.getRecipeDetail);
  ```

- 在控制台 `network` 看不到请求

  ![1543305162720](C:\Users\xiaoye\AppData\Local\Temp\1543305162720.png)

  ```
  1. 源码中首先查找是否在 Mockjs 中定义了该请求，有则进行拦截，然后使用其模拟请求对象 MockXMLHttpRequest 进行响应，即此时不发送 XHR 请求；
  2. 否则使用本地标准 XHR 对象进行请求，此时可以在控制台 network 中看到请求信息
  3. 在 main.js 入口文件中引入 mockjs 的相关配置文件，即是在前端代码中加入了 Mockjs 的模拟方式，它将在浏览器中被执行，而不是真正的发送请求，不过我们可以将其打印到控制台进行查看(mock-server)
  ```

  

-  设置延迟响应，模拟向后端请求数据

  ```
  Mock.setup({
    timeout: 800, // 设置延迟响应，模拟向后端请求数据
  });
  ```

- Mock 无法拦截带参数的 get 请求

  - 原因：带有 `get` 参数的请求没有和设置的路径匹配成功，导致请求失败
  - 解决方案：将 `mock` 的路径改成正则的形式匹配
  - 结论：`get` 请求都用正则表达式书写路径，`post`字符串和正则方式 都行
- 由于`mock`在启用过程中不能使用别的拦截器（如：sso），所以开发阶段不要引入用户系统