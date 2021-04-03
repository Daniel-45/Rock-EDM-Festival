document.addEventListener('DOMContentLoaded', function () {
    createGallery();
});

function createGallery() {
    const gallery = document.querySelector('.image-gallery');

    for (let i = 1; i <= 12; i++) {
        const image = document.createElement('img');
        image.src = `build/images/thumb/${i}.webp`;
        image.dataset.imageId = i;

        // Add function showImage
        image.onclick = showImage;

        const list = document.createElement('li');
        list.appendChild(image);

        gallery.appendChild(list);
    }
}

function showImage(e) {
    const id = parseInt(e.target.dataset.imageId);

    // Generate the image
    const image = document.createElement('img');
    image.src = image.src = `build/images/big/${id}.webp`;

    const overlay = document.createElement('div');
    overlay.appendChild(image);
    overlay.classList.add('overlay');

    // Clicking closes the image
    overlay.onclick = function () {
        overlay.remove();
        body.classList.remove('fix-body');
    }

    // Button to close the image
    const closeImage = document.createElement('p');
    closeImage.textContent = 'Cerrar';
    closeImage.classList.add('btn-close');

    // Clicking closes the image
    closeImage.onclick = function () {
        overlay.remove();
        body.classList.remove('fix-body');
    }

    overlay.appendChild(closeImage);

    // Show in HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fix-body');
}