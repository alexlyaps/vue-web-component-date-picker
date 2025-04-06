import { createApp } from "vue";
import "@/assets/styles/index.scss";
import App from "./App.vue";

const requireIcons = require.context("@/assets/icons", false, /\.svg$/);
requireIcons.keys().forEach(requireIcons);

createApp(App).mount("#app");
