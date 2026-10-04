# バージョン整合性の更新手順

バージョンの元データは `version.json`。通常は次のコマンドで本体・分離ファイル・画面表示・キャッシュ名を一括更新する。

```
node scripts/release.cjs 2.0-alpha.3d
node scripts/release.cjs --check
```

一括反映対象は index.html、prompt-pocket.js、version-check.js、session-gate.js、CSS、tutorial.html、manual.html、service-worker.js。
新しい分離ファイルにも PP_RELEASE マーカーを付け、scripts/release.cjs の対象に追加する。

更新前のバックアップを残す。公開は全ファイルを同じ単位で行い、version.json だけ先行公開しない。
更新時には全テキストファイルのリリース番号を確認してから、本体キャッシュと本アプリのService Workerを更新する。
登録したカード・画像・設定は消さない。

通常の検証:
```
node tests/regression.cjs
node tests/themes.cjs
node tests/versions.cjs
node tests/worker.cjs
node tests/interaction.cjs
node tests/release.cjs
```

スマートフォン実機では、スクロールと長押し、タップ移動、クリップボード画像貼り付けも確認する。
