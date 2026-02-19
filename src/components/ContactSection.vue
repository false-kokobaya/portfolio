<script setup lang="ts">
/**
 * Contact セクション（お問い合わせ）
 * お問い合わせフォームへのリンクを表示。クリックでフォームを別タブで開く。
 */
const contactFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSepBYUI1urC77sUc7J2lS20bcs1jzMn3eYRz691zFjIB6ds6Q/viewform?usp=sharing&ouid=116587872511696789294'
</script>

<template>
  <section id="contact" class="contact">
    <h2 class="section-title">Contact（お問い合わせ）</h2>
    <div v-if="contactFormUrl" class="contact__cta">
      <p class="contact__text">
        お仕事のご依頼・ご相談は、お問い合わせフォームからお願いします。
      </p>
      <a
        :href="contactFormUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="contact__button"
      >
        お問い合わせフォームへ
      </a>
    </div>
    <div v-else class="contact__placeholder">
      <p><code>ContactSection.vue</code> の <code>contactFormUrl</code> にフォームのURLを設定してください。</p>
    </div>
  </section>
</template>

<style scoped>
.contact__cta {
  text-align: center;
  padding: 2rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.contact__text {
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.contact__button {
  display: inline-block;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 1.75rem;
  color: var(--color-bg-card);
  background: var(--color-accent);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}

.contact__button:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
}

.contact__button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.contact__placeholder {
  padding: 2.5rem;
  background: var(--color-bg-card);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-align: center;
}

.contact__placeholder code {
  background: var(--color-accent-light);
  color: var(--color-accent-hover);
  padding: 0.2em 0.5em;
  border-radius: var(--radius-sm);
  font-size: 0.9em;
}
</style>
