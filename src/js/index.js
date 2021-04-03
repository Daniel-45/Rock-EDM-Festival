document.addEventListener('DOMContentLoaded', function () {
    scrollNav();
    fixedNavigation();
});

function fixedNavigation() {

    const nav = document.querySelector('.header');

    // Register intersection observer
    // entries gives the information of the element to observe
    const observer = new IntersectionObserver(function(entries) {
        // console.log(entries[0]);
        if (entries[0].isIntersecting) {
            nav.classList.remove('fixed-top');
        } else {
            nav.classList.add('fixed-top');
        }
    });

    // Element to observe
    observer.observe(document.querySelector('.video'));
}

function scrollNav() {
    const links = document.querySelectorAll('.main-navigation a');

    links.forEach(function (link) {
        console.log(link);
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(e.target.attributes.href.value);

            section.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
