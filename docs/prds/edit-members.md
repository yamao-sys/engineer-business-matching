## 機能概要

Business 企業紹介 メンバー編集

## 要件

- Business アプリケーションで URL は /company-members
- API エンドポイントは/api/v1/business/company-members(index, show, create, update, destroy)
- 1 企業は N 人のメンバーの管理ができる
- フォームの初期表示は index アクションで取得したもの
- 1 人あたりのメンバーごとの入力項目は表示名, 概要, アイコン, 「更新する」ボタン
- 「追加する」ボタンを押下すると、フォームのモーダルが現れ、入力して「更新する」ボタン押下で保存
- 登録済みのメンバーはそれぞれ「編集する」ボタン押下でフォームのモーダルが現れ、入力して「更新する」ボタン押下で保存
- 登録済みのメンバーはそれぞれ「削除する」ボタン押下で確認ダイアログ → 削除
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

アーキテクチャ構造：

- /frontend/apps/business/app/company-members/page.tsx：ページエントリーポイント
- /frontend/apps/business/features/CompanyMembers/：feature 構造で実装
  - components/CompanyMembersTemplate/：メインテンプレート
  - components/CompanyMembersList/, CompanyMemberRow/, CompanyMemberModal/, CompanyMemberForm/：各 UI 部品
  - actions/companyMembers.ts：Server Actions（CRUD 操作）
  - queries/companyMemberQueries.ts：TanStack Query 定義

データ構造：

- CompanyMember 型：id, name, position, description, iconUrl
- API エンドポイント：全 CRUD 操作対応済み（/frontend/apps/business/apis/company-member/company-member.ts:49-398）

UI 機能：

- メンバー一覧表示
- 「追加する」ボタン → モーダルフォーム → 保存
- 各メンバーの「編集する」ボタン → モーダルフォーム → 更新
- 各メンバーの「削除する」ボタン → 確認ダイアログ → 削除

2. 不明な点や確認が必要な箇所

- position フィールドの表示ラベル（「役職」「ポジション」等）
- アイコン画像のアップロード方法（ファイル選択 or URL 入力）
- バリデーションルール（必須項目、文字数制限等）
- エラーハンドリングの表示方法

3. 実装の順序とチェックポイント

1. ページとテンプレート作成
1. Server Actions 実装 → API クライアント動作確認
1. TanStack Query 定義 → データ取得確認
1. 一覧表示コンポーネント → 初期データ表示確認
1. モーダル・フォームコンポーネント → CRUD 操作確認
1. 統合テスト → 全機能動作確認

1. 想定される技術的課題

- 画像アップロード処理：CompanyProducts と同様の S3 アップロード実装が必要
- フォームバリデーション：クライアント・サーバー両サイドでの検証
- 楽観的更新：TanStack Query でのリスト同期
- モーダル状態管理：作成・編集モードの切り替え

5. 理解している実装内容

既存の/company-products と同じパターンで実装可能。API クライアント・型定義は作成済みのため、フロントエンド実装に集中できます。UI 共通部品も十分揃っており、Tailwind での追加実装も最小限で済む見込みです
。

ありがとう。 2. 不明な点や確認が必要な箇所について

- position フィールドの表示ラベル（「役職」「ポジション」等）
  → ドロップダウンのような選択式にせず、テキストで扱うので特にラベルは考えずで OK

- アイコン画像のアップロード方法（ファイル選択 or URL 入力）
  → /company-products の logo のような形式で OK

- バリデーションルール（必須項目、文字数制限等）
  → これは API 側で実装済みなので、フロントエンドでは/company-products のように、API の errors field をもとに@repo/ui の入力項目のコンポーネントに validationErrors の props で渡すようにする

- エラーハンドリングの表示方法
  → これも/company-products と同じで 400 エラー以外は Business で共通の error.tsx で捕捉するから考えなくて OK
