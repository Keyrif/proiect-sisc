document.addEventListener('DOMContentLoaded', () => {
            
    const mobileText = document.getElementById('mobile-text'); 
    const leftArrow = document.getElementById('mobile-arrow-left');
    const rightArrow = document.getElementById('mobile-arrow-right');
    const desktopButtons = document.querySelectorAll('.button-link');

    const pages = [];
    desktopButtons.forEach(button => {
        pages.push({
            text: button.textContent.trim(),
            href: button.href
        });
    });

    if (pages.length > 0 && mobileText && leftArrow && rightArrow) {
        let currentPageIndex = 0; 
        
        function updatePage() {
            const page = pages[currentPageIndex];
            mobileText.textContent = page.text;
            mobileText.href = page.href;
        }

        rightArrow.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentPageIndex++; 
            if (currentPageIndex >= pages.length) {
                currentPageIndex = 0; 
            }
            updatePage(); 
        });

        leftArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            currentPageIndex--; 
            if (currentPageIndex < 0) {
                currentPageIndex = pages.length - 1; 
            }
            updatePage(); 
        });
        updatePage();
    }

    const modeToggleButton = document.getElementById('themetoggle');
    const body = document.body;
    let dayTheme = localStorage.getItem('dayTheme') === 'true';

    function setMode() {
        if (dayTheme) {
            body.classList.add('day-mode');
            modeToggleButton.textContent = 'Mod Noapte';
        } else {
            body.classList.remove('day-mode');
            modeToggleButton.textContent = 'Mod Zi';
        }
        localStorage.setItem('dayTheme', dayTheme);
    }

    setMode();

    if (modeToggleButton) {
        modeToggleButton.addEventListener('click', () => {
            dayTheme = !dayTheme;
            setMode();
        });
    }
});
