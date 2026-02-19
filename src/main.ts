/**
 * アプリのエントリーポイント
 * Vue アプリを生成し、#app にマウントする。グローバルスタイルもここで読み込む。
 */
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')

// DevTools を開いた人向けの仕掛け
const consoleStyle = [
  'color: #0d9488; font-size: 14px; font-weight: bold;',
  'color: #57534e; font-size: 12px; line-height: 1.6;',
  'color: #0d9488; font-size: 11px;',
]
console.log(
  '%c👋 こんにちは！',
  consoleStyle[0]
)
console.log(
  '%cこのポートフォリオは Vue 3 + TypeScript + Vite で作っています。\n' +
    '気になることがあれば、お気軽に Contact からどうぞ。',
  consoleStyle[1]
)
console.log(
  '%c採用ご検討の皆様: 実装やコードにもぜひ目を向けていただけると嬉しいです。',
  consoleStyle[2]
)
