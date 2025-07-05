import './main.scss'

import { renderImageGrid } from './components/ImageGrid/ImageGrid.js';
import { renderMessage } from './components/Message/Message.js';

const API_KEY = 'TU_ACCESS_KEY_UNSPLASH'; // Reemplaza con tu clave
const API_URL = 'https://api.unsplash.com/search/collections'; // URL de la API de Unsplash

// Función para obtener la primera búsqueda guardada
function getPrimeraBusqueda() {
  return localStorage.getItem('primeraBusqueda');
}

// Función para guardar la primera búsqueda
function setPrimeraBusqueda(busqueda) {
  localStorage.setItem('primeraBusqueda', busqueda);
}

// Contenedor principal donde se mostrarán las imágenes y los mensajes
const main = document.querySelector('main');
main.innerHTML = `
  <div id="message-container"></div>
  <div id="results-container"></div>
`;
const resultsContainer = document.getElementById('results-container');
const messageContainer = document.getElementById('message-container');

// Mostrar las colecciones
function showResults(collections) {
  resultsContainer.innerHTML = '';
  resultsContainer.appendChild(renderImageGrid(collections));
}

// Mostrar el mensaje
function showMessage(text) {
  messageContainer.innerHTML = '';
  messageContainer.appendChild(renderMessage(text));
}

// Obtener las colecciones
async function fetchCollections(query) {
  const res = await fetch(`${API_URL}?query=${encodeURIComponent(query)}&per_page=12&client_id=${API_KEY}`);
  const data = await res.json();
  console.log(data.results.length + " colecciones encontradas");
  console.log(data.total + " colecciones totales");
  return data.results;
}

// Buscar gatos por defecto al cargar la página
async function searchAndShowGatos() {
  const collections = await fetchCollections('gatos');
  showResults(collections);
  showMessage('Búsqueda realizada: "gatos"');
}

// Buscar colecciones
async function handleSearch(event) {
  event.preventDefault();
  const searchInput = event.target.search;
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  // Guardar la primera búsqueda del usuario si aún no se ha guardado
  if (!getPrimeraBusqueda()) {
    setPrimeraBusqueda(searchTerm);
  }

  let collections = await fetchCollections(searchTerm);
  if (collections.length > 0) {
    showResults(collections);
    showMessage(`Búsqueda realizada: "${searchTerm}" ${collections.length} colecciones encontradas | `);
  } else {
    // Si no se encontraron resultados, mostrar la primera búsqueda del usuario
    const primeraBusqueda = getPrimeraBusqueda();
    if (primeraBusqueda && primeraBusqueda !== searchTerm) {
      collections = await fetchCollections(primeraBusqueda);
      showResults(collections);
      showMessage(`No se encontraron resultados para "${searchTerm}". Mostrando colecciones de "${primeraBusqueda}". Prueba con otra palabra.`);
    } else {
      // Si no hay primera búsqueda o es la misma, mostrar gatos como última opción por defecto
      collections = await fetchCollections('gatos');
      showResults(collections);
      showMessage(`No se encontraron resultados para "${searchTerm}". Mostrando colecciones de "gatos". Prueba con otra palabra.`);
    }
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