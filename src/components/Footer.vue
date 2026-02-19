<script setup lang="ts">
/**
 * フッター（SNSリンク・コピーライト）
 * SNS の url を設定するとリンクになる。空のままなら「準備中」表示。
 */
const currentYear = new Date().getFullYear()

/** アカウントができたら url を設定する（空ならリンクにしない） */
const snsLinks = [
  { name: 'GitHub', url: '' as string, ariaLabel: 'GitHub' },
  { name: 'X', url: '' as string, ariaLabel: 'X (Twitter)' },
  { name: 'Wantedly', url: '' as string, ariaLabel: 'Wantedly' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <nav class="footer__sns" aria-label="SNSリンク">
        <template v-for="sns in snsLinks" :key="sns.name">
          <a
            v-if="sns.url"
            :href="sns.url"
            :aria-label="sns.ariaLabel"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__link"
          >
            {{ sns.name }}
          </a>
          <span v-else class="footer__link footer__link--disabled" :title="`${sns.name}は準備中`">
            {{ sns.name }}
          </span>
        </template>
      </nav>
      <p class="footer__copy">
        © {{ currentYear }} Kohei T.
      </p>
      <p class="footer__built">
        Built with Vue 3 + TypeScript + Vite
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2.5rem 1.5rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
}

.footer__inner {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.footer__sns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.footer__link {
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
}

.footer__link:hover {
  color: var(--color-accent-hover);
  background: var(--color-accent-light);
}

.footer__link--disabled {
  color: var(--color-text-muted);
  cursor: default;
}

.footer__link--disabled:hover {
  background: transparent;
  color: var(--color-text-muted);
}

.footer__copy {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.footer__built {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  opacity: 0.8;
}
</style>
