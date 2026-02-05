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
          <ul v-if="item.tags?.length" class="work-card__tags">
            <li v-for="tag in item.tags" :key="tag" class="work-card__tag">{{ tag }}</li>
          </ul>
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
}

@media (min-width: 640px) {
  .works__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.work-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  background: var(--color-bg-card);
}

.work-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.work-card__thumb {
  aspect-ratio: 400 / 240;
  overflow: hidden;
  background: var(--color-border-soft);
}

.work-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.work-card:hover .work-card__thumb img {
  transform: scale(1.03);
}

.work-card__body {
  padding: 1.25rem;
}

.work-card__title {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.35rem;
}

.work-card__desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.work-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  list-style: none;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.work-card__tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: var(--color-accent-light);
  color: var(--color-accent-hover);
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.work-card__hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
  opacity: 0.8;
}
</style>
