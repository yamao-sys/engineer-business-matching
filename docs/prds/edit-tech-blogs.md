## 機能概要

Business 企業紹介 技術ブログ編集

## 要件

- Business アプリケーションで URL は /tech-blogs
- API エンドポイントは/api/v1/business/tech-blogs(index, show, create, update, destroy)
- 1 企業は N 個の技術ブログを持てる
- フォームの初期表示は index アクションで取得したもの
- 1 つあたりの技術ブログごとの入力項目はタイトル, URL, 公開日, 「更新する」ボタン
- 「追加する」ボタンを押下すると、フォームのモーダルが現れ、入力して「更新する」ボタン押下で保存
- 登録済みの技術ブログはそれぞれ「編集する」ボタン押下でフォームのモーダルが現れ、入力して「更新する」ボタン押下で保存
- 登録済みの技術ブログはそれぞれ「削除する」ボタン押下で確認ダイアログ → 削除
- UI は共通部は frontend/packages/ui/src 配下のものを使用し、不足分は Tailwind で作成
- コンポーネント設計, Server Actions, Tanstack Query の使い方は既存の frontend/apps/business/features 配下のものと同じように

## 前提・留意点

- API エンドポイントとフロントエンドでの API クライアント・型は作成済み
- Business アプリケーションの/company-products を参考に作ることができそう
- /company-products との共通部の共通化は今は考えなくて OK

この仕様書を読んで、以下を教えてください：

1. あなたの理解している実装内容
2. 不明な点や確認が必要な箇所
3. 実装の順序と各ステップでのチェックポイント
4. 想定される技術的課題
5. 理解している実装内容

---

1. 理解している実装内容

基本構造（CompanyProducts と同様）:

- /app/tech-blogs/page.tsx - ページエントリーポイント
- features/TechBlogs/ ディレクトリに以下を配置：
  - components/TechBlogsTemplate/ - ページテンプレート
  - components/TechBlogsForm/ - データ prefetch 用
  - components/TechBlogsList/ - 一覧表示・モーダル状態管理
  - components/TechBlogRow/ - 個別技術ブログ表示・編集/削除ボタン
  - components/TechBlogModal/ - モーダル表示管理
  - components/TechBlogForm/ - フォーム処理
  - queries/techBlogQueries.ts - TanStack Query 設定
  - actions/techBlogs.ts - Server Actions

API 連携:

- API クライアント・型は作成済み（apis/tech-blog/tech-blog.ts）
- TechBlog 型：{ id, title, url, publishedAt }
- 入力項目：タイトル、URL、公開日

2. 不明な点・確認が必要な箇所

1. 公開日の入力形式 - DatePicker コンポーネントの使用可否
1. BaseControlFormDate 等の日付入力コンポーネントが@repo/ui にあるか
1. エラーハンドリング - バリデーションエラー表示の詳細仕様

1. 実装順序とチェックポイント

⏺ Update Todos
⎿  ☐ UI コンポーネントの確認（特に日付入力）  
 ☐ tech-blogs ページルート作成
☐ TechBlogs feature 基本構造作成（Template, Form, List）
☐ Server Actions 実装（fetchTechBlogs, createTechBlog, updateTechBlog, removeTechBlog）
☐ TanStack Query 設定（queries/techBlogQueries.ts）
☐ TechBlogRow コンポーネント実装
☐ TechBlogModal コンポーネント実装
☐ TechBlogForm コンポーネント実装
☐ 動作確認とデバッグ
☐ 型チェック・リント実行

✻ Thinking…

実装計画を立てました。ユーザーの質問に答えるために、まず UI コンポーネントの確認から始めて、想定される技術的課題も説明します。

最初に日付入力に使える UI コンポーネントがあるかを確認します。

⏺ 実装ステップ:

1. UI コンポーネント確認（日付入力）
2. ページルート作成 (/app/tech-blogs/page.tsx)
3. 基本構造実装（Template, Form, List）
4. Server Actions 実装
5. TanStack Query 設定
6. 詳細コンポーネント実装（Row, Modal, Form）
7. 動作確認・デバッグ
8. 型チェック・リント実行

チェックポイント:

- 各ステップでコンパイルエラーなし
- API レスポンス形式確認
- モーダル開閉動作
- フォームバリデーション
- データ更新後の画面反映

4. 想定される技術的課題

1. 日付入力の実装 - publishedAt フィールドの UI 実装
1. 型の整合性 - Date 型と string 型の変換処理
1. Server Actions での認証 - Business-Authorization ヘッダーの設定
1. エラーハンドリング - API エラーレスポンスの適切な処理

まず最初に UI コンポーネントを確認して、日付入力の方法を決定しましょうか？

ありがとう。
まず、不明な点・確認が必要な箇所について。

1. 公開日の入力形式 - DatePicker コンポーネントの使用可否
   → @repo/ui/BaseControlFormInput を用いること。

2. BaseControlFormDate 等の日付入力コンポーネントが@repo/ui にあるか
   → → @repo/ui/BaseControlFormInput を用いること。

3. エラーハンドリング - バリデーションエラー表示の詳細仕様
   → Business アプリケーションの/company-products と同じように、create/update API から返ってくる errors フィールドをもとに/repo/ui の BaseControlFormInput の validationErrors に渡すようにすること
