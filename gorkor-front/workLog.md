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

