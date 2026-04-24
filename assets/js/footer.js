// ========================================
// Footer - 공통 컴포넌트
// ========================================

// 정책 내용
const policyContent = {
    terms: {
        title: '이용약관',
        content: `
            <h2>제1조 (목적)</h2>
            <p>이 약관은 Mystic Tarot(이하 "서비스")가 제공하는 온라인 타로 카드 리딩 서비스(이하 "서비스")의 이용과 관련하여 서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
            
            <h2>제2조 (정의)</h2>
            <p>1. "서비스"란 타로 카드 리딩 정보를 제공하는 온라인 서비스를 의미합니다.</p>
            <p>2. "이용자"란 본 약관에 따라 서비스를 이용하는 자를 의미합니다.</p>
            
            <h2>제3조 (서비스의 제공)</h2>
            <p>1. 서비스는 다음과 같은 내용을 제공합니다:</p>
            <ul>
                <li>타로 카드 리딩 서비스</li>
                <li>카드 해석 정보 제공</li>
            </ul>
            <p>2. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</p>
            
            <h2>제4조 (이용자의 의무)</h2>
            <p>1. 이용자는 관련 법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항을 준수해야 합니다.</p>
            <p>2. 이용자는 서비스의 이용권한을 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.</p>
            
            <h2>제5조 (서비스의 변경 및 중단)</h2>
            <p>서비스는 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.</p>
            
            <h2>제6조 (면책조항)</h2>
            <p>본 서비스는 오락 및 참고용으로만 제공되며, 실제 의사결정의 근거로 사용되어서는 안 됩니다.</p>
        `
    },
    privacy: {
        title: '개인정보처리방침',
        content: `
            <h2>제1조 (개인정보의 처리목적)</h2>
            <p>Mystic Tarot는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            
            <h2>제2조 (개인정보의 처리 및 보유기간)</h2>
            <p>1. 본 서비스는 이용자의 개인정보를 수집하지 않습니다.</p>
            <p>2. 브라우저의 로컬 스토리지 또는 세션 스토리지에 저장되는 정보는 이용자의 기기 내에만 보관되며, 서버로 전송되지 않습니다.</p>
            
            <h2>제3조 (개인정보의 제3자 제공)</h2>
            <p>본 서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다.</p>
            
            <h2>제4조 (정보주체의 권리·의무 및 행사방법)</h2>
            <p>이용자는 언제든지 개인정보 관련 문의를 할 수 있습니다.</p>
            
            <h2>제5조 (개인정보의 파기)</h2>
            <p>개인정보를 수집하지 않으므로 파기할 정보가 없습니다.</p>
            
            <h2>제6조 (개인정보 보호책임자)</h2>
            <p>개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
        `
    },
    about: {
        title: '서비스 소개',
        content: `
            <h2>Mystic Tarot란?</h2>
            <p>Mystic Tarot는 전통적인 타로 카드 리딩을 온라인으로 제공하는 서비스입니다. 78장의 타로 카드를 통해 당신의 질문에 대한 통찰을 얻을 수 있습니다.</p>
            
            <h2>제공하는 서비스</h2>
            <ul>
                <li><strong>원 카드 리딩:</strong> 간단한 질문에 대한 오늘의 메시지</li>
                <li><strong>쓰리 카드 리딩:</strong> 과거, 현재, 미래에 대한 통찰</li>
                <li><strong>켈틱 크로스 리딩:</strong> 10장의 카드로 심층 분석</li>
            </ul>
            
            <h2>이용 방법</h2>
            <p>1. 원하는 스프레드를 선택합니다.</p>
            <p>2. 질문을 입력하거나 선택합니다.</p>
            <p>3. 카드를 선택합니다.</p>
            <p>4. 카드 해석을 확인합니다.</p>
            
            <h2>주의사항</h2>
            <p>본 서비스는 오락 및 자기 성찰 목적으로 제공됩니다. 중요한 결정은 전문가의 조언을 구하시기 바랍니다.</p>
        `
    },
    disclaimer: {
        title: '면책조항',
        content: `
            <h2>면책사항</h2>
            <p>1. 본 서비스에서 제공하는 타로 카드 리딩은 오락 및 참고 목적으로만 제공됩니다.</p>
            <p>2. 카드 해석은 일반적인 안내이며, 절대적이거나 보장된 결과를 의미하지 않습니다.</p>
            <p>3. 본 서비스의 내용을 바탕으로 한 어떠한 결정이나 행동에 대해서도 서비스 제공자는 책임을 지지 않습니다.</p>
            <p>4. 중요한 의사결정, 건강, 재정, 법률 문제 등은 반드시 전문가의 조언을 구하시기 바랍니다.</p>
            <p>5. 본 서비스는 의학적, 법률적, 재정적 조언을 제공하지 않습니다.</p>
            
            <h2>서비스의 한계</h2>
            <p>타로 카드는 자기 성찰과 직관을 위한 도구이며, 미래를 정확히 예측하는 수단이 아닙니다. 모든 해석은 참고용으로만 활용하시기 바랍니다.</p>
        `
    },
    copyright: {
        title: '저작권 안내',
        content: `
            <h2>저작권</h2>
            <p>© 2024 Mystic Tarot. All rights reserved.</p>
            
            <h2>서비스 저작권</h2>
            <p>본 웹사이트의 디자인, 레이아웃, 로고, 그래픽 요소 등은 Mystic Tarot의 저작물입니다. 무단 복제, 배포, 전송 등을 금지합니다.</p>
            
            <h2>콘텐츠 저작권</h2>
            <p>1. 타로 카드 해석 내용은 전통적인 타로 의미를 바탕으로 작성되었습니다.</p>
            <p>2. 본 서비스에 사용된 이미지는 각 카드의 이미지 파일입니다.</p>
            
            <h2>이용자의 권리</h2>
            <p>1. 개인적이고 비상업적인 목적으로만 서비스를 이용할 수 있습니다.</p>
            <p>2. 서비스의 일부를 복제, 배포, 수정할 수 없습니다.</p>
            
            <h2>저작권 침해 신고</h2>
            <p>저작권 침해가 의심되는 경우 신고해 주시면 적절한 조치를 취하겠습니다.</p>
        `
    }
};

// 정책 모달 열기
function openPolicy(type) {
    if (!policyContent[type]) return;
    
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');
    
    content.innerHTML = `
        <h1>${policyContent[type].title}</h1>
        <div class="policy-text">
            ${policyContent[type].content}
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 모달 내용 스크롤을 상단으로
    const modalBody = document.querySelector('.policy-modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }
}

// 정책 모달 닫기
function closePolicyModal() {
    const modal = document.getElementById('policy-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('policy-modal');
        if (modal.classList.contains('active')) {
            closePolicyModal();
        }
    }
});

// ========================================
// 문의하기 페이지 이동
// ========================================
function goToContactPage() {
    // app.js의 goToPage 함수 사용
    if (typeof goToPage === 'function') {
        goToPage('contact-page');
    }
}
