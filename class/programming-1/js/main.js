let currentAssignmentId = null;
let currentCodeCache = {};
let currentImageIndex = 0;
let currentImages = [];
let currentFileIndex = 0;
let currentSubject = 'programming-1';

// 科目データ
// subjectId=フォルダ名
const subjects = [
    { id: 'programming-1', name: { ja: 'プログラミング1', en: 'Programming 1' }, icon: 'fa-code' }
];

// ===== 初期化処理 =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting initialization...');

    // 各モジュールを初期化
    initializeSubjectSelector();
    initializeFilter();
    initializeTabs();
    initializeEventListeners();
    initScrollProgress();
    initScrollToTop();

    // イントロの説明文を設定
    const introDesc = document.getElementById('introDesc');
    if (introDesc) {
        introDesc.textContent = getText('introDesc');
    }

    // タイピングアニメーションを開始（遅延実行）
    setTimeout(() => {
        console.log('Starting typing animation...');
        startTypingAnimation();
    }, 500);

    // 最新の課題を確実に選択
    if (assignmentsData.length > 0) {
        // 課題番号でソート（降順）
        const sortedAssignments = [...assignmentsData].sort((a, b) => b.number - a.number);
        const latestAssignment = sortedAssignments[0];
        console.log('Selecting latest assignment:', latestAssignment.id);

        // タブを選択（初期表示なのでアニメーションなし）
        selectTab(latestAssignment.id, false);
    }
});

// ===== 科目選択機能 =====
function initializeSubjectSelector() {
    const dropdown = document.getElementById('subjectDropdownMenu');

    dropdown.innerHTML = subjects.map(subject => `
        <div class="subject-option ${subject.id === currentSubject ? 'active' : ''}" data-subject="${subject.id}">
            <i class="fas ${subject.icon}"></i>
            <span>${subject.name[currentLang]}</span>
        </div>
    `).join('');

    const btn = document.getElementById('subjectDropdownBtn');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
        btn.classList.toggle('active');
    });

    // ドロップダウン外をクリックしたら閉じる
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
        btn.classList.remove('active');
    });

    // 科目選択時の処理
    dropdown.addEventListener('click', (e) => {
        const option = e.target.closest('.subject-option');
        if (option) {
            const subjectId = option.getAttribute('data-subject');
            if (subjectId !== currentSubject) {
                switchSubject(subjectId);
            }
        }
    });
}

function switchSubject(subjectId) {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    currentSubject = subjectId;
    window.location.href = `../${subjectId}/index.html`; //科目ごとのディレクトリを選択する
}

// ===== タブ初期化 =====
function initializeTabs() {
    const tabsContainer = document.getElementById('tabsContainer');
    tabsContainer.innerHTML = '';

    // 課題番号でソート（降順）
    const sortedAssignments = [...assignmentsData].sort((a, b) => b.number - a.number);

    sortedAssignments.forEach(assignment => {
        const tab = document.createElement('button');
        tab.className = 'tab';
        tab.setAttribute('data-id', assignment.id);
        tab.innerHTML = `
            <i class="fab fa-python"></i>
            <span>${getText('tabPrefix')} ${assignment.number}</span>
        `;

        tab.addEventListener('click', () => selectTab(assignment.id));
        tabsContainer.appendChild(tab);
    });
}

// ===== タブ選択 =====
/**
 * タブを選択してコンテンツを表示
 * @param {string} assignmentId - 課題ID
 * @param {boolean} animate - アニメーションを有効にするか（デフォルト: true）
 */
