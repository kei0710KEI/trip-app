# 🗺️ Trip Planner App

旅行プランを簡単に作成・管理できる Web アプリです。  
日本全国47都道府県だけでなく、小さな市町村から有名な観光地まで幅広くカバーしています。ユーザーの好みに合わせてAIが旅行プランを自動生成し、画像とともに旅程を確認できます。

[▶ アプリを開く](https://trip-app-gamma.vercel.app/)

---

## 🎥 デモ動画

以下はアプリの操作デモ動画です（YouTube「限定公開」）。

[▶ YouTubeでデモを見る](https://youtu.be/_u4H5-KPGWQ)

---

## ✨ 主な機能

- ログイン/ログアウト機能（Firebase Authentication）
- AIによる旅行プランの自動生成（画像付き）
- これまでに生成した旅行プランを閲覧可能
- トークンシステム導入（旅行生成に10トークン使用）
- 初回ログイン時に50トークン付与
- トークン購入機能（Stripe連携による決済）
- モダンで直感的な UI（shadcn/ui 使用）

> ⚠️ ログインしていない状態では旅行プランの生成はできません。

---

## 🛠️ 使用技術

- **フレームワーク**: Next.js (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS, shadcn/ui, Framer-motion
- **認証・データベース**: Firebase Authentication, Firestore
- **API**: Gemini AI, Google Places API (New)
- **決済**: Stripe
- **ホスティング**: Vercel

---

## ⚙️ セットアップ方法

```bash
# リポジトリをクローン
git clone https://github.com/kei0710KEI/trip-app.git
cd trip-app

# パッケージをインストール
npm install

# Google APIs
NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=xxxxx
NEXT_PUBLIC_GOOGLE_GEMINI_AI_API_KEY=xxxxx
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID=xxxxx

# Stripe test
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=xxxxx
STRIPE_SECRET_KEY=xxxxx
STRIPE_WEBHOOK_SECRET=xxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxxxx

# 開発サーバー起動
npm run dev
