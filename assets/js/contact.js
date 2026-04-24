// ========================================
// Contact Page - 문의하기 기능
// ========================================

// 문의 폼 제출 처리
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.contact-submit-btn');
    const formData = {
        name: document.getElementById('contact-name').value.trim(),
        email: document.getElementById('contact-email').value.trim(),
        subject: document.getElementById('contact-subject').value.trim(),
        message: document.getElementById('contact-message').value.trim()
    };
    
    // 기존 메시지 제거
    const existingMessage = document.querySelector('.contact-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 버튼 비활성화
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';
    
    // 실제 환경에서는 서버로 데이터 전송
    // 여기서는 시뮬레이션으로 처리
    setTimeout(() => {
        // 성공 메시지 표시
        showContactMessage('success', '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.');
        
        // 폼 초기화
        form.reset();
        
        // 버튼 복원
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-glow"></span>문의하기';
        
        // 콘솔에 문의 내용 출력 (실제로는 서버로 전송)
        console.log('문의 내용:', formData);
        
        // 실제 환경에서는 다음과 같이 처리:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showContactMessage('success', '문의가 성공적으로 전송되었습니다.');
        //     form.reset();
        // })
        // .catch(error => {
        //     showContactMessage('error', '전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        // })
        // .finally(() => {
        //     submitBtn.disabled = false;
        //     submitBtn.innerHTML = '<span class="btn-glow"></span>문의하기';
        // });
        
    }, 1500);
}

// 메시지 표시
function showContactMessage(type, message) {
    const formContainer = document.querySelector('.contact-form-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `contact-message ${type}`;
    messageDiv.textContent = message;
    
    formContainer.insertBefore(messageDiv, formContainer.firstChild);
    
    // 5초 후 자동 제거
    setTimeout(() => {
        messageDiv.style.animation = 'slideDown 0.4s ease-out reverse';
        setTimeout(() => {
            messageDiv.remove();
        }, 400);
    }, 5000);
}

// 페이지 로드 시 폼 초기화 확인
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // 폼이 이미 초기화되어 있는지 확인
        console.log('문의하기 폼이 준비되었습니다.');
    }
});
