import { createImageCard } from '../ImageCard/ImageCard.js';

export function renderImageGrid(images) {
  const grid = document.createElement('div');
  grid.className = 'image-grid';
  images.forEach(img => grid.appendChild(createImageCard(img)));
  return grid;
}