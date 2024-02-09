document.addEventListener('DOMContentLoaded', function () {
    var loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function () {
            loader.style.display = 'none'; // After 1 sec, hide the loader
        }, 1000);
    }
});
