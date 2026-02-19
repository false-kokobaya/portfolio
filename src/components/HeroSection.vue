<script setup lang="ts">
/**
 * Hero セクション（トップ）
 * 名前とキャッチコピーを表示。id="hero" でナビのスクロール先になる。
 * 写真が右から左へ流れるスライドストリップあり。
 */
const name = 'Kohei T.'
// 傭兵感とフルスタック感を出したキャッチコピー
const catchCopy = 'Javaバックエンドからフロント・AIまで請け負うフルスタックエンジニア'

/** スライドに表示する画像（自分の写真は public/hero/ に 1.jpg, 2.jpg... で置いて差し替え可能） */
const slideImages = [
  'https://picsum.photos/seed/hero1/320/240',
  'https://picsum.photos/seed/hero2/320/240',
  'https://picsum.photos/seed/hero3/320/240',
  'https://picsum.photos/seed/hero4/320/240',
  'https://picsum.photos/seed/hero5/320/240',
]
</script>

<template>
  <section id="hero" class="hero">
    <!-- 右→左に流れる写真ストリップ -->
    <div class="hero__slide-wrap" aria-hidden="true">
      <div class="hero__slide-track">
        <div
          v-for="(src, i) in slideImages"
          :key="`a-${i}`"
          class="hero__slide-item"
        >
          <img :src="src" :alt="`スライド ${i + 1}`" loading="lazy" @error="($event.target as HTMLImageElement).style.display = 'none'" />
        </div>
        <!-- ループ用に同じ並びを2つ目として並べる -->
        <div
          v-for="(src, i) in slideImages"
          :key="`b-${i}`"
          class="hero__slide-item"
        >
          <img :src="src" :alt="`スライド ${i + 1}`" loading="lazy" @error="($event.target as HTMLImageElement).style.display = 'none'" />
        </div>
      </div>
    </div>

    <p class="hero__label">Portfolio</p>
    <h1 class="hero__name">{{ name }}</h1>
    <p class="hero__catch">{{ catchCopy }}</p>
    <div class="hero__line" aria-hidden="true" />
  </section>
</template>

<style scoped>
.hero {
  min-height: 48vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(160deg, var(--color-accent-light) 0%, var(--color-bg) 50%);
  position: relative;
  overflow: hidden;
}

/* 右→左に流れる写真ストリップ */
.hero__slide-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  overflow: hidden;
  mask-image: linear-gradient(to top, transparent, black 20%);
  -webkit-mask-image: linear-gradient(to top, transparent, black 20%);
}

.hero__slide-track {
  display: flex;
  width: max-content;
  height: 100%;
  animation: hero-slide 30s linear infinite;
}

.hero__slide-item {
  flex-shrink: 0;
  width: 160px;
  height: 100%;
  padding: 0 0.5rem;
}

.hero__slide-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
}

@keyframes hero-slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
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
