# frozen_string_literal: true

class AddIndustries < ActiveRecord::Migration[8.0]
  def up
    now = Time.now

    inputs = [
      "コミュニーケーション系",
      "メディア系(動画・ニュース・EC)",
      "ゲーム",
      "広告・マーケティング",
      "クラウド系(SaaS含む)",
      "AI・バーティカルAI",
      "通信",
      "放送",
      "出版",
      "電機・家電(IoT含む)",
      "自動車",
      "電子部品",
      "石油・化学",
      "重工系",
      "インフラ系(ガス・電気)",
      "運輸",
      "鉄道",
      "食品・飲料",
      "日用品",
      "アパレル",
      "小売り",
      "外食",
      "旅行・ホテル",
      "教育",
      "人材紹介",
      "銀行・証券",
      "クレジット・決済・リース",
      "保険",
      "会計",
      "投資事業・投資ファンド",
      "不動産",
      "建設",
      "製薬",
      "医療",
      "病院",
      "介護",
      "コンサル",
      "ITサービス系",
      "商社",
      "官庁",
      "農・林・水産",
      "その他"
    ].map { |industry_name| Industry.new(name: industry_name, created_at: now, updated_at: now).attributes }

    Industry.insert_all(inputs)
  end

  def down
    Industry.delete_all
  end
end
