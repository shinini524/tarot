// ========================================
// Mystic Tarot - 메인 애플리케이션
// ========================================

// 전역 상태
let currentSpread = 1;
let selectedCards = [];
let userQuestion = '';
let allCards = [];
let isShuffling = false;

// 스프레드 정보
const spreadInfo = {
    1: {
        name: '원 카드',
        count: 1,
        positions: ['오늘의 메시지']
    },
    3: {
        name: '쓰리 카드',
        count: 3,
        positions: ['과거', '현재', '미래']
    },
    celtic: {
        name: '켈틱 크로스',
        count: 10,
        positions: [
            '현재 상황',
            '도전/장애물',
            '무의식적 영향',
            '과거의 영향',
            '의식적 목표',
            '가까운 미래',
            '자신의 태도',
            '주변 환경',
            '희망과 두려움',
            '최종 결과'
        ]
    }
};

// 카드 이미지 경로 매핑
const cardImageMap = [
    // Major Arcana (0-21)
    '00_the_fool.json.png',
    '01_the_magician.json.png',
    '02_the_high_priestess.json.png',
    '03_the_empress.json.png',
    '04_the_emperor.json.png',
    '05_the_hierophant.json.png',
    '06_the_lovers.json.png',
    '07_the_chariot.json.png',
    '08_strength.json.png',
    '09_the_hermit.json.png',
    '10_wheel_of_fortune.json.png',
    '11_justice.json.png',
    '12_the_hanged_man.json.png',
    '13_death.json.png',
    '14_temperance.json.png',
    '15_the_devil.json.png',
    '16_the_tower.json.png',
    '17_the_star.json.png',
    '18_the_moon.json.png',
    '19_the_sun.json.png',
    '20_judgement.json.png',
    '21_the_world.json.png',
    // Minor Arcana - Wands (22-35)
    '22_ace_of_wands.json.png',
    '23_two_of_wands.json.png',
    '24_three_of_wands.json.png',
    '25_four_of_wands.json.png',
    '26_five_of_wands.json.png',
    '27_six_of_wands.json.png',
    '28_seven_of_wands.json.png',
    '29_eight_of_wands.json.png',
    '30_nine_of_wands.json.png',
    '31_ten_of_wands.json.png',
    '32_page_of_wands.json.png',
    '33_knight_of_wands.json.png',
    '34_queen_of_wands.json.png',
    '35_king_of_wands.json.png',
    // Minor Arcana - Cups (36-49)
    '36_ace_of_cups.json.png',
    '37_two_of_cups.json.png',
    '38_three_of_cups.json.png',
    '39_four_of_cups.json.png',
    '40_five_of_cups.json.png',
    '41_six_of_cups.json.png',
    '42_seven_of_cups.json.png',
    '43_eight_of_cups.json.png',
    '44_nine_of_cups.json.png',
    '45_ten_of_cups.json.png',
    '46_page_of_cups.json.png',
    '47_knight_of_cups.json.png',
    '48_queen_of_cups.json.png',
    '49_king_of_cups.json.png',
    // Minor Arcana - Swords (50-63)
    '50_ace_of_swords.json.png',
    '51_two_of_swords.json.png',
    '52_three_of_swords.json.png',
    '53_four_of_swords.json.png',
    '54_five_of_swords.json.png',
    '55_six_of_swords.json.png',
    '56_seven_of_swords.json.png',
    '57_eight_of_swords.json.png',
    '58_nine_of_swords.json.png',
    '59_ten_of_swords.json.png',
    '60_page_of_swords.json.png',
    '61_knight_of_swords.json.png',
    '62_queen_of_swords.json.png',
    '63_king_of_swords.json.png',
    // Minor Arcana - Pentacles (64-77)
    '64_ace_of_pentacles.json.png',
    '65_two_of_pentacles.json.png',
    '66_three_of_pentacles.json.png',
    '67_four_of_pentacles.json.png',
    '68_five_of_pentacles.json.png',
    '69_six_of_pentacles.json.png',
    '70_seven_of_pentacles.json.png',
    '71_eight_of_pentacles.json.png',
    '72_nine_of_pentacles.json.png',
    '73_ten_of_pentacles.json.png',
    '74_page_of_pentacles.json.png',
    '75_knight_of_pentacles.json.png',
    '76_queen_of_pentacles.json.png',
    '77_king_of_pentacles.json.png'
];

