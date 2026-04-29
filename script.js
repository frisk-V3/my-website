(function() {
    // 移転先URL
    const newUrl = "https://frisk-v3.github.io/";

    // 1000ミリ秒（1秒）経過後に実行
    setTimeout(function() {
        // 現在のタブでURLを置き換え（戻るボタンで戻れるようにしたくない場合はreplace）
        window.location.replace(newUrl);
    }, 5000);
})();
