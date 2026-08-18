# 📊 Belajar Vue.js

Repository untuk mempelajari dasar-dasar **Vue.js** menggunakan **Vite**, **TypeScript**, dan konsep component-based development.

Project latihan yang dibuat adalah **Crypto Dashboard** untuk memahami bagaimana Vue.js digunakan untuk membangun antarmuka dashboard yang modular dan interaktif.

## 🚀 Tech Stack

* Vue.js
* TypeScript
* Vite
* CSS
* Component-based Architecture

## 📁 Struktur Project

```text
belajar-vue/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       └── main.css
│   │
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── Sidebar.vue
│   │   ├── StatCard.vue
│   │   ├── CryptoCard.vue
│   │   ├── MarketChart.vue
│   │   ├── CryptoTable.vue
│   │   └── Loading.vue
│   │
│   ├── data/
│   │   └── crypto.ts
│   │
│   ├── types/
│   │   └── crypto.ts
│   │
│   ├── views/
│   │   └── Dashboard.vue
│   │
│   ├── App.vue
│   └── main.ts
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Tujuan Belajar

Project ini digunakan untuk mempelajari:

* Struktur project Vue.js
* Single File Components (`.vue`)
* Props dan Events
* Reactive State
* `ref()` dan `computed()`
* Conditional Rendering
* List Rendering
* Component Composition
* TypeScript pada Vue.js
* Pengelolaan data
* Pemisahan `components`, `views`, `data`, dan `types`

## 🛠️ Menjalankan Project

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build untuk production:

```bash
npm run build
```

Preview hasil production:

```bash
npm run preview
```

## 📌 Project

### Crypto Dashboard

Dashboard sederhana untuk menampilkan informasi cryptocurrency seperti:

* Total Market Cap
* Market Volume
* Trending Crypto
* Harga cryptocurrency
* Perubahan harga
* Market chart
* Crypto market table

Project ini akan dikembangkan secara bertahap seiring proses belajar Vue.js.

---

**Status:** 🚧 In Development

**Purpose:** Learning & Practice