function selectTab(assignmentId, animate = true) {
    // 【修正】点滅防止：トランジションを一時的に無効化
    const contentArea = document.getElementById('assignmentContent');
    if (!animate) {
        contentArea.style.transition = 'none';
    }

    // タブのアクティブ状態を更新
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

    const selectedTab = document.querySelector(`[data-id="${assignmentId}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    currentAssignmentId = assignmentId;
    window.currentAssignmentId = assignmentId;

    // コンテンツをレンダリング
    renderAssignment(assignmentId);

    // 【修正】次のフレームでトランジションを再有効化
    if (!animate) {
        requestAnimationFrame(() => {
            contentArea.style.transition = '';
        });
    }
}

// ===== 課題コンテンツのレンダリング =====
function renderAssignment(assignmentId) {
    const assignment = assignmentsData.find(a => a.id === assignmentId);
    if (!assignment) {
        console.error('Assignment not found:', assignmentId);
        return;
    }

    const contentArea = document.getElementById('assignmentContent');
    const lang = currentLang;
    const displayTags = lang === 'ja' ? assignment.tags : (assignment.tagsEn || assignment.tags);

    // セクションHTMLの生成
    const sectionsHTML = assignment.sections ? assignment.sections.map(section => `
        <div class="detail-section">
            <h3 class="detail-section-title">
                <i class="fas ${section.icon}"></i>
                ${section.title[lang]}
            </h3>
            <p class="detail-section-content">${section.content[lang]}</p>
        </div>
    `).join('') : '';

    contentArea.innerHTML = `
        <div class="assignment-header">
            <h2 class="assignment-title">
                <i class="fas fa-file-code"></i>
                ${assignment.title[lang]}
            </h2>
            <div class="assignment-meta">
                <span class="meta-item">
                    <i class="far fa-calendar-alt"></i>
                    ${getText('dateLabel')}: ${assignment.date}
                </span>
            </div>
        </div>
        
        <p class="assignment-description">${assignment.description[lang]}</p>
        
        <div class="tags">
            ${displayTags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        
        ${sectionsHTML}
        
        <div class="images-section">
            <h3 class="section-title">
                <i class="far fa-images"></i>
                ${getText('imagesTitle')}
            </h3>
            <div class="images-grid">
                ${assignment.images.map((img, index) => `
                    <div class="image-card loading" data-index="${index}">
                        <img src="${img.src}" alt="${img.caption[lang]}" loading="lazy" onload="this.parentElement.classList.remove('loading')">
                        <div class="image-caption">${img.caption[lang]}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="actions">
            <button class="btn btn-primary" id="viewCodeBtn">
                <i class="fas fa-code"></i>
                ${getText('viewCodeBtn')}
            </button>
            <a href="${assignment.colabLink}" target="_blank" rel="noopener" class="btn btn-secondary">
                <i class="fab fa-google"></i>
                ${getText('openColabBtn')}
            </a>
        </div>
    `;

    setupAssignmentEventListeners(assignment);
}

// ===== イベントリスナー設定 =====
function setupAssignmentEventListeners(assignment) {
    // コード表示ボタン
    const viewCodeBtn = document.getElementById('viewCodeBtn');
    if (viewCodeBtn) {
        viewCodeBtn.addEventListener('click', () => loadAndShowCode(assignment));
    }

    // 画像カードのクリックイベント
    const imageCards = document.querySelectorAll('.image-card');
    imageCards.forEach((card) => {
        card.addEventListener('click', () => {
            const index = parseInt(card.getAttribute('data-index'));
            currentImages = assignment.images;
            showImageModal(index);
        });
    });
}

// ===== タイピングアニメーション =====
function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) {
        console.warn('typingText element not found');
        return;
    }

    // 【修正】getText関数を使用
    const text = getText('typingText');
    let index = 0;
    typingElement.textContent = '';

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 40);
        }
    }

    type();
}

// main.js - メインロジック (修正版 - Part 2)
// ============================================
// イベントリスナーとヘルパー関数

