// filter.js - タグフィルタリング機能（修正版）
// ============================================
// 【修正内容】
// - フィルタータグの英語化対応を追加
// - タグ抽出ロジックを多言語対応に変更
// - コード整理

let selectedTags = new Set();

/**
 * フィルター機能を初期化
 */
function initializeFilter() {
    const allTags = extractAllTags();
    renderFilterUI(allTags);
}

/**
 * 全課題からタグを抽出（現在の言語に応じて）
 * @returns {Array<string>} タグの配列
 */
function extractAllTags() {
    const tagsSet = new Set();
    const lang = currentLang;
    
    assignmentsData.forEach(assignment => {
        // 現在の言語に応じたタグを使用
        const tags = lang === 'ja' ? assignment.tags : (assignment.tagsEn || assignment.tags);
        tags.forEach(tag => tagsSet.add(tag));
    });
    
    return Array.from(tagsSet).sort();
}

/**
 * フィルターUIをレンダリング
 * @param {Array<string>} tags - 表示するタグの配列
 */
function renderFilterUI(tags) {
    const container = document.querySelector('.container');
    
    // 既存のフィルターセクションがあれば削除
    const existingFilter = container.querySelector('.filter-section');
    if (existingFilter) {
        existingFilter.remove();
    }
    
    const filterHTML = `
        <div class="filter-section">
            <div class="filter-header">
                <h3 class="filter-title" id="filterTitle">
                    <i class="fas fa-filter"></i>
                    <span id="filterTitleText">${getText('filterByTag')}</span>
                </h3>
                <button class="filter-clear-btn" id="clearFilterBtn" style="display: none;">
                    <i class="fas fa-times"></i>
                    <span id="clearFilterText">${getText('clearFilter')}</span>
                </button>
            </div>
            <div class="filter-tags" id="filterTags">
                ${tags.map(tag => `
                    <button class="filter-tag" data-tag="${tag}">
                        ${tag}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    const vscodeTabs = container.querySelector('.vscode-tabs');
    vscodeTabs.insertAdjacentHTML('beforebegin', filterHTML);
    
    // イベントリスナーを設定
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.addEventListener('click', () => toggleTagFilter(btn));
    });
    
    document.getElementById('clearFilterBtn').addEventListener('click', clearAllFilters);
}

/**
 * フィルターUIのテキストを更新（言語切り替え時）
 */
function updateFilterLanguage() {
    const filterTitleText = document.getElementById('filterTitleText');
    const clearFilterText = document.getElementById('clearFilterText');
    
    if (filterTitleText) {
        filterTitleText.textContent = getText('filterByTag');
    }
    
    if (clearFilterText) {
        clearFilterText.textContent = getText('clearFilter');
    }
    
    // タグ自体も再生成（言語切り替え時）
    clearAllFilters();
    const allTags = extractAllTags();
    
    // タグ部分のみ更新
    const tagsContainer = document.getElementById('filterTags');
    if (tagsContainer) {
        tagsContainer.innerHTML = allTags.map(tag => `
            <button class="filter-tag" data-tag="${tag}">
                ${tag}
            </button>
        `).join('');
        
        // イベントリスナーを再設定
        document.querySelectorAll('.filter-tag').forEach(btn => {
            btn.addEventListener('click', () => toggleTagFilter(btn));
        });
    }
}

/**
 * タグフィルターを切り替え
 * @param {HTMLElement} button - クリックされたボタン
 */
function toggleTagFilter(button) {
    const tag = button.getAttribute('data-tag');
    
    if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        button.classList.remove('active');
    } else {
        selectedTags.add(tag);
        button.classList.add('active');
    }
    
    updateClearButtonVisibility();
    applyFilters();
}

/**
 * すべてのフィルターをクリア
 */
function clearAllFilters() {
    selectedTags.clear();
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.classList.remove('active');
    });
    updateClearButtonVisibility();
    applyFilters();
}

/**
 * クリアボタンの表示/非表示を更新
 */
function updateClearButtonVisibility() {
    const clearBtn = document.getElementById('clearFilterBtn');
    if (clearBtn) {
        clearBtn.style.display = selectedTags.size > 0 ? 'flex' : 'none';
    }
}

/**
 * フィルターを適用
 */
function applyFilters() {
    const lang = currentLang;
    
    // フィルターなしの場合は全課題を表示
    if (selectedTags.size === 0) {
        initializeTabs();
        const sortedAssignments = [...assignmentsData].sort((a, b) => b.number - a.number);
        if (sortedAssignments.length > 0) {
            selectTab(sortedAssignments[0].id);
        }
        return;
    }
    
    // フィルター条件に一致する課題を抽出
    const filteredAssignments = assignmentsData.filter(assignment => {
        // 現在の言語に応じたタグを使用
        const tags = lang === 'ja' ? assignment.tags : (assignment.tagsEn || assignment.tags);
        return Array.from(selectedTags).some(selectedTag => tags.includes(selectedTag));
    });
    
    // タブを再生成
    const tabsContainer = document.getElementById('tabsContainer');
    tabsContainer.innerHTML = '';
    
    const sortedAssignments = [...filteredAssignments].sort((a, b) => b.number - a.number);
    
    sortedAssignments.forEach(assignment => {
        const tab = document.createElement('button');
        tab.className = 'tab';
        tab.setAttribute('data-id', assignment.id);
        tab.innerHTML = `
            <i class="fab fa-python"></i>
            <span>${getText('tabPrefix')} ${assignment.number}</span>
        `;
        
        tab.addEventListener('click', () => {
            selectTab(assignment.id);
        });
        
        tabsContainer.appendChild(tab);
    });
    
    // 最初の課題を選択
    if (sortedAssignments.length > 0) {
        selectTab(sortedAssignments[0].id);
    } else {
        // 該当する課題がない場合
        document.getElementById('assignmentContent').innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                <p style="font-size: 18px;">${getText('noMatchingAssignments')}</p>
            </div>
        `;
    }
}