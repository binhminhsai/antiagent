document.addEventListener('DOMContentLoaded', () => {
    // Progress bar animation trigger
    setTimeout(() => {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = '90%';
            }, 100);
        }
    }, 500);

    // Bottom Navigation interaction
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            // Provide a light haptic feedback simulation via console
            console.log("Navigated to:", this.querySelector('.nav-label').innerText);
        });
    });

    // List item clicks
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.item-title').innerText;
            if (this.classList.contains('locked')) {
                console.log(title + " is unavailable.");
                return;
            }
            // Animate click 
            this.style.transform = "scale(0.98)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
                console.log("Opened:", title);
            }, 150);
        });
    });

    // FAB click
    const fabButton = document.querySelector('.fab');
    if (fabButton) {
        fabButton.addEventListener('click', function() {
            this.style.transform = "scale(0.9) translateY(-2px)";
            setTimeout(() => {
                this.style.transform = "scale(1) translateY(-2px)";
                alert("Mở tính năng thêm mới");
            }, 150);
        });
    }
});
