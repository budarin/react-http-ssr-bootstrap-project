const renderRemoveSplashScript = `<script id="removeSplashScript">
                window.clearTimeout(window.splashTimer);

                function clearSplash() {
                    const rootEl = document.body;
                    const splashEl = document.getElementById('splash');

                    while(rootEl.children.length) {
                        rootEl.removeChild(rootEl.children[0]);
                    }

                    delete window.splashTimer;
                    delete window.clearSplashTimer;
                    delete window.onEndOfShowingSplash;
                }

                if (window.showingSpash) {
                    window.onEndOfShowingSplash = clearSplash;
                } else {
                    clearSplash();
                }
            </script>
        `;

export default renderRemoveSplashScript;
