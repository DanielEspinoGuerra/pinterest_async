import { createImageCard } from '../ImageCard/ImageCard.js';

export function renderImageGrid(collections) {
  const grid = document.createElement('div');
  grid.className = 'image-grid';
  collections.forEach(collection => grid.appendChild(createImageCard(collection)));
  return grid;
}