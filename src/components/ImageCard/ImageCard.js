import './ImageCard.scss';

export function createImageCard(image) {
    const date = new Date(image.created_at).toLocaleDateString('es-ES');
    // Números simulados para cámara y likes
    const cameraCount = Math.floor(Math.random() * 100) + 1;
    const likesCount = Math.floor(Math.random() * 100) + 1;
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `
        <div class="image-wrapper">
            <img src="${image.urls.small}" alt="${image.alt_description || 'Imagen'}">
            <div class="badge badge-camera">
                <i class="bi bi-camera"></i>
                <span>${cameraCount}</span>
            </div>
            <div class="badge badge-heart">
                <i class="bi bi-heart"></i>
                <span>${likesCount}</span>
            </div>
            <div class="overlay">
                <button class="visit-btn">Visitar</button>
            </div>
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