import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
//初始化样式
import "@/styles/main.scss";
//路由
import router from "./router/index";
app.use(router);
app.use(pinia);
app.mount("#app");

//
//浏览器属性事件
