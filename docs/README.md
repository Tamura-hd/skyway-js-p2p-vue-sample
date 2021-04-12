# SkyWay sample vue app

![Vue.js](https://img.shields.io/badge/Vue.js-2.6.11-%234FC08D?logo=Vue.js) &nbsp;
![Vuetify](https://img.shields.io/badge/Vuetify-2.2.11-%231867C0?logo=Vuetify) &nbsp;
[![GitHub](https://img.shields.io/github/license/Tamura-hd/skyway-js-p2p-vue-sample)](/LICENSE)
<br>

#### 日本語 | ~~English~~
<br>

WebRTC のサンプルアプリです。<br>
ブラウザで、ビデオ通話をする事ができます。<br>
[以前アップした、SkyWay を使用した、1対1ビデオ通話アプリ](https://github.com/Tamura-hd/skyway-js-p2p-sample)の、
Vue.js に移植したバージョンです。<br>
<br>

# Introduction
1. API キーを使用するため、はじめに [SkyWay](https://webrtc.ecl.ntt.com/) へのアカウント登録が必要です。<br>
API キーを取得し、ダッシュボードより利用可能ドメインを追加して下さい。
1. ルート直下に .env.local ファイルを作成し、以下のコードを記載します。<br>
```
NODE_ENV=development
VUE_APP_SKYWAY_API_KEY=
```
3. 2行目の `VUE_APP_SKYWAY_API_KEY=` の右側に API キーを入力します。(ルート直下にある `.env` ファイルは、本番用です。)

<br>

# Library
- SkyWay Javascript SDK
- Vuex
- Vuetify
- Vue-i18n

<br>

# Operation verification
Browser
- Chrome
- Safari

Device
- iPhone SE
- MacBook Pro
