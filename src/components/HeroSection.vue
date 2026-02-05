<script setup lang="ts">
/**
 * Hero セクション（トップ）
 * 名前とキャッチコピーを表示。id="hero" でナビのスクロール先になる。
 */
const name = 'Kohei T.'
// 傭兵感とフルスタック感を出したキャッチコピー
const catchCopy = 'Javaバックエンドからフロント・AIまで請け負うフルスタックエンジニア'
</script>

<template>
  <section id="hero" class="hero">
    <p class="hero__label">Portfolio</p>
    <h1 class="hero__name">{{ name }}</h1>
    <p class="hero__catch">{{ catchCopy }}</p>
    <div class="hero__line" aria-hidden="true" />
  </section>
</template>

<style scoped>
.hero {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(160deg, var(--color-accent-light) 0%, var(--color-bg) 50%);
  position: relative;
}

.hero__label {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

.hero__name {
  font-family: var(--font-heading);
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.hero__catch {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  max-width: 28ch;
  margin-bottom: 1.5rem;
}

.hero__line {
  width: 48px;
  height: 3px;
  background: var(--color-accent);
  border-radius: var(--radius-full);
}

@media (min-width: 768px) {
  .hero__name {
    font-size: 3rem;
  }
  .hero__catch {
    font-size: 1.25rem;
  }
}
</style>
