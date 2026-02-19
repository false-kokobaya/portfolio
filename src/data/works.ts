/**
 * ポートフォリオに掲載する作品の型と一覧
 * WorksSection がこの配列を表示し、カードクリックで projectUrl または githubUrl を開く。
 */

/** 構成（フロント / バックエンド / インフラ / その他）。ポートフォリオ用に分けて書く */
export interface WorkStack {
  /** フロントエンド */
  frontend: string;
  /** バックエンド（なしの場合は "—" や "フロントのみ" など） */
  backend?: string;
  /** インフラ・ホスティング（未公開の場合は "—" など） */
  infra?: string;
  /** その他（外部API、主要ライブラリなど） */
  other?: string;
}

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  /** 技術タグ（Vue, TypeScript など）。省略可 */
  tags?: string[];
  /** 構成。フロント・バックエンド・インフラで分けて見やすく表示する */
  stack?: WorkStack;
  thumbnailUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
}

/** 作品一覧（ここに追加・編集すると Works セクションに反映される） */
export const works: WorkItem[] = [
  {
    id: "youtube-summarizer",
    title: "YouTube要約アプリ",
    description:
      "YouTubeの字幕を取得し、Groq（LLM）で要約。キーポイントに動画内の時刻を表示し、タップでその位置から再生できます。",
    tags: ["Flutter", "Python", "FastAPI", "Groq"],
    stack: {
      frontend: "Flutter (Riverpod) — Web / macOS",
      backend: "FastAPI (Python), Pydantic",
      infra: "Netlify",
      other:
        "youtube-transcript-api（字幕取得）\nGroq API (llama-3.3-70b)（要約）",
    },
    thumbnailUrl:
      "https://placehold.co/400x240/0d9488/fff?text=YouTube+Summarizer",
    projectUrl: "https://kaleidoscopic-maamoul-5e5ca0.netlify.app",
    githubUrl: "https://github.com/KBTechs/youtube-summarizer",
  },
  {
    id: "json-tool",
    title: "JSON 差分比較・結合ツール",
    description:
      "2つのJSONファイルを読み込み、差分を色付きで比較。選択した差分だけを取り込んだ結合結果をリアルタイムで生成。変更箇所のインラインハイライト、JSON検証、ダウンロード対応。",
    tags: ["Vue", "TypeScript", "Vite", "Vitest"],
    stack: {
      frontend: "Vue 3, TypeScript, Vite",
      backend: "—",
      infra: "—",
      other: "Vitest / Vue Test Utils / jsdiff（行・文字単位の差分）",
    },
    thumbnailUrl:
      "https://placehold.co/400x240/1a1a2e/eee?text=JSON+Diff+Merge",
    projectUrl: "",
    githubUrl: "https://github.com/false-kokobaya/vue_ts",
  },
];
