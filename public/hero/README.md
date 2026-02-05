# Hero スライド用の画像

このフォルダに `1.jpg`, `2.jpg`, `3.jpg` などを置くと、Hero セクションの右→左に流れるスライドに表示できます。

`src/components/HeroSection.vue` の `slideImages` を次のように差し替えてください。

```ts
const slideImages = ['/hero/1.jpg', '/hero/2.jpg', '/hero/3.jpg', '/hero/4.jpg', '/hero/5.jpg']
```
