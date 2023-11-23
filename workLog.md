## 11.19

## 项目开始

### 完成

项目配置 参考文章  

```js
https://juejin.cn/post/7275550543296446519?searchId=20231119085349FBFF5813F864D118E575#heading-6
```

配置sass全局样式

### 问题

1.拼写错误

2.配置路由时 引用的router没有挂载到app上 导致页面无法出来

以下是错误代码

```js
const app = createApp(App)
app.use(router)
createApp(App).mount('#app')
```



## 11.21

### 完成

底部导航栏切换变色

一些页面搭建

后端结构搭建 sequlize模型搭建

### 问题

变色有延迟？未解决

express文件执行问题 纯傻逼

postman接口全部超时 重启解决 莫名其妙

github上传没有小绿点



## 11.22

### 完成

编写了一个JS脚本文件，编写用于渲染前端页面的数据的增加。主要是为了批量上传图片 

完成前端接口测试  

### 问题

图片路径的选择

axiost baseURL的设置

跨域问题--一个端口向另一个端口请求数据 core中间件
