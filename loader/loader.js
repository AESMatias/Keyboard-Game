document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');

    setTimeout(() => {
        loader.style.display = 'none'; // AFter 1 sec, hide the loader
    }, 1000);
});
