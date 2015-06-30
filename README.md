# Apricot

Apricot Site: http://daiz-projects.appspot.com/preview/apricot/index.html

[![Apricot](http://img.youtube.com/vi/BrSg3GxdEbs/0.jpg)](https://www.youtube.com/watch?v=BrSg3GxdEbs)

# 初回のみ
Polymerのpaper-elementsを使用する場合は、ZIPパッケージを解凍してください。
```
$ cd www
$ unzip polymer_components.zip
$ cd ../
```

# レシピ名とリソース名を与えてビルドする
```
$ sh anzu.sh build myRecipe5 R5/app
```

# Chrome アプリとして実行する
```
$ sh anzu.sh ca
```

Mac以外でChromeを使用している場合は、Apricot/lib/launch_chrome_app.py の19行目の`path_chrome`を適当なものに
置き換えてください。