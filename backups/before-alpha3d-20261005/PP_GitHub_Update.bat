@echo off
setlocal

cd /d "%~dp0"
echo Prompt Pocket GitHub 更新
echo 作業フォルダ: %CD%
echo.

where git >nul 2>&1
if errorlevel 1 goto :git_missing

echo [1/3] 変更を準備しています...
git add -A
if errorlevel 1 goto :failed

git diff --cached --quiet
if not errorlevel 1 goto :push

echo [2/3] 変更を保存しています...
git commit -m "Update Prompt Pocket"
if errorlevel 1 goto :failed

:push
echo [3/3] GitHubへ更新しています...
git push origin main
if errorlevel 1 goto :failed

echo.
echo GitHubへの更新に成功しました
exit /b 0

:git_missing
echo.
echo GitHubへの更新に失敗しました。上のエラー内容を確認してください。
pause
exit /b 1

:failed
echo.
echo GitHubへの更新に失敗しました。上のエラー内容を確認してください。
pause
exit /b 1
