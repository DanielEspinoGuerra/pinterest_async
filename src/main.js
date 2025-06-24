import './main.scss'

import { renderImageGrid } from './components/ImageGrid/ImageGrid.js';
import { renderMessage } from './components/Message/Message.js';

const API_KEY = 'TU_ACCESS_KEY_UNSPLASH'; // Reemplaza con tu clave
const API_URL = 'https://api.unsplash.com/search/photos';

const main = document.querySelector('main');
main.innerHTML = `
  <div id="message-container"></div>
  <div id="results-container"></div>
`;
const resultsContainer = document.getElementById('results-container');
const messageContainer = document.getElementById('message-container');

// Mostrar las imágenes
function showResults(images) {
  resultsContainer.innerHTML = '';
  resultsContainer.appendChild(renderImageGrid(images));
}

// Mostrar el mensaje
function showMessage(text) {
  messageContainer.innerHTML = '';
  messageContainer.appendChild(renderMessage(text));
}

// Obtener las imágenes
async function fetchImages(query) {
  const res = await fetch(`${API_URL}?query=${encodeURIComponent(query)}&per_page=12&client_id=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Buscar gatos por defecto al cargar la página
async function searchAndShowGatos() {
  const images = await fetchImages('gatos');
  showResults(images);
  showMessage('Búsqueda realizada: "gatos"');
}

// Buscar imágenes
async function handleSearch(event) {
  event.preventDefault();
  const searchInput = event.target.search;
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  let images = await fetchImages(searchTerm);
  if (images.length > 0) {
    showResults(images);
    showMessage(`Búsqueda realizada: "${searchTerm}"`);
  } else {
    // Si no se encontraron resultados, mostrar imágenes de gatos (distinto a searchAndShowGatos ya que se indica al usuario que no se encontraron resultados)
    images = await fetchImages('gatos');
    showResults(images);
    showMessage(`No se encontraron resultados para "${searchTerm}". Mostrando imágenes de "gatos". Prueba con otra palabra.`);
  }
  // Limpiar el input después de la búsqueda
  searchInput.value = '';
}

// Esperar a que el DOM esté listo para añadir el event listener
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  // Buscar gatos por defecto al cargar la página
  searchAndShowGatos();

  // Añadir evento al icono de Pinterest para buscar gatos
  const pinterestLogo = document.getElementById('pinterest-logo');
  if (pinterestLogo) {
    pinterestLogo.style.cursor = 'pointer';
    pinterestLogo.addEventListener('click', (e) => {
      e.preventDefault();
      searchAndShowGatos();
    });
  }
});