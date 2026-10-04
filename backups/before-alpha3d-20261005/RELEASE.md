# バージョン整合性の更新手順

更新時には必ず以下を同じリリース番号に揃える。

- index.html の PP_RELEASE コメント・pp-release meta・画面表示・CSS/JSのURL
- assets/js/prompt-pocket.js の PP_RELEASE・起動時照合値・APP_VERSION
- assets/js/version-check.js の PP_RELEASE・release
- assets/css/prompt-pocket.css の PP_RELEASE・--pp-release
- tutorial.html と manual.html の PP_RELEASE
- version.json の version・displayVersion
- service-worker.js の PP_RELEASE・RELEASE・CACHE_NAME・APP_SHELL 内のURL

新しく分離するHTML/JS/CSSにも `PP_RELEASE` マーカーを付け、読み込む前に本体と照合する。更新前のバックアップを残す。

公開時は全ファイルを同じ公開単位で配信し、version.jsonだけ先行して公開しない。更新ボタンでは構成ファイルの番号が揃ったことを確認してから、本体キャッシュと本アプリのService Workerだけを更新する。localStorageやIndexedDBの登録データは消さない。

確認: node tests/regression.cjs / node tests/themes.cjs / node tests/versions.cjs / node tests/worker.cjs
バージョン変更時はテーマテストの表示名確認と、versions.cjsの現在版フィクスチャも更新する。
