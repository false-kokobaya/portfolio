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
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
}

.skills__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.skills__item:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.skills__icon {
  font-size: 1.5rem;
}

.skills__name {
  color: var(--color-text);
}
</style>