// ===== 全体のイベントリスナー設定 =====
function initializeEventListeners() {
    // 【修正】アイコンのみクリックでトップにスクロール
    const brandIcon = document.querySelector('.brand > i');
    if (brandIcon) {
        brandIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollToTop();
        });
    }

    // 言語切り替えボタン
    document.getElementById('langToggle').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLanguage();
    });

    // 画像モーダルを閉じる
    const closeImageBtn = document.getElementById('closeImageModalBtn');
    if (closeImageBtn) {
        closeImageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('imageModal').classList.remove('active');
        });
    }

    // 画像モーダルのナビゲーション
    document.getElementById('prevImageBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        changeImage(-1);
    });

    document.getElementById('nextImageBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        changeImage(1);
    });

    // モーダルの背景をクリックしたら閉じる
    document.getElementById('codeModal').addEventListener('click', (e) => {
        if (e.target.id === 'codeModal') {
            document.getElementById('codeModal').classList.remove('active');
        }
    });

    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target.id === 'imageModal') {
                imageModal.classList.remove('active');
            }
        });
    }

    // キーボードショートカット
    document.addEventListener('keydown', (e) => {
        const codeModal = document.getElementById('codeModal');
        const imageModal = document.getElementById('imageModal');

        if (e.key === 'Escape') {
            codeModal.classList.remove('active');
            imageModal.classList.remove('active');
        }

        if (imageModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
}

// ===== ファイルアイコン取得 =====
function getFileIcon(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();

    const fontAwesomeIcons = {
        'py': { type: 'fontawesome', icon: 'fab fa-python', color: '#3776AB' },
        'html': { type: 'fontawesome', icon: 'fab fa-html5', color: '#E34F26' },
        'css': { type: 'fontawesome', icon: 'fab fa-css3-alt', color: '#1572B6' },
        'js': { type: 'fontawesome', icon: 'fab fa-js', color: '#F7DF1E' },
        'json': { type: 'fontawesome', icon: 'fas fa-file-code', color: '#5E5C5C' },
        'md': { type: 'fontawesome', icon: 'fab fa-markdown', color: '#000000' },
        'txt': { type: 'fontawesome', icon: 'fas fa-file-alt', color: '#5E5C5C' }
    };

    const deviconIcons = {
        'java': { type: 'devicon', icon: 'devicon-java-plain', color: '#007396' },
        'cpp': { type: 'devicon', icon: 'devicon-cplusplus-plain', color: '#00599C' },
        'c': { type: 'devicon', icon: 'devicon-c-plain', color: '#A8B9CC' },
        'ts': { type: 'devicon', icon: 'devicon-typescript-plain', color: '#3178C6' }
    };

    if (fontAwesomeIcons[ext]) return fontAwesomeIcons[ext];
    if (deviconIcons[ext]) return deviconIcons[ext];

    return { type: 'fontawesome', icon: 'fas fa-file', color: '#5E5C5C' };
}

// ===== コード表示モーダル =====
async function loadAndShowCode(assignment) {
    const modal = document.getElementById('codeModal');
    modal.classList.add('active');

    // 複数ファイル対応（将来用）
    const hasMultipleFiles = assignment.codeFiles && assignment.codeFiles.length > 0;
    const files = hasMultipleFiles
        ? assignment.codeFiles
        : [{
            name: assignment.codeFilePath ? assignment.codeFilePath.split('/').pop() : 'code.py',
            path: assignment.codeFilePath,
            language: 'python'
        }];

    renderCodeTabs(files, assignment);

    currentFileIndex = 0;
    await loadCodeFile(files[0], assignment);
}

function renderCodeTabs(files, assignment) {
    const modalContent = document.getElementById('codeModal').querySelector('.modal-content');

    // 既存のタブとヘッダーを削除
    const existingTabs = modalContent.querySelector('.code-modal-tabs');
    if (existingTabs) existingTabs.remove();

    const tabsHTML = `
        <div class="code-modal-tabs">
            <div class="code-tabs-container" id="codeTabsContainer">
                ${files.map((file, index) => {
        const iconInfo = getFileIcon(file.name);
        let iconHTML = '';

        if (iconInfo.type === 'fontawesome') {
            iconHTML = `<i class="${iconInfo.icon}" style="color: ${iconInfo.color}"></i>`;
        } else if (iconInfo.type === 'devicon') {
            iconHTML = `<i class="${iconInfo.icon}" style="color: ${iconInfo.color}"></i>`;
        }

        return `
                        <button class="code-tab ${index === 0 ? 'active' : ''}" data-index="${index}">
                            ${iconHTML}
                            <span>${file.name}</span>
                        </button>
                    `;
    }).join('')}
            </div>
            <div class="modal-actions">
                <button id="copyCodeBtn" class="modal-btn" title="${getText('copyCodeBtn')}">
                    <i class="fas fa-copy"></i>
                </button>
                <button id="closeModalBtn" class="modal-btn close-btn" title="${getText('closeBtn')}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;

    modalContent.insertAdjacentHTML('afterbegin', tabsHTML);

    // タブのクリックイベント
    const codeTabs = modalContent.querySelectorAll('.code-tab');
    codeTabs.forEach((tab, index) => {
        tab.addEventListener('click', async () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            currentFileIndex = index;
            await loadCodeFile(files[index], assignment);
        });
    });

    // コピーボタン
    document.getElementById('copyCodeBtn').addEventListener('click', () => {
        const code = document.getElementById('modalCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
            showToast(getText('codeCopied'), 'success');
        });
    });

    // 閉じるボタン
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        document.getElementById('codeModal').classList.remove('active');
    });
}

// ===== コードファイル読み込み =====
async function loadCodeFile(file, assignment) {
    const modalCode = document.getElementById('modalCode');
    const modalBody = modalCode.parentElement.parentElement;

    modalBody.classList.add('loading');
    modalCode.textContent = '';

    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
    modalBody.appendChild(loadingDiv);

    const cacheKey = `${assignment.id}_${file.name}`;

    // キャッシュがあればそれを使用
    if (currentCodeCache[cacheKey]) {
        modalBody.classList.remove('loading');
        if (loadingDiv.parentNode) {
            modalBody.removeChild(loadingDiv);
        }
        displayCode(currentCodeCache[cacheKey], file.language);
        return;
    }

    // ファイルを取得（fetch → XMLHttpRequest フォールバック）
    try {
        let code = null;

        // まずfetchを試す
        try {
            const response = await fetch(file.path);
            if (response.ok) {
                code = await response.text();
            }
        } catch (fetchError) {
            console.warn('Fetch failed, trying XMLHttpRequest:', fetchError);
        }

        // fetchが失敗した場合、XMLHttpRequestを試す
        if (!code) {
            code = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', file.path, true);
                xhr.onload = function () {
                    if (xhr.status === 200 || xhr.status === 0) {
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(`XHR failed: ${xhr.status}`));
                    }
                };
                xhr.onerror = function () {
                    reject(new Error('XHR network error'));
                };
                xhr.send();
            });
        }

        if (!code) {
            throw new Error('Both fetch and XHR failed');
        }

        // キャッシュに保存
        currentCodeCache[cacheKey] = code;

        modalBody.classList.remove('loading');
        if (loadingDiv.parentNode) {
            modalBody.removeChild(loadingDiv);
        }
        displayCode(code, file.language);

    } catch (error) {
        console.error('Failed to load code:', error);
        console.error('Attempted path:', file.path);
        modalBody.classList.remove('loading');
        if (loadingDiv.parentNode) {
            modalBody.removeChild(loadingDiv);
        }
        modalCode.textContent = getText('errorLoadingCode') + '\n\nPath: ' + file.path + '\nError: ' + error.message;
    }
}

// ===== コード表示 =====
function displayCode(code, language = 'python') {
    const modalCode = document.getElementById('modalCode');
    const pre = modalCode.parentElement;

    // 既存の行番号を削除
    const existingLineNumbers = pre.querySelector('.line-numbers');
    if (existingLineNumbers) {
        existingLineNumbers.remove();
    }

    modalCode.textContent = code;
    modalCode.className = `language-${language}`;

    // 【修正】行番号を生成 - 幅を調整
    const lines = code.split('\n');
    const lineCount = lines.length;
    const maxDigits = lineCount.toString().length;
    // 行番号の幅を最小限に（余白を削減）
    const lineNumberWidth = Math.max(40, maxDigits * 9 + 16);

    const lineNumbers = document.createElement('div');
    lineNumbers.className = 'line-numbers';
    lineNumbers.style.width = lineNumberWidth + 'px';

    for (let i = 1; i <= lineCount; i++) {
        const lineNum = document.createElement('span');
        lineNum.textContent = i;
        lineNumbers.appendChild(lineNum);
    }

    pre.style.position = 'relative';
    // 【修正】コードの左マージンも調整（行番号幅 + 少しの余白）
    pre.style.paddingLeft = (lineNumberWidth + 5) + 'px';
    pre.insertBefore(lineNumbers, modalCode);

    // シンタックスハイライト
    if (typeof Prism !== 'undefined') {
        Prism.highlightElement(modalCode);
    }
}

// ===== 画像モーダル =====
function showImageModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    if (currentImages.length === 0) return;

    const image = currentImages[index];
    modalImage.src = image.src;
    modalImage.alt = image.caption[currentLang];

    modal.classList.add('active');
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    } else if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    }

    showImageModal(currentImageIndex);
}