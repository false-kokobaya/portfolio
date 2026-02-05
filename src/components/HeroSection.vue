<script setup lang="ts">
/**
 * Hero セクション（トップ）
 * 名前とキャッチコピーを表示。id="hero" でナビのスクロール先になる。
 */
const name = 'あなたの名前'
const catchCopy = '未経験からエンジニア目指してます！'
</script>

<template>
  <section id="hero" class="hero">
    <h1 class="hero__name">{{ name }}</h1>
    <p class="hero__catch">{{ catchCopy }}</p>
  </section>
</template>

<style scoped>
.hero {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
}

.hero__name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.hero__catch {
  font-size: 1.125rem;
  color: #555;
}

@media (min-width: 768px) {
  .hero__name {
    font-size: 2.5rem;
  }
  .hero__catch {
    font-size: 1.25rem;
  }
}
</style>
