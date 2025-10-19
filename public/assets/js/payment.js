// Extracted scripts from payment.html
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
});

function copyToClipboard(elementId, valueToCopy = null) {
    const textElement = document.getElementById(elementId);
    const text = valueToCopy || textElement.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const originalBtn = textElement.closest('.info-value-wrapper').querySelector('.copy-btn');
        const originalIcon = originalBtn.innerHTML;
        originalBtn.innerHTML = `<i class="fa-solid fa-check text-green-500"></i>`;
        originalBtn.title = "Đã sao chép!";
        setTimeout(() => { originalBtn.innerHTML = originalIcon; originalBtn.title = "Sao chép"; }, 2000);
    }).catch(err => {
        console.error('Lỗi khi sao chép: ', err);
        alert('Sao chép thất bại!');
    });
}


