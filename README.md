# 🗺️ Trip Planner App

旅行プランを簡単に作成・管理できる Web アプリです。  
47都道府県の観光地情報をチェックし、お気に入りの場所を保存し、オリジナルの旅程を立てることができます。

[▶ アプリを開く](https://trip-app-kei.vercel.app/)

---

## 🎥 デモ動画

以下はアプリの操作デモ動画です（YouTube「限定公開」）。

[▶ YouTubeでデモを見る](https://youtu.be/your-video-id)

---

## ✨ 主な機能

- 都道府県ごとの観光地・宿泊施設・移動情報を閲覧
- お気に入り登録機能（ログインユーザーのみ）
- マップ上で目的地を選択可能
- ログイン/ログアウト機能（Firebase Authentication）
- 旅程をカレンダー形式で表示・管理
- モダンで直感的な UI（shadcn/ui 使用）

---

## 🛠️ 使用技術

- **フレームワーク**: Next.js (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS, shadcn/ui
- **認証・データベース**: Firebase (Authentication, Firestore)
- **ホスティング**: Vercel

---

## ⚙️ セットアップ方法

```bash
# リポジトリをクローン
git clone https://github.com/kei0710KEI/trip-app.git
cd trip-app

# パッケージをインストール
npm install

# Firebase の環境変数を設定（.env.local）
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxx

# 開発サーバー起動
npm run dev
