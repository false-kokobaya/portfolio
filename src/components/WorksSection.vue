<script setup lang="ts">
/**
 * Works セクション（作った作品）
 * src/data/works.ts の作品一覧をカード表示。クリックで projectUrl または githubUrl を別タブで開く。
 * キーボードの Enter / Space でも同じ動作（アクセシビリティ対応）。
 */
import { works } from '../data/works'

/** 作品の projectUrl または githubUrl を別タブで開く（未設定の場合は何もしない） */
function openLink(item: { projectUrl?: string; githubUrl?: string }) {
  const url = item.projectUrl || item.githubUrl
  if (url) window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section id="works" class="works">
    <h2 class="section-title">Works（作った作品）</h2>
    <div class="works__grid">
      <article
        v-for="item in works"
        :key="item.id"
        class="work-card"
        role="button"
        tabindex="0"
        @click="openLink(item)"
        @keydown.enter="openLink(item)"
        @keydown.space.prevent="openLink(item)"
      >
        <div v-if="item.thumbnailUrl" class="work-card__thumb">
          <img :src="item.thumbnailUrl" :alt="item.title" loading="lazy" />
        </div>
        <div class="work-card__body">
          <h3 class="work-card__title">{{ item.title }}</h3>
          <p class="work-card__desc">{{ item.description }}</p>
          <p v-if="!item.projectUrl && !item.githubUrl" class="work-card__hint">
            URLを設定してください
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.works__grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .works__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.work-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  background: #fff;
}

.work-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.work-card__thumb {
  aspect-ratio: 400 / 240;
  overflow: hidden;
  background: #f1f5f9;
}

.work-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.work-card__body {
  padding: 1rem;
}

.work-card__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.25rem;
}

.work-card__desc {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
}

.work-card__hint {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #3b82f6;
  margin-bottom: 0.5rem;
}
</style>
