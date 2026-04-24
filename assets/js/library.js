// ========================================
// Tarot Card Library - 타로 백과사전
// ========================================

// 전역 상태
let currentCategory = 'all';
let filteredCards = [];
let currentCardIndex = -1;

// 카드 카테고리 분류
function getCardCategory(cardId) {
    if (cardId >= 0 && cardId <= 21) {
        return 'major';
    } else if (cardId >= 22 && cardId <= 35) {
        return 'wands';
    } else if (cardId >= 36 && cardId <= 49) {
        return 'cups';
    } else if (cardId >= 50 && cardId <= 63) {
        return 'swords';
    } else if (cardId >= 64 && cardId <= 77) {
        return 'pentacles';
    }
    return 'unknown';
}

// 카드 수트 이름
function getCardSuit(cardId) {
    const category = getCardCategory(cardId);
    const suitNames = {
        'major': '메이저 아르카나',
        'wands': '완드',
        'cups': '컵',
        'swords': '소드',
        'pentacles': '펜타클'
    };
    return suitNames[category] || '';
}

// 카드 번호 표시
function getCardNumber(cardId) {
    if (cardId >= 0 && cardId <= 21) {
        return `${String(cardId).padStart(2, '0')}/21`;
    } else if (cardId >= 22 && cardId <= 35) {
        return `완드 ${cardId - 21}/14`;
    } else if (cardId >= 36 && cardId <= 49) {
        return `컵 ${cardId - 35}/14`;
    } else if (cardId >= 50 && cardId <= 63) {
        return `소드 ${cardId - 49}/14`;
    } else if (cardId >= 64 && cardId <= 77) {
        return `펜타클 ${cardId - 63}/14`;
    }
    return '';
}

// 카드 리스트 렌더링
function renderCardLibrary(cards) {
    const grid = document.getElementById('card-library-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (cards.length === 0) {
        grid.innerHTML = `
            <div class="library-empty">
                <div class="library-empty-icon">🔮</div>
                <p>검색 결과가 없습니다.</p>
            </div>
        `;
        return;
    }
    
    cards.forEach(card => {
        const category = getCardCategory(card.id);
        const cardElement = document.createElement('div');
        cardElement.className = 'library-card-item';
        cardElement.onclick = () => openCardDetail(card.id);
        
        // 키워드 추출 (간단하게)
        const uprightKeywords = extractKeywords(card.upright.meaning);
        const keywordsHtml = uprightKeywords.slice(0, 4).map(kw => 
            `<span class="keyword-tag">${kw}</span>`
        ).join('');
        
        const suitBadge = category !== 'major' ? `<span class="library-card-suit">${getCardSuit(card.id)}</span>` : '';
        
        cardElement.innerHTML = `
            <div class="library-card-image">
                ${suitBadge}
                <img src="${card.imagePath}" alt="${card.name}" 
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22250%22><rect fill=%22%232a2a4a%22 width=%22150%22 height=%22250%22 rx=%2210%22/><text fill=%22%23d4af37%22 x=%2275%22 y=%22125%22 text-anchor=%22middle%22 font-size=%2240%22>✦</text></svg>'">
            </div>
            <div class="library-card-info">
                <div class="library-card-number">${getCardNumber(card.id)}</div>
                <div class="library-card-name-en">${card.name}</div>
                <div class="library-card-name-ko">${getKoreanName(card.name)}</div>
                <div class="library-card-keywords">
                    ${keywordsHtml || '<span class="keyword-tag">키워드 없음</span>'}
                </div>
            </div>
        `;
        
        grid.appendChild(cardElement);
    });
}

// 키워드 추출 (간단한 방법)
function extractKeywords(text) {
    // 의미에서 중요한 키워드 추출 (간단 구현)
    const commonWords = ['의', '을', '를', '이', '가', '은', '는', '에서', '에게', '로', '으로', '와', '과', '그리고', '또는', '하지만', '그러나', '때문', '수', '것', '있', '없', '되', '되', '되'];
    const words = text.split(/[,\s.]+/).filter(w => 
        w.length > 2 && !commonWords.includes(w)
    );
    return [...new Set(words)].slice(0, 6);
}

