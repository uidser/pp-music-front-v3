import { createApp } from 'vue'
import App from './App.vue'
import { Button, Search, Swipe, SwipeItem, Icon, Progress, Toast, List, Cell, ActionSheet, ShareSheet, PullRefresh, ConfigProvider } from 'vant'
import { Image as VanImage } from 'vant'
import route from "@/router/route"
import playerStore from "@/store/playerstore"
const app = createApp(App)
app.use(Button)
app.use(Search)
app.use(route)
app.use(Swipe)
app.use(SwipeItem)
app.use(Icon)
app.use(VanImage)
app.use(Progress)
app.use(Toast)
app.use(List)
app.use(Cell)
app.use(ActionSheet)
app.use(ShareSheet)
app.use(playerStore)
app.use(PullRefresh)
app.use(ConfigProvider)
app.mount('#app')
