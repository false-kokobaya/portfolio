# ポートフォリオ

Vue 3 + TypeScript + Vite で作成した縦長1ページのポートフォリオサイトです。

## 構成

- **Hero** … 名前・キャッチコピー
- **About** … 経歴・自己紹介
- **Skills** … スキル一覧（アイコン付き）
- **Works** … 作った作品（サムネイル・リンク）
- **Contact** … Google フォーム埋め込み

## 開発

```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173 を開いて確認できます。

## ビルド

```bash
npm run build
```

`dist` に静的ファイルが出力されます。

## Vercel で公開

1. [Vercel](https://vercel.com) でアカウント作成
2. このリポジトリを GitHub に push
3. Vercel で「Import Project」→ リポジトリを選択 → Deploy
4. ビルドコマンド `npm run build`・出力ディレクトリ `dist` は自動検出されます

## カスタマイズ

- **名前・キャッチコピー:** `src/components/HeroSection.vue`
- **経歴文:** `src/components/AboutSection.vue`
- **スキル一覧:** `src/components/SkillsSection.vue`
- **作品一覧:** `src/data/works.ts`（タイトル・説明・サムネイルURL・GitHub/公開URL）
- **Google フォーム:** `src/components/ContactSection.vue` の `googleFormEmbedUrl` にフォームの埋め込み用URLを設定
