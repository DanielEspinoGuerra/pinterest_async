import './main.scss'

// Función para manejar la búsqueda
function handleSearch(event) {
  event.preventDefault()
  // Valor del input + limpiar espacios
  const searchTerm = event.target.search.value.trim()
  
  if (searchTerm) {
    // Mostrar la búsqueda realizada
    const searchHistory = document.querySelector('.search-history')
    const searchItem = document.createElement('p')
    searchHistory.innerHTML = ''
    searchItem.textContent = `Búsqueda realizada: ${searchTerm}`
    searchHistory.appendChild(searchItem)
    
    // Limpiar el input
    document.querySelector('.search-input').value = ''
  }
}

// Agregar el event listener al formulario de búsqueda
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form')
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch)
  }
})