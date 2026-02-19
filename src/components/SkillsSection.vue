<script setup lang="ts">
/**
 * Skills セクション（スキル一覧）
 * ホバーでコインが1回転し、ホバーするたびにコメントが変わる。クリックで表⇔裏を切り替え。
 */
import { ref } from "vue";

interface Skill {
  name: string;
  icon: string;
  comments: string[];
}

const skills: Skill[] = [
  {
    name: "Java",
    icon: "☕",
    comments: [
      "型の明示と設計の見通しを意識して書くようにしています",
      "フレームワークの規約を活かして保守しやすいコードを心がけています",
      "テスタビリティを考えた設計で、リファクタしやすさを高めています",
    ],
  },
  {
    name: "Python",
    icon: "🐍",
    comments: [
      "可読性と「書くより読む回数が多い」を前提にしています",
      "標準ライブラリとエコシステムの豊富さで素早く検証・実装しています",
      "型ヒントで意図を残しつつ、簡潔さのメリットも活かしています",
    ],
  },
  {
    name: "Swift",
    icon: "🍎",
    comments: [
      "型安全とオプショナルを活かして、実行時エラーを減らすようにしています",
      "プロトコル指向でテスタブルで拡張しやすい構成を意識しています",
      "モダンな文法で読みやすく、変更に強いコードを目指しています",
    ],
  },
  {
    name: "C++",
    icon: "⚙️",
    comments: [
      "メモリとライフタイムを意識して、パフォーマンスと安全性のバランスを取っています",
      "RAII やスマートポインタでリソース管理のメリットを活かしています",
      "必要に応じて STL を選び、再利用性と可読性を高めています",
    ],
  },
  {
    name: "Vue.js",
    icon: "💚",
    comments: [
      "Composition API でロジックの再利用と関心の分離を意識しています",
      "リアクティブな仕組みを活かして、状態の流れを追いやすい構成にしています",
      "コンポーネントの責務を絞り、テストや変更に強くするよう心がけています",
    ],
  },
  {
    name: "TypeScript",
    icon: "📘",
    comments: [
      "型で設計の意図を残し、リファクタと補完のメリットを活かしています",
      "any を避け、必要なところだけ型を絞るようにしています",
      "型の恩恵でバグを早く見つけ、設計の質を高めるようにしています",
    ],
  },
  {
    name: "Flutter",
    icon: "🦋",
    comments: [
      "一つのコードベースで複数プラットフォームの知見を積むようにしています",
      "ウィジェットの組み合わせと状態管理（Riverpod）で保守しやすさを意識しています",
      "ホットリロードを活かして、試行錯誤しながら UI を詰めています",
    ],
  },
  {
    name: "HTML / CSS",
    icon: "🌐",
    comments: [
      "セマンティクスとアクセシビリティを意識してマークアップしています",
      "Flexbox / Grid を活かして、レスポンシブと保守しやすいレイアウトにしています",
      "変数やコンポーネント的な考えで、一貫したスタイルになるよう心がけています",
    ],
  },
  {
    name: "Git",
    icon: "📦",
    comments: [
      "コミットメッセージで「なぜ」が分かるようにし、履歴の価値を高めています",
      "ブランチと rebase を用途に合わせて使い、レビューしやすい差分にしています",
      "履歴を振り返りやすいようにして、協調開発の質を高めています",
    ],
  },
];

/** スキルごとの「今表示するコメント」のインデックス */
const commentIndices = ref<number[]>(skills.map(() => 0));

/** 裏返っている（裏面を表示している）カードのインデックス */
const flipped = ref<boolean[]>(skills.map(() => false));

/** 一度カードの外に出たときだけ true。mouseenter で「ホバー」としてコメントを進めるのはこのときだけ */
const hasLeftSinceEnter = ref<boolean[]>(skills.map(() => false));

/** クリックで裏→表にしたカード。マウスが外に出るまでホバー1回転を出さない */
const noHoverSpinCardIndex = ref<number | null>(null);

/** いま1回転アニメ再生中のカードのインデックス（複数可・カーソルが外れても最後まで回る） */
const spinningCardIndices = ref<Set<number>>(new Set());

/** スピン終了直後、逆回転に見えないよう 0deg で固定するための一時クラス用 */
const spinJustEndedIndex = ref<number | null>(null);

function isSpinning(index: number) {
  return spinningCardIndices.value.has(index);
}

/** クリックだけ：表⇔裏の切り替え（ホバーと完全に分離） */
function toggleFlipped(index: number) {
  const wasFlipped = flipped.value[index];
  flipped.value = [...flipped.value];
  flipped.value[index] = !flipped.value[index];
  // 裏→表にしたら、マウスがこのカードから出るまでホバー1回転を出さない
  if (wasFlipped) {
    noHoverSpinCardIndex.value = index;
  }
}

