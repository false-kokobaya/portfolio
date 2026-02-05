<script setup lang="ts">
/**
 * Skills セクション（スキル一覧）
 * 使える技術をアイコン付きでグリッド表示。skills 配列を編集して増減可能。
 */
const skills = [
  { name: 'HTML / CSS', icon: '🌐' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Vue.js', icon: '💚' },
  { name: 'Git', icon: '📦' },
  { name: 'Vitest', icon: '🧪' },
  { name: 'Vite', icon: '⚡' },
]
</script>

<template>
  <section id="skills" class="skills">
    <h2 class="section-title">Skills（スキル）</h2>
    <ul class="skills__list">
      <li v-for="skill in skills" :key="skill.name" class="skills__item">
        <span class="skills__icon" aria-hidden="true">{{ skill.icon }}</span>
        <span class="skills__name">{{ skill.name }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.skills__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.skills__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f1f5f9;
  border-radius: 8px;
  font-weight: 500;
}

.skills__icon {
  font-size: 1.5rem;
}

.skills__name {
  color: #334155;
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
