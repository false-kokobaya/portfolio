<script setup lang="ts">
/**
 * About セクション（経歴・自己紹介）
 * 経歴や勉強中の内容などをテキストで表示。改行は pre-line で反映される。
 */
const aboutText = `
  ここに経歴・自己紹介を記載してください。
  例: Javaを3ヶ月学習し、現在はVue.jsとTypeScriptでWebアプリ開発を勉強中です。
`
</script>

<template>
  <section id="about" class="about">
    <h2 class="section-title">About（経歴）</h2>
    <div class="about__body">
      <p class="about__text">{{ aboutText.trim() }}</p>
    </div>
  </section>
</template>

<style scoped>
.about__body {
  margin-top: 1rem;
}

.about__text {
  white-space: pre-line;
  color: #444;
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
