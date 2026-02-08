<script setup lang="ts">
/**
 * Works セクション（作った作品）
 * src/data/works.ts の作品一覧をカード表示。クリックで projectUrl または githubUrl を別タブで開く。
 * キーボードの Enter / Space でも同じ動作（アクセシビリティ対応）。
 */
import { works } from "../data/works";

/** カードクリック時: projectUrl があればアプリへ、なければ githubUrl へ */
function openLink(item: { projectUrl?: string; githubUrl?: string }) {
  const url = item.projectUrl || item.githubUrl;
  if (url) window.open(url, "_blank", "noopener,noreferrer");
}

function openUrl(url: string, e: Event) {
  e.stopPropagation();
  window.open(url, "_blank", "noopener,noreferrer");
}
</script>

<template>
  <section id="works" class="works">
    <header class="works__header">
      <h2 class="works__title">Built works（成果物サンプル）</h2>
    </header>
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
          <dl v-if="item.stack" class="work-card__stack">
            <div class="work-card__stack-row">
              <dt class="work-card__stack-label">フロント</dt>
              <dd class="work-card__stack-value">{{ item.stack.frontend }}</dd>
            </div>
            <div class="work-card__stack-row">
              <dt class="work-card__stack-label">バックエンド</dt>
              <dd class="work-card__stack-value">
                {{ item.stack.backend ?? "—" }}
              </dd>
            </div>
            <div class="work-card__stack-row">
              <dt class="work-card__stack-label">インフラ</dt>
              <dd class="work-card__stack-value">
                {{ item.stack.infra ?? "—" }}
              </dd>
            </div>
            <div v-if="item.stack.other" class="work-card__stack-row">
              <dt class="work-card__stack-label">その他</dt>
              <dd class="work-card__stack-value">{{ item.stack.other }}</dd>
            </div>
          </dl>
          <ul v-if="item.tags?.length" class="work-card__tags">
            <li v-for="tag in item.tags" :key="tag" class="work-card__tag">
              {{ tag }}
            </li>
          </ul>
          <div
            v-if="item.projectUrl || item.githubUrl"
            class="work-card__links"
          >
            <a
              v-if="item.projectUrl"
              :href="item.projectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="work-card__link"
              @click="openUrl(item.projectUrl!, $event)"
            >
              アプリを見る
            </a>
            <a
              v-if="item.githubUrl"
              :href="item.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="work-card__link"
              @click="openUrl(item.githubUrl!, $event)"
            >
              GitHub
            </a>
          </div>
          <p v-else class="work-card__hint">URLを設定してください</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.works__header {
  margin-bottom: 1.5rem;
}

.works__title {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
}

.works__subtitle {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: 0;
}

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
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
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

.work-card__stack {
  margin-top: 0.75rem;
  margin-bottom: 0;
  font-size: 0.75rem;
}

.work-card__stack-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
  align-items: flex-start;
  min-height: 1.5em;
}

.work-card__stack-row:last-child {
  margin-bottom: 0;
}

.work-card__stack-label {
  flex-shrink: 0;
  min-width: 6.5em;
  font-weight: 600;
  color: var(--color-accent);
  white-space: nowrap;
}

.work-card__stack-value {
  margin: 0;
  min-width: 0;
  color: var(--color-text-muted);
  line-height: 1.4;
  word-break: break-word;
  white-space: pre-line;
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

.work-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.work-card__link {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  transition:
    color 0.2s,
    background 0.2s;
}

.work-card__link:hover {
  color: var(--color-bg-card);
  background: var(--color-accent);
}

.work-card__link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.work-card__hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
  opacity: 0.8;
}
</style>
