document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    document.body.addEventListener('click', (event) => {
        const { target } = event;
        if (target.matches('nav a')) {
            event.preventDefault();
            const targetId = target.getAttribute('href').slice(1);
            sections.forEach(s => s.classList.toggle('active', s.id === targetId));
            navLinks.forEach(l => l.classList.toggle('active', l === target));
        } else if (target.id === 'start-matching') {
            target.disabled = true;
            target.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Matching...';
            const progressBar = document.querySelector('.progress');
            let progress = 0;
            const interval = setInterval(() => {
                progressBar.style.width = `${progress += 10}%`;
                if (progress >= 100) {
                    clearInterval(interval);
                    target.innerHTML = '<i class="fas fa-check"></i> Matching Complete';
                    setTimeout(() => {
                        alert('Matching process completed!');
                        target.disabled = false;
                        target.innerHTML = '<i class="fas fa-play"></i> Start Matching';
                        progressBar.style.width = '0';
                    }, 1000);
                }
            }, 500);
        }
    });

    document.body.addEventListener('input', ({ target }) => {
        if (target.matches('.search-bar')) {
            const searchTerm = target.value.toLowerCase();
            target.nextElementSibling.nextElementSibling.querySelectorAll('li')
                .forEach(item => item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? 'block' : 'none');
        }
    });
});
