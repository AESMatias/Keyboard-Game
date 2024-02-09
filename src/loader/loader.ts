document.addEventListener('DOMContentLoaded', () => {
    const loader: HTMLElement | null = document.getElementById('loader');

    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none'; // After 1 sec, hide the loader
        }, 1000);
    }
});
