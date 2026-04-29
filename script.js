(function() {
    const newUrl = "https://frisk-v3.github.io/";
    
    // 即座に今のタブで移動
    // replaceが効かないブラウザ向けにhrefも併用
    window.location.replace(newUrl);
    
    // 万が一移動しなかった時のためのタイマー（0.5秒後）
    setTimeout(function() {
        window.location.href = newUrl;
    }, 500);
})();
