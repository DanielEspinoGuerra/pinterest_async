import './ImageCard.scss';

export function createImageCard(collection) {
    const date = new Date(collection.published_at).toLocaleDateString('es-ES');
    // Números simulados para cámara y likes
    const cameraCount = Math.floor(Math.random() * 100) + 1;
    const likesCount = Math.floor(Math.random() * 100) + 1;
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `
        <div class="image-wrapper">
            <img src="${collection.cover_photo.urls.small}" alt="${collection.cover_photo.description || collection.title || 'Colección'}">
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
                <img class="user-avatar" src="${collection.user.profile_image.medium}" alt="${collection.user.name}">
            </div>
        </div>
        <div class="image-info">
            <span class="user-name">${collection.user.name}</span>
            <span class="image-date">${date}</span>
        </div>
    `;
    return card;
}