// 카드 이름 한글 변환 (간단한 매핑)
function getKoreanName(englishName) {
    // 주요 카드 한글명 매핑
    const nameMap = {
        'The Fool': '바보',
        'The Magician': '마법사',
        'The High Priestess': '여교황',
        'The Empress': '여황제',
        'The Emperor': '황제',
        'The Hierophant': '교황',
        'The Lovers': '연인',
        'The Chariot': '전차',
        'Strength': '힘',
        'The Hermit': '은둔자',
        'Wheel of Fortune': '운명의 바퀴',
        'Justice': '정의',
        'The Hanged Man': '매달린 남자',
        'Death': '죽음',
        'Temperance': '절제',
        'The Devil': '악마',
        'The Tower': '탑',
        'The Star': '별',
        'The Moon': '달',
        'The Sun': '태양',
        'Judgement': '심판',
        'The World': '세계'
    };
    
    // Ace, Two, Three 등 숫자 변환
    const numberMap = {
        'Ace': '에이스',
        'Two': '2',
        'Three': '3',
        'Four': '4',
        'Five': '5',
        'Six': '6',
        'Seven': '7',
        'Eight': '8',
        'Nine': '9',
        'Ten': '10',
        'Page': '시종',
        'Knight': '기사',
        'Queen': '퀸',
        'King': '킹'
    };
    
    // 수트 변환
    const suitMap = {
        'Wands': '완드',
        'Cups': '컵',
        'Swords': '소드',
        'Pentacles': '펜타클'
    };
    
    // 메이저 아르카나
    if (nameMap[englishName]) {
        return nameMap[englishName];
    }
    
    // 마이너 아르카나 처리
    let koreanName = englishName;
    Object.keys(numberMap).forEach(key => {
        koreanName = koreanName.replace(key, numberMap[key]);
    });
    Object.keys(suitMap).forEach(key => {
        koreanName = koreanName.replace(key, suitMap[key]);
    });
    koreanName = koreanName.replace(' of ', ' ');
    
    return koreanName || englishName;
}

// 카테고리 필터링
function filterCards(category) {
    currentCategory = category;
    
    // 필터 버튼 활성화 상태 업데이트
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // 검색어 초기화
    const searchInput = document.getElementById('card-search');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // 카드 필터링
    if (typeof allCards === 'undefined' || !allCards || allCards.length === 0) {
        console.warn('카드 데이터가 아직 로드되지 않았습니다.');
        return;
    }
    
    if (category === 'all') {
        filteredCards = allCards;
    } else {
        filteredCards = allCards.filter(card => getCardCategory(card.id) === category);
    }
    
    renderCardLibrary(filteredCards);
}

// 검색 기능
function searchCards(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (typeof allCards === 'undefined' || !allCards || allCards.length === 0) {
        console.warn('카드 데이터가 아직 로드되지 않았습니다.');
        return;
    }
    
    if (!searchTerm) {
        filterCards(currentCategory);
        return;
    }
    
    let cardsToSearch = currentCategory === 'all' ? allCards : 
                       allCards.filter(card => getCardCategory(card.id) === currentCategory);
    
    filteredCards = cardsToSearch.filter(card => {
        const nameMatch = card.name.toLowerCase().includes(searchTerm);
        const koreanMatch = getKoreanName(card.name).toLowerCase().includes(searchTerm);
        const meaningMatch = card.upright.meaning.toLowerCase().includes(searchTerm) ||
                           card.reversed.meaning.toLowerCase().includes(searchTerm);
        return nameMatch || koreanMatch || meaningMatch;
    });
    
    renderCardLibrary(filteredCards);
}

// 카드 상세 페이지 열기
function openCardDetail(cardId) {
    if (!allCards || allCards.length === 0) {
        console.error('카드 데이터가 로드되지 않았습니다.');
        return;
    }
    
    const card = allCards[cardId];
    if (!card) {
        console.error('카드를 찾을 수 없습니다:', cardId);
        return;
    }
    
    currentCardIndex = cardId;
    
    // 페이지 이동
    if (typeof goToPage === 'function') {
        goToPage('card-detail-page');
    }
    
    // 상세 페이지 렌더링
    renderCardDetail(card);
    
    // URL 업데이트 (SEO를 위해)
    const cardSlug = card.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    window.history.pushState({ cardId: cardId }, '', `#card/${cardSlug}`);
}