// JSON 파일 경로 매핑
const cardJsonPaths = [
    // Major Arcana (0-21)
    'assets/data/json/major/00_the_fool.json',
    'assets/data/json/major/01_the_magician.json',
    'assets/data/json/major/02_the_high_priestess.json',
    'assets/data/json/major/03_the_empress.json',
    'assets/data/json/major/04_the_emperor.json',
    'assets/data/json/major/05_the_hierophant.json',
    'assets/data/json/major/06_the_lovers.json',
    'assets/data/json/major/07_the_chariot.json',
    'assets/data/json/major/08_strength.json',
    'assets/data/json/major/09_the_hermit.json',
    'assets/data/json/major/10_wheel_of_fortune.json',
    'assets/data/json/major/11_justice.json',
    'assets/data/json/major/12_the_hanged_man.json',
    'assets/data/json/major/13_death.json',
    'assets/data/json/major/14_temperance.json',
    'assets/data/json/major/15_the_devil.json',
    'assets/data/json/major/16_the_tower.json',
    'assets/data/json/major/17_the_star.json',
    'assets/data/json/major/18_the_moon.json',
    'assets/data/json/major/19_the_sun.json',
    'assets/data/json/major/20_judgement.json',
    'assets/data/json/major/21_the_world.json',
    // Minor Arcana - Wands (22-35)
    'assets/data/json/minor/wands/22_ace_of_wands.json',
    'assets/data/json/minor/wands/23_two_of_wands.json',
    'assets/data/json/minor/wands/24_three_of_wands.json',
    'assets/data/json/minor/wands/25_four_of_wands.json',
    'assets/data/json/minor/wands/26_five_of_wands.json',
    'assets/data/json/minor/wands/27_six_of_wands.json',
    'assets/data/json/minor/wands/28_seven_of_wands.json',
    'assets/data/json/minor/wands/29_eight_of_wands.json',
    'assets/data/json/minor/wands/30_nine_of_wands.json',
    'assets/data/json/minor/wands/31_ten_of_wands.json',
    'assets/data/json/minor/wands/32_page_of_wands.json',
    'assets/data/json/minor/wands/33_knight_of_wands.json',
    'assets/data/json/minor/wands/34_queen_of_wands.json',
    'assets/data/json/minor/wands/35_king_of_wands.json',
    // Minor Arcana - Cups (36-49)
    'assets/data/json/minor/cups/36_ace_of_cups.json',
    'assets/data/json/minor/cups/37_two_of_cups.json',
    'assets/data/json/minor/cups/38_three_of_cups.json',
    'assets/data/json/minor/cups/39_four_of_cups.json',
    'assets/data/json/minor/cups/40_five_of_cups.json',
    'assets/data/json/minor/cups/41_six_of_cups.json',
    'assets/data/json/minor/cups/42_seven_of_cups.json',
    'assets/data/json/minor/cups/43_eight_of_cups.json',
    'assets/data/json/minor/cups/44_nine_of_cups.json',
    'assets/data/json/minor/cups/45_ten_of_cups.json',
    'assets/data/json/minor/cups/46_page_of_cups.json',
    'assets/data/json/minor/cups/47_knight_of_cups.json',
    'assets/data/json/minor/cups/48_queen_of_cups.json',
    'assets/data/json/minor/cups/49_king_of_cups.json',
    // Minor Arcana - Swords (50-63)
    'assets/data/json/minor/swords/50_ace_of_swords.json',
    'assets/data/json/minor/swords/51_two_of_swords.json',
    'assets/data/json/minor/swords/52_three_of_swords.json',
    'assets/data/json/minor/swords/53_four_of_swords.json',
    'assets/data/json/minor/swords/54_five_of_swords.json',
    'assets/data/json/minor/swords/55_six_of_swords.json',
    'assets/data/json/minor/swords/56_seven_of_swords.json',
    'assets/data/json/minor/swords/57_eight_of_swords.json',
    'assets/data/json/minor/swords/58_nine_of_swords.json',
    'assets/data/json/minor/swords/59_ten_of_swords.json',
    'assets/data/json/minor/swords/60_page_of_swords.json',
    'assets/data/json/minor/swords/61_knight_of_swords.json',
    'assets/data/json/minor/swords/62_queen_of_swords.json',
    'assets/data/json/minor/swords/63_king_of_swords.json',
    // Minor Arcana - Pentacles (64-77)
    'assets/data/json/minor/pentacles/64_ace_of_pentacles.json',
    'assets/data/json/minor/pentacles/65_two_of_pentacles.json',
    'assets/data/json/minor/pentacles/66_three_of_pentacles.json',
    'assets/data/json/minor/pentacles/67_four_of_pentacles.json',
    'assets/data/json/minor/pentacles/68_five_of_pentacles.json',
    'assets/data/json/minor/pentacles/69_six_of_pentacles.json',
    'assets/data/json/minor/pentacles/70_seven_of_pentacles.json',
    'assets/data/json/minor/pentacles/71_eight_of_pentacles.json',
    'assets/data/json/minor/pentacles/72_nine_of_pentacles.json',
    'assets/data/json/minor/pentacles/73_ten_of_pentacles.json',
    'assets/data/json/minor/pentacles/74_page_of_pentacles.json',
    'assets/data/json/minor/pentacles/75_knight_of_pentacles.json',
    'assets/data/json/minor/pentacles/76_queen_of_pentacles.json',
    'assets/data/json/minor/pentacles/77_king_of_pentacles.json'
];

