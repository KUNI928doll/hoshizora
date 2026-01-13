# ほしぞら保育園

## SCSS → CSS（Nodeなし）

このプロジェクトは `scss/style.scss` を編集し、`css/style.css` を生成します。

### 1) Sass（Dart Sass）を入れる

- macOS（Homebrew）:
  - `brew install sass/sass/sass`

`sass -v` でバージョンが表示されればOKです。

### 2) 1回だけコンパイル

```bash
make css
```

### 3) 自動コンパイル（保存で反映）

```bash
make watch
```

## ファイル構成

- `scss/style.scss`: SCSS（変数定義など）
- `css/style.css`: コンパイル後CSS（`index.html` から読み込み）