// 카드 상세 페이지 렌더링
function renderCardDetail(card) {
    const container = document.getElementById('card-detail-content');
    if (!container) return;
    
    const category = getCardCategory(card.id);
    const isMajor = category === 'major';
    
    // 키워드 추출
    const uprightKeywords = extractKeywords(card.upright.meaning);
    const reversedKeywords = extractKeywords(card.reversed.meaning);
    
    // 이전/다음 카드 정보
    const prevCard = card.id > 0 ? allCards[card.id - 1] : null;
    const nextCard = card.id < allCards.length - 1 ? allCards[card.id + 1] : null;
    
    // 상황별 해석 생성 (간단한 버전)
    const situations = generateSituations(card);
    
    container.innerHTML = `
        <div class="card-detail-header">
            <div class="detail-card-image-container">
                <img src="${card.imagePath}" alt="${card.name}" class="detail-card-image"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22500%22><rect fill=%22%232a2a4a%22 width=%22300%22 height=%22500%22 rx=%2220%22/><text fill=%22%23d4af37%22 x=%22150%22 y=%22250%22 text-anchor=%22middle%22 font-size=%2260%22>✦</text></svg>'">
            </div>
            <div class="detail-card-basic-info">
                <h1 class="detail-card-name">${card.name}</h1>
                <div class="detail-card-meta">
                    <span><span class="detail-meta-label">소속:</span> ${getCardSuit(card.id)}</span>
                    <span><span class="detail-meta-label">번호:</span> ${getCardNumber(card.id)}</span>
                    ${!isMajor ? `<span><span class="detail-meta-label">수트:</span> ${category.charAt(0).toUpperCase() + category.slice(1)}</span>` : ''}
                </div>
            </div>
        </div>
        
        <!-- 키워드 영역 -->
        <div class="detail-keywords-section">
            <h2 class="detail-keywords-title">핵심 키워드</h2>
            <div class="keywords-group">
                <div class="keywords-group-title">정방향</div>
                <div class="keywords-tags">
                    ${uprightKeywords.map(kw => `<span class="detail-keyword-tag">${kw}</span>`).join('')}
                </div>
            </div>
            <div class="keywords-group">
                <div class="keywords-group-title">역방향</div>
                <div class="keywords-tags">
                    ${reversedKeywords.map(kw => `<span class="detail-keyword-tag">${kw}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <!-- 카드 상징 설명 (간단 버전) -->
        <div class="detail-symbolism-section">
            <h2 class="detail-section-title">카드의 상징</h2>
            <p class="detail-symbolism-text">
                ${card.upright.meaning.split('.')[0]}. ${card.upright.meaning.split('.')[1] || ''} 이 카드는 전통적인 타로 해석을 바탕으로 하며, 각 상징은 깊은 의미를 담고 있습니다.
            </p>
        </div>
        
        <!-- 카드 해석 -->
        <div class="detail-meaning-section">
            <div class="meaning-tabs">
                <button class="meaning-tab active" onclick="switchMeaningTab('upright')">정방향 해석</button>
                <button class="meaning-tab" onclick="switchMeaningTab('reversed')">역방향 해석</button>
            </div>
            
            <div class="meaning-content active" id="upright-meaning">
                <div class="meaning-text">${card.upright.meaning}</div>
                <div class="meaning-fun">${card.upright.fun_element}</div>
            </div>
            
            <div class="meaning-content" id="reversed-meaning">
                <div class="meaning-text">${card.reversed.meaning}</div>
                <div class="meaning-fun">${card.reversed.fun_element}</div>
            </div>
        </div>
        
        <!-- 상황별 해석 -->
        <div class="detail-situations-section">
            <h2 class="detail-section-title">상황별 해석</h2>
            <div class="situations-grid">
                ${situations.map(sit => `
                    <div class="situation-card">
                        <span class="situation-icon">${sit.icon}</span>
                        <h3 class="situation-title">${sit.title}</h3>
                        <p class="situation-text">${sit.text}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- 네비게이션 -->
        <div class="detail-navigation">
            <button class="nav-card-btn prev" ${!prevCard ? 'disabled' : ''} onclick="${prevCard ? `openCardDetail(${prevCard.id})` : ''}">
                <span>←</span> 이전 카드
            </button>
            
            <button class="detail-action-btn" onclick="startReadingWithCard(${card.id})">
                이 카드로 리딩하기
            </button>
            
            <button class="nav-card-btn next" ${!nextCard ? 'disabled' : ''} onclick="${nextCard ? `openCardDetail(${nextCard.id})` : ''}">
                다음 카드 <span>→</span>
            </button>
        </div>
    `;
    
    // 페이지 제목 업데이트 (SEO)
    const pageTitle = `${card.name} - 타로 카드 의미 해석 | Mystic Tarot`;
    document.title = pageTitle;
    
    // 메타 설명 업데이트 (간단하게)
    updateMetaDescription(card);
}

// 상황별 해석 생성
function generateSituations(card) {
    const meaning = card.upright.meaning;
    const situations = [
        {
            icon: '💕',
            title: '연애',
            text: meaning.includes('사랑') || meaning.includes('관계') || meaning.includes('연인') 
                ? meaning.split('.')[0] + '.'
                : '이 카드는 관계에서 중요한 의미를 담고 있습니다. 현재 상황을 성찰하고 솔직한 대화가 필요할 수 있습니다.'
        },
        {
            icon: '💰',
            title: '금전',
            text: meaning.includes('물질') || meaning.includes('재정') || meaning.includes('경제')
                ? meaning.split('.')[0] + '.'
                : '재정적 상황은 계획과 신중함이 중요합니다. 서두르지 말고 단계적으로 접근하는 것이 좋습니다.'
        },
        {
            icon: '💼',
            title: '직장',
            text: meaning.includes('일') || meaning.includes('직장') || meaning.includes('커리어')
                ? meaning.split('.')[0] + '.'
                : '직장에서의 상황은 명확한 의사소통과 행동이 중요합니다. 목표를 향해 꾸준히 나아가세요.'
        }
    ];
    
    return situations;
}

// 해석 탭 전환
function switchMeaningTab(tab) {
    document.querySelectorAll('.meaning-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.meaning-content').forEach(c => c.classList.remove('active'));
    
    const tabElement = event.target;
    tabElement.classList.add('active');
    
    const contentId = tab === 'upright' ? 'upright-meaning' : 'reversed-meaning';
    document.getElementById(contentId).classList.add('active');
}

// 특정 카드로 리딩 시작
function startReadingWithCard(cardId) {
    // 원 카드 리딩으로 이동
    if (typeof goToPage === 'function') {
        currentSpread = 1;
        goToPage('question-page');
        
        // 선택된 카드를 미리 설정 (선택사항)
        // 실제 구현은 리딩 로직과 연동 필요
    }
}

// 메타 설명 업데이트
function updateMetaDescription(card) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    
    const description = `${card.name}의 타로 카드 의미 해석. 정방향과 역방향의 상세한 해석을 확인하세요. ${card.upright.meaning.substring(0, 100)}...`;
    metaDesc.content = description;
}

// 백과사전 페이지로 이동
function goToLibraryPage() {
    if (typeof goToPage === 'function') {
        goToPage('library-page');
    }
    
    // 초기 카드 리스트 로드
    if (allCards && allCards.length > 0) {
        filterCards('all');
    } else {
        // 카드 데이터 로드를 기다림
        setTimeout(() => {
            if (allCards && allCards.length > 0) {
                filterCards('all');
            }
        }, 500);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 카드 데이터가 로드된 후에만 실행
    const checkCardsLoaded = setInterval(() => {
        if (typeof allCards !== 'undefined' && allCards && allCards.length > 0) {
            clearInterval(checkCardsLoaded);
            // URL 해시 확인
            const hash = window.location.hash;
            if (hash.startsWith('#card/')) {
                const cardSlug = hash.replace('#card/', '');
                const card = allCards.find(c => 
                    c.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === cardSlug
                );
                if (card) {
                    openCardDetail(card.id);
                }
            }
        }
    }, 100);
    
    // 5초 후 타임아웃
    setTimeout(() => clearInterval(checkCardsLoaded), 5000);
});

// 전역 함수로 노출 (HTML에서 호출 가능하도록)
window.goToLibraryPage = goToLibraryPage;
window.filterCards = filterCards;
window.searchCards = searchCards;
window.openCardDetail = openCardDetail;
window.switchMeaningTab = switchMeaningTab;
window.startReadingWithCard = startReadingWithCard;
