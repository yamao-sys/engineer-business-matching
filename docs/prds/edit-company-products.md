## 機能概要

Business 企業紹介 プロダクト編集

## 要件

- Business アプリケーションで URL は /company-products
- API エンドポイントは/api/v1/business/company-products(index, put)
- 1 企業は N 個のプロダクトを持てる
- フォームの初期表示は index アクションで取得したもの
- 1 つあたりのプロダクトごとの入力項目は名前, 説明, URL, ロゴ, 「更新する」ボタン
- 「追加する」ボタンを押下すると、フォームのモーダルが現れ、入力して「更新する」ボタン押下で保存
- 登録済みのプロダクトはそれぞれ「編集する」ボタン押下でフォームのモーダルが現れ、入力して「更新する」ボタン押下で保存
- 登録済みのプロダクトはそれぞれ「削除する」ボタン押下で確認ダイアログ → 削除
- UI は共通部は frontend/packages/ui/src 配下のものを使用し、不足分は Tailwind で作成
- コンポーネント設計, Server Actions, Tanstack Query の使い方は既存の frontend/apps/business/features 配下のものと同じように

この仕様書を読んで、以下を教えてください：

1. あなたの理解している実装内容
2. 不明な点や確認が必要な箇所
3. 実装の順序と各ステップでのチェックポイント
4. 想定される技術的課題

5. 理解している実装内容

フロントエンド実装範囲：

- /company-products ページでプロダクト一覧表示・管理
- 追加・編集・削除機能をモーダルで実装
- プロダクト項目：名前、説明、URL、ロゴ（画像アップロード）
- 既存パターンに従った構造：actions/components/queries

→ OK。バッチリ。

バックエンド状況：

- API 側は完全実装済み（CRUD + 画像アップロード）
- /api/v1/business/company-products エンドポイント利用可能
- TypeSpec 定義済みで API クライアント生成済み

→ OK。バッチリ。

2. 不明な点や確認が必要な箇所

A. モーダル実装方針

- 既存に Modal コンポーネントなし - 新規作成が必要
- @repo/ui に追加するか、feature ローカルで実装するか？

→ feature ローカルで実装しよう。

B. 画像アップロード実装詳細

- プレビュー表示の仕様（サイズ、フォールバック画像など）
- アップロード中のローディング状態表示方法

→ 既存のファイル入力コンポーネント(BaseControlFormImage)を使用しよう。
ローディング状態は既存の他機能と同様、Tanstack Query による状態管理で行おう。/profile のページの features を参考に。

C. 削除確認ダイアログ

- confirm() 使用かカスタムダイアログか？

→ confirm()で OK

3. 実装の順序と各ステップでのチェックポイント

Step 1: 基本構造作成
frontend/apps/business/features/CompanyProducts/
├── actions/companyProducts.ts
├── components/CompanyProductsTemplate/
├── queries/companyProductQueries.ts
└── types/index.d.ts（必要に応じて）

→ OK

Step 2: 一覧画面実装

- プロダクト表示
- 追加・編集・削除ボタン配置
- ✓ データ取得・表示確認

→ OK

Step 3: モーダル・フォーム実装

- Modal 基盤コンポーネント
- プロダクトフォーム
- ✓ バリデーション動作確認

→ OK

Step 4: CRUD 操作実装

- Server Actions 統合
- TanStack Query 連携
- ✓ 楽観的更新・エラーハンドリング確認

→ OK

Step 5: 画像アップロード実装

- ロゴアップロード・プレビュー
- ✓ ファイルサイズ制限・形式チェック確認

→ OK
