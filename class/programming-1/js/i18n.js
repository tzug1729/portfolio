let currentLang = 'ja';

// 多言語テキストデータ
const i18nData = {
    ja: {
        headerTitle: 'プログラミング1',
        headerSubtitle: '課題ポートフォリオ',
        backText: '戻る',
        
        // タイピングアニメーション用テキスト
        typingText: 'cd ../projects/class/programming-1 && ls -la',
        introDesc: 'プログラミング1の授業で作成した課題の一覧です。各課題のコード、実行結果、説明を確認できます。',
        
        tabPrefix: '課題',
        
        dateLabel: '作成日',
        tagsLabel: 'タグ',
        imagesTitle: 'スクリーンショット / 実行結果',
        codePreviewTitle: 'コードプレビュー',
        
        viewCodeBtn: 'コードを見る',
        openColabBtn: 'Google Colabで開く',
        copyCodeBtn: 'コピー',
        closeBtn: '閉じる',
        
        codeModalTitle: 'コード全体',
        loadingCode: 'コードを読み込み中...',
        errorLoadingCode: 'コードの読み込みに失敗しました',
        codeCopied: 'コードをコピーしました！',
        
        prevImage: '前へ',
        nextImage: '次へ',
        
        noAssignmentSelected: '課題が選択されていません',
        assignmentNotFound: '課題が見つかりません',
        
        filterByTag: 'タグでフィルター',
        clearFilter: 'クリア',
        noMatchingAssignments: '該当する課題が見つかりません',
        
        selectSubject: '科目を選択'
    },
    
    en: {
        headerTitle: 'Programming 1',
        headerSubtitle: 'Assignment Portfolio',
        backText: 'Back',
        
        // Typing animation text
        typingText: 'cd ../projects/class/programming-1 && ls -la',
        introDesc: 'A collection of assignments created in Programming 1. View code, execution results, and descriptions for each assignment.',
        
        tabPrefix: 'Task',
        
        dateLabel: 'Date',
        tagsLabel: 'Tags',
        imagesTitle: 'Screenshots / Results',
        codePreviewTitle: 'Code Preview',
        
        viewCodeBtn: 'View Code',
        openColabBtn: 'Open in Google Colab',
        copyCodeBtn: 'Copy',
        closeBtn: 'Close',
        
        codeModalTitle: 'Full Code',
        loadingCode: 'Loading code...',
        errorLoadingCode: 'Failed to load code',
        codeCopied: 'Code copied!',
        
        prevImage: 'Previous',
        nextImage: 'Next',
        
        noAssignmentSelected: 'No assignment selected',
        assignmentNotFound: 'Assignment not found',
        
        filterByTag: 'Filter by Tag',
        clearFilter: 'Clear',
        noMatchingAssignments: 'No matching assignments found',
        
        selectSubject: 'Select Subject'
    }
};

/**
 * テキストを取得する関数
 * @param {string} key - テキストキー
 * @returns {string} 現在の言語に対応したテキスト
 */
function getText(key) {
    return i18nData[currentLang][key] || key;
}

/**
 * 言語を切り替える関数
 * @param {string} lang - 'ja' または 'en'
 */
function switchLanguage(lang) {
    if (lang !== 'ja' && lang !== 'en') {
        console.error('Invalid language code:', lang);
        return;
    }
    
    currentLang = lang;
    updateUILanguage();
}

/**
 * UIの言語を更新する関数
 */
function updateUILanguage() {
    // ヘッダー更新
    document.getElementById('headerTitle').textContent = getText('headerTitle');
    document.getElementById('headerSubtitle').textContent = getText('headerSubtitle');
    document.getElementById('backText').textContent = getText('backText');
    
    // イントロ更新
    document.getElementById('introDesc').textContent = getText('introDesc');
    
    // フィルターUI更新
    if (typeof updateFilterLanguage === 'function') {
        updateFilterLanguage();
    }
    
    // 言語ボタン更新
    const langBtn = document.getElementById('langToggle');
    const langBtnSpan = langBtn.querySelector('span');
    langBtnSpan.textContent = currentLang === 'ja' ? 'EN' : 'JP';
    
    // タブ再初期化
    if (typeof initializeTabs === 'function') {
        initializeTabs();
        // 現在選択中の課題を維持
        if (window.currentAssignmentId) {
            const selectedTab = document.querySelector(`[data-id="${window.currentAssignmentId}"]`);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
        }
    }
    
    // 課題コンテンツ更新
    if (window.currentAssignmentId) {
        renderAssignment(window.currentAssignmentId);
    }
}

/**
 * 言語を切り替える（トグル）
 */
function toggleLanguage() {
    const newLang = currentLang === 'ja' ? 'en' : 'ja';
    switchLanguage(newLang);
}