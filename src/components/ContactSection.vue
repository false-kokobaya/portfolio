<script setup lang="ts">
/**
 * Contact セクション（お問い合わせ）
 * Google フォームを iframe で埋め込む。googleFormEmbedUrl が空のときは設定方法の案内を表示。
 * フォームの「送信」→「埋め込み」で表示される iframe の src をコピーして設定する。
 */
const googleFormEmbedUrl = ''
</script>

<template>
  <section id="contact" class="contact">
    <h2 class="section-title">Contact（お問い合わせ）</h2>
    <div v-if="googleFormEmbedUrl" class="contact__embed">
      <iframe
        :src="googleFormEmbedUrl"
        width="100%"
        height="600"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="お問い合わせフォーム"
      >
        読み込んでいます…
      </iframe>
    </div>
    <div v-else class="contact__placeholder">
      <p>Google フォームの埋め込みURLを設定してください。</p>
      <p class="contact__hint">
        フォームの「送信」→「埋め込み」で表示される iframe の <code>src</code> を
        <code>ContactSection.vue</code> の <code>googleFormEmbedUrl</code> に設定してください。
      </p>
    </div>
  </section>
</template>

<style scoped>
.contact__embed {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.contact__embed iframe {
  display: block;
}

.contact__placeholder {
  padding: 2.5rem;
  background: var(--color-bg-card);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-align: center;
}

.contact__hint {
  margin-top: 1rem;
  font-size: 0.875rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.contact__placeholder code {
  background: var(--color-accent-light);
  color: var(--color-accent-hover);
  padding: 0.2em 0.5em;
  border-radius: var(--radius-sm);
  font-size: 0.9em;
}
</style>
