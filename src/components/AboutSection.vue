<script setup lang="ts">
/**
 * About セクション（経歴）
 * 年号付きタイムラインで経歴を表示。スクロールで各項目が順にフェードインする。
 */
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

/** タイムライン1件の型 */
interface TimelineItem {
  year: string
  period: string
  title: string
  description: string
}

const timeline: TimelineItem[] = [
  {
    year: '2017',
    period: '2017年',
    title: '営業からIT業界へ転職',
    description:
      '未経験でエンジニアに。要件ヒアリングから設計・実装・テストまで一気通貫で任される案件を経験し、現場でキャリアを積む。',
  },
  {
    year: '2018',
    period: '2018年〜',
    title: 'Java / Struts での業務開発',
    description:
      '業務システムの保守・新規開発に従事。Struts を中心に、DB設計や画面実装まで担当。',
  },
  {
    year: '2020',
    period: '2020年〜',
    title: 'Spring Boot へのシフト',
    description:
      'Spring Boot を用いた新規開発案件を複数経験。API 設計、バッチ、フロント連携まで幅広く対応。',
  },
  {
    year: '2023',
    period: '2023年〜',
    title: 'フリーランス7年目・守備範囲を拡大',
    description:
      'バックエンドを軸に、フロントエンド（Vue / TypeScript）や AI 関連の学習を並行。フルスタックで請け負える体制を構築中。',
  },
  {
    year: 'Now',
    period: '現在',
    title: 'フルスタックで価値提供',
    description:
      'Java を軸に、フロント・AI まで対応できるエンジニアとして、要件に応じた開発を請け負っています。',
  },
]

/** 各タイムライン項目が画面に入ったか（表示アニメーション用） */
const visibleIndexes = ref<Set<number>>(new Set())
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number((entry.target as HTMLElement).dataset.index)
        if (Number.isInteger(index)) {
          visibleIndexes.value = new Set([...visibleIndexes.value, index])
        }
      })
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  )
  nextTick(() => {
    document.querySelectorAll('.timeline__item').forEach((el) => observer?.observe(el))
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section id="about" class="about">
    <h2 class="section-title">About（経歴）</h2>
    <div class="timeline">
      <div
        v-for="(item, index) in timeline"
        :key="item.year"
        class="timeline__item"
        :class="{ 'timeline__item--visible': visibleIndexes.has(index) }"
        :data-index="index"
      >
        <div class="timeline__marker">
          <span class="timeline__year">{{ item.year }}</span>
          <span class="timeline__period">{{ item.period }}</span>
        </div>
        <div class="timeline__content">
          <h3 class="timeline__title">{{ item.title }}</h3>
          <p class="timeline__desc">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
}

/* 中央の縦線 */
.timeline::before {
  content: '';
  position: absolute;
  left: 6.5rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--color-accent), var(--color-border));
  border-radius: 2px;
}

@media (min-width: 640px) {
  .timeline::before {
    left: 8rem;
  }
}

.timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1rem;
  padding-bottom: 2rem;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.timeline__item:last-child {
  padding-bottom: 0;
}

.timeline__item--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 640px) {
  .timeline__item {
    grid-template-columns: 8rem 1fr;
    gap: 1.5rem;
  }
}

.timeline__marker {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 0.15rem;
}

.timeline__year {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1.2;
}

.timeline__period {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 0.15rem;
}

.timeline__content {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.timeline__content:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}

.timeline__title {
  font-family: var(--font-heading);
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.timeline__desc {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  line-height: 1.7;
}
</style>
