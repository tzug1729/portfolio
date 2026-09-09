// scroll.js - スクロール制御

/**
 * スクロールプログレスバーを初期化
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.id = 'scrollProgress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', updateScrollProgress);
}

/**
 * スクロール位置に応じてプログレスバーを更新
 */
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

/**
 * トップへ戻るボタンを初期化
 */
function initScrollToTop() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.id = 'scrollToTopBtn';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);
    
    // スクロール位置に応じてボタンを表示/非表示
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', scrollToTop);
}

/**
 * ページトップにスムーズスクロール
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}