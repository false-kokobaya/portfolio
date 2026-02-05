/**
 * アプリのエントリーポイント
 * Vue アプリを生成し、#app にマウントする。グローバルスタイルもここで読み込む。
 */
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
