import './ImageCard.scss';

export function createImageCard(image) {
    const date = new Date(image.created_at).toLocaleDateString('es-ES');
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `
        <div class="image-wrapper">
            <img src="${image.urls.small}" alt="${image.alt_description || 'Imagen'}">
            <div class="user-avatar-wrapper">
                <img class="user-avatar" src="${image.user.profile_image.medium}" alt="${image.user.name}">
            </div>
        </div>
        <div class="image-info">
            <span class="user-name">${image.user.name}</span>
            <span class="image-date">${date}</span>
        </div>
    `;
    return card;
}