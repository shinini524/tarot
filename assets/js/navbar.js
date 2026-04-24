// ========================================
// Navigation Bar - 상단 메뉴바 기능
// ========================================

// 모바일 메뉴 토글
function toggleNavbar() {
    const navbarMenu = document.getElementById('navbar-menu');
    const navbarToggle = document.getElementById('navbar-toggle');
    
    navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active');
    
    // 메뉴가 열려있을 때 body 스크롤 방지
    if (navbarMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// 메뉴 클릭 시 모바일에서 메뉴 닫기
document.addEventListener('DOMContentLoaded', () => {
    const navbarLinks = document.querySelectorAll('.navbar-link');
    const navbarMenu = document.getElementById('navbar-menu');
    const navbarToggle = document.getElementById('navbar-toggle');
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // 모바일에서만 메뉴 닫기
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });
    
    // 외부 클릭 시 모바일 메뉴 닫기
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const navbar = document.querySelector('.navbar');
            const isClickInsideNavbar = navbar.contains(e.target);
            
            if (!isClickInsideNavbar && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // 윈도우 리사이즈 시 모바일 메뉴 닫기
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
});

// ESC 키로 모바일 메뉴 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navbarMenu = document.getElementById('navbar-menu');
        const navbarToggle = document.getElementById('navbar-toggle');
        
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            if (navbarToggle) {
                navbarToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    }
});