// ========================================
// 카드 데이터 로딩
// ========================================
async function loadAllCards() {
    try {
        const promises = cardJsonPaths.map(async (path, index) => {
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`Failed to load ${path}`);
                const data = await response.json();
                data.imagePath = `assets/images/card/${cardImageMap[index]}`;
                return data;
            } catch (error) {
                console.warn(`카드 데이터 로드 실패: ${path}`, error);
                // 기본 카드 데이터 반환
                return createDefaultCard(index);
            }
        });
        
        allCards = await Promise.all(promises);
        console.log('모든 카드 데이터 로드 완료:', allCards.length);
    } catch (error) {
        console.error('카드 데이터 로드 중 오류:', error);
        // 기본 카드 세트 생성
        allCards = Array.from({ length: 78 }, (_, i) => createDefaultCard(i));
    }
}

function createDefaultCard(index) {
    const names = [
        'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
        'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
        'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
        'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
        'Judgement', 'The World',
        'Ace of Wands', 'Two of Wands', 'Three of Wands', 'Four of Wands', 'Five of Wands',
        'Six of Wands', 'Seven of Wands', 'Eight of Wands', 'Nine of Wands', 'Ten of Wands',
        'Page of Wands', 'Knight of Wands', 'Queen of Wands', 'King of Wands',
        'Ace of Cups', 'Two of Cups', 'Three of Cups', 'Four of Cups', 'Five of Cups',
        'Six of Cups', 'Seven of Cups', 'Eight of Cups', 'Nine of Cups', 'Ten of Cups',
        'Page of Cups', 'Knight of Cups', 'Queen of Cups', 'King of Cups',
        'Ace of Swords', 'Two of Swords', 'Three of Swords', 'Four of Swords', 'Five of Swords',
        'Six of Swords', 'Seven of Swords', 'Eight of Swords', 'Nine of Swords', 'Ten of Swords',
        'Page of Swords', 'Knight of Swords', 'Queen of Swords', 'King of Swords',
        'Ace of Pentacles', 'Two of Pentacles', 'Three of Pentacles', 'Four of Pentacles', 'Five of Pentacles',
        'Six of Pentacles', 'Seven of Pentacles', 'Eight of Pentacles', 'Nine of Pentacles', 'Ten of Pentacles',
        'Page of Pentacles', 'Knight of Pentacles', 'Queen of Pentacles', 'King of Pentacles'
    ];
    
    return {
        id: index,
        name: names[index] || `Card ${index}`,
        upright: {
            meaning: '이 카드는 새로운 시작과 가능성을 의미합니다.',
            fun_element: '우주가 당신에게 보내는 특별한 메시지입니다 ✨'
        },
        reversed: {
            meaning: '이 카드는 재고와 성찰이 필요함을 나타냅니다.',
            fun_element: '잠시 멈추고 생각해볼 시간입니다 🌙'
        },
        imagePath: `assets/images/card/${cardImageMap[index]}`
    };
}

