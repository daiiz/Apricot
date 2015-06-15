#!/bin/sh

# ビルドトリガファイル
# anzu --> apricot.py(build)

# chmod 755 anzu
#
# ./anzu run <RecipeFile>
# ./anzu build <RecipeFile>
# ./anzu load ca

# version 0.1.0 (@2015/06/13 19:15)
# version 0.1.1 (@2015/06/14 00:05)

if [ $# == 2 ]; then
    # ビルドのみ実行
    if [ $1 = "build" ]; then
        python apricot.py $2
    # ビルド後ChromeAppとして起動
    elif [ $1 = "run" ]; then
        python apricot.py $2
        python lib/launch_chrome_app.py run www
    fi
# アプリの起動のみ実行
elif [ $# == 1 ]; then
    if [ $1 = "ca" ]; then
        python lib/launch_chrome_app.py run www
    fi
fi
