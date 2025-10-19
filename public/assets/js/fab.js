// Floating Action Button (FAB) interactions and popups
(function() {
    function setToggleIcon(open) {
        const icon = document.getElementById('toggle-icon');
        if (!icon) return;
        if (open) {
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        } else {
            icon.innerHTML = '<svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/></svg>';
        }
    }

    window.toggleOptions = function() {
        const options = document.querySelector('.floating-options');
        if (!options) return;
        const open = options.style.display === 'flex';
        options.style.display = open ? 'none' : 'flex';
        setToggleIcon(!open);
    };

    window.openPopup = function(type) {
        const el = document.getElementById('popup-' + type);
        if (el) el.style.display = 'flex';
    };

    window.closePopup = function(type, event) {
        if (event) event.stopPropagation();
        const el = document.getElementById('popup-' + type);
        if (el) el.style.display = 'none';
    };

    document.addEventListener('click', function(event) {
        const container = document.querySelector('.floating-container');
        const options = document.querySelector('.floating-options');
        if (!container || !options) return;
        if (!container.contains(event.target)) {
            options.style.display = 'none';
            setToggleIcon(false);
        }
    });
})();


