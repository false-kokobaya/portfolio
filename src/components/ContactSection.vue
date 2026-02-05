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
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.contact__embed iframe {
  display: block;
}

.contact__placeholder {
  margin-top: 1rem;
  padding: 2rem;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  color: #64748b;
  text-align: center;
}

.contact__hint {
  margin-top: 1rem;
  font-size: 0.875rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.contact__placeholder code {
  background: #e2e8f0;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
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