/** マウスがカードから出た → 裏のままなら表に戻す。ホバー1回転の抑制を解除し、次に入ったときにコメントを進める */
function onMouseLeave(index: number) {
  if (flipped.value[index]) {
    flipped.value = [...flipped.value];
    flipped.value[index] = false;
  }
  if (noHoverSpinCardIndex.value === index) {
    noHoverSpinCardIndex.value = null;
  }
  hasLeftSinceEnter.value = [...hasLeftSinceEnter.value];
  hasLeftSinceEnter.value[index] = true;
}

/** マウスがカードに入った。外に出てから入ったときだけコメントを進め、1回転を開始（外れても最後まで回る） */
function onMouseEnter(index: number) {
  if (hasLeftSinceEnter.value[index]) {
    hasLeftSinceEnter.value = [...hasLeftSinceEnter.value];
    hasLeftSinceEnter.value[index] = false;
    cycleComment(index);
  }
  if (!flipped.value[index] && noHoverSpinCardIndex.value !== index) {
    spinningCardIndices.value = new Set([...spinningCardIndices.value, index]);
  }
}

/** 1回転アニメが終わったらクラスを外し、逆回転に見えないよう一瞬 0deg で固定 */
function onSpinEnd(index: number) {
  if (!spinningCardIndices.value.has(index)) return;
  spinJustEndedIndex.value = index;
  spinningCardIndices.value = new Set(
    [...spinningCardIndices.value].filter((i) => i !== index),
  );
  setTimeout(() => {
    spinJustEndedIndex.value = null;
  }, 0);
}

function cycleComment(index: number) {
  const skill = skills[index];
  if (!skill || skill.comments.length <= 1) return;
  commentIndices.value = [...commentIndices.value];
  commentIndices.value[index] =
    (commentIndices.value[index] + 1) % skill.comments.length;
}

/** 各スキルの現在のコメント */
function currentComment(index: number): string {
  const skill = skills[index];
  const i = commentIndices.value[index] ?? 0;
  return skill?.comments[i] ?? "";
}

const hasMultipleComments = (skill: Skill) => skill.comments.length > 1;
</script>

<template>
  <section id="skills" class="skills">
    <h2 class="section-title">Skills（スキル）</h2>
    <ul class="skills__list">
      <li
        v-for="(skill, index) in skills"
        :key="skill.name"
        class="skill-card"
        :class="{
          'skill-card--flipped': flipped[index],
          'skill-card--no-hover-spin': noHoverSpinCardIndex === index,
          'skill-card--spinning': isSpinning(index),
          'skill-card--spin-just-ended': spinJustEndedIndex === index,
        }"
        role="button"
        tabindex="0"
        :aria-label="
          flipped[index]
            ? `${skill.name}。${currentComment(index)}。クリックで表に戻る`
            : `${skill.name}。クリックで裏面を表示、ホバーでコメントが変わります`
        "
        @click="toggleFlipped(index)"
        @mouseenter="onMouseEnter(index)"
        @mouseleave="onMouseLeave(index)"
        @keydown.enter.prevent="toggleFlipped(index)"
        @keydown.space.prevent="toggleFlipped(index)"
      >
        <div
          class="skill-card__inner"
          @animationend="onSpinEnd(index)"
          @webkitAnimationEnd="onSpinEnd(index)"
        >
          <div class="skill-card__front">
            <span class="skill-card__icon" aria-hidden="true">{{
              skill.icon
            }}</span>
            <span class="skill-card__name">{{ skill.name }}</span>
          </div>
          <div class="skill-card__back">
            <p class="skill-card__comment">{{ currentComment(index) }}</p>
            <p v-if="hasMultipleComments(skill)" class="skill-card__hint">
              ホバーで次の一言
            </p>
            <p class="skill-card__hint">クリックで表に戻る</p>
          </div>
        </div>
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

.skill-card {
  aspect-ratio: 1;
  cursor: pointer;
  border-radius: var(--radius-md);
  perspective: 600px;
}

.skill-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

/* クリックで裏返った状態（裏→表の動きを復元） */
.skill-card--flipped .skill-card__inner {
  transform: rotateY(180deg);
}

/* ホバーで1回転を開始。クラスで制御するのでカーソルが外れても最後まで回る */
.skill-card--spinning .skill-card__inner {
  animation: skill-coin-spin 0.65s ease-in-out forwards;
  transition: none;
}

/* スピン終了直後だけ 0deg 固定＆transition なし（逆回転に見えないようにする） */
.skill-card--spin-just-ended .skill-card__inner {
  transform: rotateY(0deg);
  transition: none;
}

@keyframes skill-coin-spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.skill-card__front,
.skill-card__back {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.25rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.skill-card__front {
  gap: 0.5rem;
}

.skill-card:hover .skill-card__front,
.skill-card--spinning .skill-card__front {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}

.skill-card__back {
  transform: rotateY(180deg);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}

.skill-card__icon {
  font-size: 1.5rem;
}

.skill-card__name {
  font-weight: 500;
  color: var(--color-text);
  text-align: center;
}

.skill-card__comment {
  font-size: 0.875rem;
  color: var(--color-text);
  text-align: center;
  line-height: 1.5;
  margin: 0;
}

.skill-card__hint {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.skill-card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
