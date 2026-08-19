#!/usr/bin/env bash
# 公開前チェック（v1.4 第12章-4）
#   bash scripts/precheck.sh
# HTMLとJSONを対象に、禁止語・表記ゆれ・構文の使用回数を検査する。

set -u
cd "$(dirname "$0")/.."

TARGETS=$(find . -name "*.html" -not -path "./node_modules/*"; find data -name "*.json")
FAIL=0

echo "── 禁止語（v1.4第6章＋規定書v3：頑張れ・「時間がない」を追加）"
for word in 便利 お得 人気 限定 最新 トレンド バズ 映え 今すぐ お見逃しなく 圧倒的 業界最高 大人気 頑張れ 時間がない; do
  hits=$(grep -n "$word" $TARGETS 2>/dev/null)
  if [ -n "$hits" ]; then
    echo "NG: 「$word」が使われています"
    echo "$hits"
    FAIL=1
  fi
done
[ $FAIL -eq 0 ] && echo "OK: 禁止語なし"

echo ""
echo "── 感嘆符"
if grep -n "！" $TARGETS 2>/dev/null | grep -v "<!--"; then
  echo "NG: 感嘆符が使われています"; FAIL=1
else
  echo "OK: 感嘆符なし"
fi

echo ""
echo "── 表記（商号は前株「株式会社TRY'S」のみ）"
if grep -n "TRY'S INC" $TARGETS 2>/dev/null; then
  echo "NG: 「TRY'S INC.」が残っています"; FAIL=1
else
  echo "OK: 「TRY'S INC.」なし"
fi
if grep -n "TRY'S株式会社" $TARGETS 2>/dev/null; then
  echo "NG: 後株表記が残っています"; FAIL=1
else
  echo "OK: 後株表記なし"
fi

echo ""
echo "── ローマ数字の機種依存文字（第13章-3）"
if grep -n "Ⅱ" $TARGETS 2>/dev/null; then
  echo "NG: U+2161（Ⅱ）が使われています。半角の「II」で組むこと"; FAIL=1
else
  echo "OK: 機種依存のローマ数字なし"
fi

echo ""
echo "── 「〜ではなく」構文の使用箇所（上限：サイト全体で2回）"
grep -n "ではなく" $TARGETS 2>/dev/null | grep -v "^Binary"
echo "（現状：SMEGヒーローの1回のみ。新規追加は不可。"
echo "  ステートメントと製品コピーは挑戦の質 版に差し替え済みで構文を含まない）"

echo ""
echo "── 「物語」「共感」の使用箇所（上限：各5回）"
grep -c "物語" $TARGETS 2>/dev/null | grep -v ":0$" || true
grep -c "共感" $TARGETS 2>/dev/null | grep -v ":0$" || true

echo ""
if [ $FAIL -eq 0 ]; then
  echo "✓ チェック完了：問題なし"
else
  echo "✗ チェック完了：要修正項目があります"
  exit 1
fi
