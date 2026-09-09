# tzug — portfolio

個人ポートフォリオサイト。Astro + 素の CSS、依存は `astro` のみ。

公開先: <https://tzug1729.github.io/portfolio/>

## 開発

```sh
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # dist/ に出力
npm run preview
```

`base` パスと `site` は環境変数で差し替えられる。

```sh
BASE_PATH=/ SITE_URL=https://example.com npm run build
```

## 構成

```
src/
  components/   Window（金の二重枠）と、それを組んだ部品
  layouts/      Base.astro … <html lang> / hreflang / OGP
  i18n/         ja.json en.json ui.ts … UI 文言のみ
  content/
    works/ja/*.md   作品。本文と4つの見出しは Markdown 本体が持つ
    works/en/*.md   未作成の記事は日本語版に自動でフォールバックする
    about/ja/*.md   プロフィールの各節
  pages/        日本語は直下、英語は en/ 配下
  styles/       tokens.css（色・字寸・余白）/ base.css
kosen-fes/      高専祭の旧サイト。ビルド対象外の保管物
class/          授業課題の旧サイト。ビルド対象外の保管物
```

## 書くときの約束

- 見出しとリンクは必ずウィンドウの中に置く。常に紺地の上に乗るので金がそのまま使える
- `font-weight` に太字を書かない。階層はサイズ・色・字間でつける
- `role: team` の作品は `responsibility` が必須。空だとビルドが落ちる
- 本文が未定の箇所は `TODO: 本文` のままにする

## デプロイ

`main` への push で `.github/workflows/deploy.yml` が動く。
リポジトリの Settings → Pages で Source を **GitHub Actions** にしておくこと。
