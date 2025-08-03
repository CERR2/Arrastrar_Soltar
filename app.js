import { createButtonComponent } from './components/buttonComponent.js';
import { createTextComponent } from './components/textComponent.js';
import { createContainerComponent } from './components/containerComponent.js';
import { generateCode }        from './utils/codeGenerator.js';

let draggedType = null;

function initDragAndDrop() {
  const sidebar = document.getElementById('sidebar');
  const canvas  = document.getElementById('canvas');
  const btnView = document.getElementById('btnViewCode');
  const codeOut = document.getElementById('codeOutput');

  // 1. Inicio del drag en la barra lateral
  sidebar.addEventListener('dragstart', e => {
    if (e.target.classList.contains('component')) {
      draggedType = e.target.dataset.type;
    }
  });

  // 2. Permitir drop en canvas
  canvas.addEventListener('dragover', e => e.preventDefault());
  canvas.addEventListener('drop', e => {
    e.preventDefault();
    if (!draggedType) return;

    // Eliminar placeholder la primera vez
    const ph = canvas.querySelector('.placeholder');
    if (ph) ph.remove();

    // Crear componente y hacerlo editable/arrastrable
    const el = createComponent(draggedType);
    makeEditable(el);
    canvas.appendChild(el);

    draggedType = null;
  });

  // 3. Mostrar/ocultar código
  btnView.addEventListener('click', () => {
    codeOut.textContent = generateCode();
    codeOut.classList.toggle('hidden');
  });

  // 4. Registrar PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(() => console.log('SW registrado'))
      .catch(err => console.error(err));
  }
}

function createComponent(type) {
  switch (type) {
    case 'button':
      return createButtonComponent();
    case 'text':
      return createTextComponent();
    case 'container':
      return createContainerComponent();
    default:
      throw new Error('Componente desconocido: ' + type);
  }
}

function makeEditable(el) {
  el.contentEditable = 'true';
  el.classList.add('draggable');
  el.setAttribute('draggable', 'true');

  // (Opcional) si quieres permitir reorganizar dentro del canvas:
  el.addEventListener('dragstart', e => {
    // Podrías guardar el elemento en una variable
    // y luego reposicionarlo en 'drop' si drop.target está dentro de canvas
  });
}

// Arrancamos todo tras cargar el DOM
window.addEventListener('DOMContentLoaded', initDragAndDrop);