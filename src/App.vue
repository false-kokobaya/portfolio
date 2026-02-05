<script setup lang="ts">
/**
 * ルートコンポーネント（縦長1ページのポートフォリオ全体）
 * 固定ヘッダーのナビから各セクションへスムーズスクロールする。
 */
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
</script>

<template>
  <div class="app">
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
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e2e8f0;
}

.nav {
  max-width: 960px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
}

.nav__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  justify-content: center;
}

.nav__item {
  display: inline-block;
}

.nav__link {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #475569;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.nav__link:hover {
  color: #1e40af;
  background: #eff6ff;
}

.nav__link:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
