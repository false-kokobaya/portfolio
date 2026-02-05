<script setup lang="ts">
/**
 * ルートコンポーネント（縦長1ページのポートフォリオ全体）
 * 固定ヘッダーのナビから各セクションへスムーズスクロールする。
 * スクロール量に応じて背景レイヤーが動くパララックス効果あり。
 */
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import WorksSection from './components/WorksSection.vue'
import ContactSection from './components/ContactSection.vue'

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

function onScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
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
      </nav>
    </header>

    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorksSection />
      <ContactSection />
    </main>
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
  background: rgba(250, 250, 249, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.nav {
  max-width: 960px;
  margin: 0 auto;
  padding: 0.875rem 1.5rem;
}

.nav__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  justify-content: center;
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
</style>
