<script setup lang="ts">
/**
 * ルートコンポーネント（縦長1ページのポートフォリオ全体）
 * 固定ヘッダーのナビから各セクションへスムーズスクロールする。
 * スクロール量に応じて背景レイヤーが動くパララックス効果あり。
 * 仕掛け: ランプクリックでダークモード切替
 */
import { ref, onMounted, onUnmounted, watch } from 'vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import WorksSection from './components/WorksSection.vue'
import ContactSection from './components/ContactSection.vue'
import Footer from './components/Footer.vue'

const STORAGE_KEY_THEME = 'portfolio-theme'

const BACK_TO_TOP_THRESHOLD = 400

// ナビの項目（id は各セクションの id と一致させる）
const navItems = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Works' },
  { id: 'contact', label: 'Contact' },
] as const

/** 指定した id のセクションまでスムーズにスクロールする */
function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

/** スクロール量（パララックス背景の動きに使用） */
const scrollY = ref(0)
const PARALLAX_FACTOR = 0.35

const showBackToTop = ref(false)

function onScroll() {
  scrollY.value = window.scrollY
  showBackToTop.value = window.scrollY > BACK_TO_TOP_THRESHOLD
}

// --- 仕掛け1: ダークモード（ランプで切り替え） ---
const isDark = ref(false)

function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
}

function toggleTheme() {
  isDark.value = !isDark.value
}

watch(isDark, (dark) => {
  applyTheme(dark)
  try {
    localStorage.setItem(STORAGE_KEY_THEME, dark ? 'dark' : 'light')
  } catch {
    /* ignore */
  }
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  // 保存済みテーマを適用
  try {
    const saved = localStorage.getItem(STORAGE_KEY_THEME) as 'dark' | 'light' | null
    if (saved === 'dark' || saved === 'light') {
      isDark.value = saved === 'dark'
      applyTheme(isDark.value)
    }
  } catch {
    /* ignore */
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="app">
    <!-- スクロールで動く背景レイヤー（パララックス） -->
    <div class="app__bg" aria-hidden="true">
      <div
        class="app__bg-inner"
        :style="{ transform: `translateY(${scrollY * PARALLAX_FACTOR}px)` }"
      />
    </div>

    <header class="header">
      <nav class="nav" aria-label="メインナビゲーション">
        <ul class="nav__list">
          <li v-for="item in navItems" :key="item.id" class="nav__item">
            <button
              type="button"
              class="nav__link"
              @click="scrollToSection(item.id)"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
        <button
          type="button"
          class="nav__lamp"
          :class="{ 'nav__lamp--on': isDark }"
          :aria-label="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
          title="クリックで明るさを切り替え"
          @click="toggleTheme"
        >
          <span class="nav__lamp-icon" aria-hidden="true">
            <!-- ランプのアイコン（消灯時は枠線、点灯時は光る） -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
            </svg>
          </span>
        </button>
      </nav>
    </header>

    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorksSection />
      <ContactSection />
      <Footer />
    </main>

    <!-- トップへ戻る（一定量スクロールで表示） -->
    <Transition name="back-to-top">
      <button
        v-show="showBackToTop"
        type="button"
        class="back-to-top"
        aria-label="ページの先頭へ戻る"
        @click="scrollToSection('hero')"
      >
        <span class="back-to-top__icon" aria-hidden="true">↑</span>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
}

/* 固定背景レイヤー（背面でスクロール量に応じて動く） */
.app__bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.app__bg-inner {
  position: absolute;
  width: 120%;
  height: 120%;
  left: -10%;
  top: -20%;
  background: radial-gradient(
      ellipse 80% 60% at 50% 20%,
      var(--color-accent-light) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 70% 50% at 80% 80%,
      rgba(13, 148, 136, 0.08) 0%,
      transparent 50%
    );
  will-change: transform;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-header-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.nav {
  max-width: 960px;
  margin: 0 auto;
  padding: 0.875rem 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  justify-content: center;
}

/* 仕掛け1: ランプ（クリックでダークモード切替） */
.nav__lamp {
  position: absolute;
  right: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: color 0.2s, background 0.2s, transform 0.2s;
}

.nav__lamp:hover {
  color: var(--color-accent);
  background: var(--color-accent-light);
  transform: scale(1.08);
}

.nav__lamp:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.nav__lamp--on .nav__lamp-icon {
  color: var(--color-accent);
  filter: drop-shadow(0 0 6px var(--color-accent));
}

.nav__item {
  display: inline-block;
}

.nav__link {
  font-family: var(--font-heading);
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: color 0.2s, background 0.2s, transform 0.15s;
}

.nav__link:hover {
  color: var(--color-accent);
  background: var(--color-accent-light);
}

.nav__link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* トップへ戻るボタン */
.back-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 90;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
  color: var(--color-accent);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.back-to-top:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.back-to-top:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.back-to-top__icon {
  font-size: 1.25rem;
  line-height: 1;
}

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