// ========================================
// 페이지 네비게이션
// ========================================
function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// 스프레드 선택
// ========================================
document.querySelectorAll('.spread-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const spread = btn.dataset.spread;
        currentSpread = spread === 'celtic' ? 'celtic' : parseInt(spread);
        goToPage('question-page');
    });
});

// ========================================
// 질문 선택
// ========================================
document.querySelectorAll('.question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.question-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('question-input').value = btn.textContent;
    });
});

// ========================================
// 리딩 시작
// ========================================
function startReading() {
    const customQuestion = document.getElementById('question-input').value.trim();
    const selectedQuestion = document.querySelector('.question-btn.selected');
    
    userQuestion = customQuestion || (selectedQuestion ? selectedQuestion.textContent : '오늘 나에게 필요한 메시지는?');
    
    selectedCards = [];
    goToPage('shuffle-page');
    
    const spread = spreadInfo[currentSpread];
    document.getElementById('cards-needed').textContent = spread.count;
    document.getElementById('cards-selected').textContent = '0';
    
    shuffleCards();
}

// ========================================
// 카드 셔플 애니메이션
// ========================================
function shuffleCards() {
    isShuffling = true;
    const deck = document.getElementById('card-deck');
    const instruction = document.getElementById('shuffle-instruction');
    const revealBtn = document.getElementById('reveal-btn');

    deck.innerHTML = '';
    deck.classList.remove('fanned', 'fan-scroll');
    revealBtn.classList.add('hidden');
    instruction.textContent = '카드를 섞고 있습니다...';

    // 셔플 애니메이션용 카드 20장 (덱처럼 쌓기)
    const shuffleCount = 20;
    for (let i = 0; i < shuffleCount; i++) {
        const card = document.createElement('div');
        card.className = 'tarot-card deck-card';
        card.dataset.index = i;
        card.style.zIndex = shuffleCount - i;
        card.style.transform = `translate(${i * 0.5}px, ${i * 0.5}px)`;
        card.style.position = 'absolute';
        card.style.left = '50%';
        card.style.top = '50%';
        card.style.marginLeft = '-40px';
        card.style.marginTop = '-65px';
        deck.appendChild(card);
    }

    // 1단계: 카드를 덱 중앙으로 모으기
    setTimeout(() => {
        document.querySelectorAll('.tarot-card').forEach((card, i) => {
            card.classList.add('shuffling');
            card.style.transition = 'all 0.5s ease-in-out';
            card.style.transform = `translate(0, 0) rotate(${(i % 2) * 2 - 1}deg)`;
            card.style.zIndex = shuffleCount + i;
        });
    }, 300);

    // 2단계: 섞는 애니메이션
    setTimeout(() => {
        document.querySelectorAll('.tarot-card').forEach((card, i) => {
            const delay = (i % 6) * 0.1;
            card.style.animation = `shuffleMove 0.8s ease-in-out ${delay}s infinite`;
        });
    }, 800);

    // 3단계: 스크롤 부채꼴로 전환
    setTimeout(() => {
        isShuffling = false;

        // 기존 셔플 카드 제거 후 78장으로 재생성
        deck.innerHTML = '';
        deck.classList.add('fan-scroll');

        const totalCards = allCards.length; // 78장
        const angleRange = 160;             // 부채꼴 전체 각도
        const angleStep = angleRange / (totalCards - 1);
        const startAngle = -angleRange / 2;
        const radius = 600;                 // 반지름 (클수록 카드 간격 넓어짐)
        const cardW = 80;
        const cardH = 130;

        // 스크롤 컨테이너 너비 계산
        // 가장 왼쪽/오른쪽 카드의 x 위치를 기준으로 패딩 결정
        const leftmost  = Math.sin((startAngle * Math.PI) / 180) * radius;
        const rightmost = Math.sin(((startAngle + angleRange) * Math.PI) / 180) * radius;
        const totalWidth = (rightmost - leftmost) + cardW + 200; // 여유 패딩

        // 컨테이너 높이: 반지름 + 카드 높이 + 여유
        const containerH = radius * (1 - Math.cos((angleRange / 2 * Math.PI) / 180)) + cardH + 120;
        deck.style.width = totalWidth + 'px';
        deck.style.height = containerH + 'px';

        // 기준점: 컨테이너 하단 중앙
        const originX = totalWidth / 2;
        const originY = containerH - 20;

        for (let i = 0; i < totalCards; i++) {
            const card = document.createElement('div');
            card.className = 'tarot-card fan-card';
            card.dataset.index = i;

            const angle = startAngle + i * angleStep;
            const radian = (angle * Math.PI) / 180;
            const x = originX + Math.sin(radian) * radius - cardW / 2;
            const y = originY - Math.cos(radian) * radius - cardH / 2;

            card.style.position = 'absolute';
            card.style.left = x + 'px';
            card.style.top = y + 'px';
            card.style.transformOrigin = 'center bottom';
            card.style.transform = `rotate(${angle}deg)`;
            card.style.zIndex = i + 1;
            card.dataset.fanAngle = angle;
            // 펼치기 애니메이션 딜레이
            card.style.opacity = '0';
            card.style.transition = `opacity 0.3s ease ${i * 0.008}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.008}s`;

            deck.appendChild(card);
        }

        // 카드 페이드인
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.querySelectorAll('.fan-card').forEach(card => {
                    card.style.opacity = '1';
                });
            });
        });

        // 스크롤을 중앙으로 초기화
        const wrapper = document.getElementById('fan-scroll-wrapper');
        if (wrapper) {
            wrapper.scrollLeft = (totalWidth - wrapper.clientWidth) / 2;
        }

        instruction.textContent = '← 스크롤하여 마음이 이끄는 카드를 선택하세요 →';

        setTimeout(() => {
            enableCardSelection();
        }, totalCards * 8 + 400);
    }, 2800);
}

