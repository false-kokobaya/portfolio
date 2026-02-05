/**
 * ポートフォリオに掲載する作品の型と一覧
 * WorksSection がこの配列を表示し、カードクリックで projectUrl または githubUrl を開く。
 */

export interface WorkItem {
  id: string
  title: string
  description: string
  thumbnailUrl?: string
  projectUrl?: string
  githubUrl?: string
}

/** 作品一覧（ここに追加・編集すると Works セクションに反映される） */
export const works: WorkItem[] = [
  {
    id: 'json-tool',
    title: 'JSON比較ツール',
    description: '2つのJSONを比較し、差分を視覚的に表示するツール。Vue + TypeScriptで作成。',
    thumbnailUrl: 'https://placehold.co/400x240/1a1a2e/eee?text=JSON+Tool',
    projectUrl: '', // 公開URLがあれば設定
    githubUrl: '', // リポジトリURLを設定
  },
  // 他の作品を追加可能
]