// ========================================
// 카드 선택 활성화
// ========================================
function enableCardSelection() {
    const spread = spreadInfo[currentSpread];
    const neededCount = spread.count;

    document.querySelectorAll('.fan-card').forEach(card => {
        if (card.dataset.listener === 'true') return;
        card.dataset.listener = 'true';

        card.addEventListener('click', function() {
            if (isShuffling) return;

            const index = parseInt(this.dataset.index);
            const cardElement = this;

            if (cardElement.classList.contains('selected')) {
                // 선택 취소 — 원래 부채꼴 위치/회전 복원
                const angle = cardElement.dataset.fanAngle;
                cardElement.classList.remove('selected', 'flipped');
                cardElement.style.backgroundImage = '';
                cardElement.style.transform = `rotate(${angle}deg)`;
                cardElement.style.zIndex = index + 1;
                selectedCards = selectedCards.filter(c => c.displayIndex !== index);
                updateSelectionUI();
            } else if (selectedCards.length < neededCount) {
                // 새 카드 선택
                cardElement.classList.add('flipping');
                cardElement.style.pointerEvents = 'none';

                setTimeout(() => {
                    // 랜덤 카드 선택 (중복 방지)
                    let randomCardIndex;
                    const usedIndices = selectedCards.map(c => c.cardIndex);
                    do {
                        randomCardIndex = Math.floor(Math.random() * allCards.length);
                    } while (usedIndices.includes(randomCardIndex));

                    const isReversed = Math.random() < 0.3;
                    const cardData = allCards[randomCardIndex];

                    cardElement.style.backgroundImage = `url(${cardData.imagePath})`;
                    cardElement.style.backgroundSize = 'cover';
                    cardElement.style.backgroundPosition = 'center';
                    cardElement.classList.remove('flipping');
                    cardElement.classList.add('flipped', 'selected');
                    cardElement.style.pointerEvents = 'auto';
                    cardElement.style.zIndex = 500 + selectedCards.length;

                    // 선택된 카드는 똑바로 세우고 위로 올리기
                    const liftY = isReversed ? 'translateY(-40px) rotate(180deg)' : 'translateY(-40px)';
                    cardElement.style.transform = liftY;

                    selectedCards.push({
                        displayIndex: index,
                        cardIndex: randomCardIndex,
                        card: cardData,
                        isReversed: isReversed
                    });

                    updateSelectionUI();
                }, 300);
            }
        });

        // 호버 시 카드 위로 살짝 올리기
        card.addEventListener('mouseenter', function() {
            if (isShuffling || this.classList.contains('selected') || this.classList.contains('disabled')) return;
            const angle = this.dataset.fanAngle || '0';
            this.style.transform = `rotate(${angle}deg) translateY(-20px)`;
            this.style.zIndex = 300;
            this.style.borderColor = 'var(--accent-gold)';
            this.style.boxShadow = '0 10px 30px rgba(212,175,55,0.5)';
        });

        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('selected')) return;
            const angle = this.dataset.fanAngle || '0';
            this.style.transform = `rotate(${angle}deg)`;
            this.style.zIndex = parseInt(this.dataset.index) + 1;
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
}

// ========================================
// 선택 UI 업데이트
// ========================================
function updateSelectionUI() {
    const spread = spreadInfo[currentSpread];
    const neededCount = spread.count;
    const selectedCount = selectedCards.length;
    
    document.getElementById('cards-selected').textContent = selectedCount;
    
    const revealBtn = document.getElementById('reveal-btn');
    if (selectedCount === neededCount) {
        revealBtn.classList.remove('hidden');
    } else {
        revealBtn.classList.add('hidden');
    }
    
    // 선택 완료 시 나머지 카드 비활성화
    document.querySelectorAll('.fan-card').forEach(card => {
        if (selectedCount >= neededCount && !card.classList.contains('selected')) {
            card.classList.add('disabled');
        } else {
            card.classList.remove('disabled');
        }
    });
}

// ========================================
// 카드 공개
// ========================================
function revealCards() {
    goToPage('result-page');
    
    document.getElementById('display-question').textContent = `"${userQuestion}"`;
    
    const resultContainer = document.getElementById('cards-result');
    const spread = spreadInfo[currentSpread];
    
    // 켈틱 크로스 레이아웃 적용
    if (currentSpread === 'celtic') {
        resultContainer.className = 'cards-result celtic-cross-layout';
    } else {
        resultContainer.className = 'cards-result';
    }
    
    resultContainer.innerHTML = '';
    
    selectedCards.forEach((selected, index) => {
        const card = selected.card;
        const isReversed = selected.isReversed;
        const position = spread.positions[index];
        
        const meaning = isReversed ? card.reversed : card.upright;
        
        const cardElement = document.createElement('div');
        cardElement.className = 'result-card';
        cardElement.dataset.position = index + 1;
        cardElement.style.animationDelay = `${index * 0.2}s`;
        
        // 켈틱 크로스는 간소화된 카드 표시
        if (currentSpread === 'celtic') {
            cardElement.innerHTML = `
                <div class="result-card-header">
                    <span class="result-card-position">${position}</span>
                </div>
                <div class="result-card-image ${isReversed ? 'reversed' : ''}">
                    ${isReversed ? '<span class="reversed-badge">역방향</span>' : ''}
                    <img src="${card.imagePath}" alt="${card.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22250%22><rect fill=%22%232a2a4a%22 width=%22150%22 height=%22250%22 rx=%2210%22/><text fill=%22%23d4af37%22 x=%2275%22 y=%22125%22 text-anchor=%22middle%22 font-size=%2240%22>✦</text></svg>'">
                </div>
                <div class="result-card-body">
                    <button class="view-detail-btn" onclick="openCardModal(${selected.cardIndex}, ${isReversed}, '${position}')">
                        자세히 보기
                    </button>
                </div>
            `;
        } else {
            // 원 카드, 쓰리 카드는 기존대로
            cardElement.innerHTML = `
                <div class="result-card-header">
                    <span class="result-card-position">${position}</span>
                </div>
                <div class="result-card-image ${isReversed ? 'reversed' : ''}" onclick="openCardModal(${selected.cardIndex}, ${isReversed}, '${position}')">
                    ${isReversed ? '<span class="reversed-badge">역방향</span>' : ''}
                    <img src="${card.imagePath}" alt="${card.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22250%22><rect fill=%22%232a2a4a%22 width=%22150%22 height=%22250%22 rx=%2210%22/><text fill=%22%23d4af37%22 x=%2275%22 y=%22125%22 text-anchor=%22middle%22 font-size=%2240%22>✦</text></svg>'">
                </div>
                <div class="result-card-body">
                    <h4 class="result-card-name">${card.name}</h4>
                    <p class="result-card-meaning">${meaning.meaning}</p>
                    <div class="result-card-fun">${meaning.fun_element}</div>
                    <button class="view-detail-btn" onclick="openCardModal(${selected.cardIndex}, ${isReversed}, '${position}')">
                        자세히 보기
                    </button>
                </div>
            `;
        }
        
        resultContainer.appendChild(cardElement);
    });
}

// ========================================
// 카드 모달
// ========================================
function openCardModal(cardIndex, isReversed, position) {
    const card = allCards[cardIndex];
    const meaning = isReversed ? card.reversed : card.upright;
    
    document.getElementById('modal-card-img').src = card.imagePath;
    document.getElementById('modal-card-img').alt = card.name;
    document.getElementById('modal-card-img').style.transform = isReversed ? 'rotate(180deg)' : 'none';
    document.getElementById('modal-card-name').textContent = card.name;
    document.getElementById('modal-card-position').textContent = `${position} · ${isReversed ? '역방향' : '정방향'}`;
    document.getElementById('modal-card-meaning').textContent = meaning.meaning;
    document.getElementById('modal-card-fun').textContent = meaning.fun_element;
    
    document.getElementById('card-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('card-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// 리딩 초기화
// ========================================
function resetReading() {
    selectedCards = [];
    document.querySelectorAll('.question-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('question-input').value = '';
    goToPage('question-page');
}

// ========================================
// 팬 스크롤 래퍼 드래그 스크롤
// ========================================
function initFanScrollDrag() {
    const wrapper = document.getElementById('fan-scroll-wrapper');
    if (!wrapper) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
        // 카드 클릭과 구분: 드래그 시작점 기록
        isDown = true;
        wrapper.classList.add('dragging');
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
        wrapper.classList.remove('dragging');
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
        wrapper.classList.remove('dragging');
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        wrapper.scrollLeft = scrollLeft - walk;
    });
}

// ========================================
// 초기화
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadAllCards();
    initFanScrollDrag();
    console.log('Mystic Tarot 초기화 완료');
});
