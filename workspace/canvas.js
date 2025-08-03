let draggedType = null;

export function handleDrop(e) {
  e.preventDefault();
  const canvas = document.getElementById('canvas');
  const placeholder = canvas.querySelector('.placeholder');
  if (placeholder) placeholder.remove();

  const component = createComponent(draggedType);
  makeEditable(component);
  canvas.appendChild(component);
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
      throw new Error('Tipo desconocido: ' + type);
  }
}

function makeEditable(el) {
  el.contentEditable = true;
  el.classList.add('draggable');
  el.addEventListener('dragstart', startDrag);
  el.setAttribute('draggable', 'true');
}

function startDrag(e) {
  draggedType = null; // Para mover en canvas
  e.dataTransfer.setData('text/plain', null);
}

document.querySelectorAll('#sidebar .component').forEach(item => {
  item.addEventListener('dragstart', e => {
    draggedType = e.target.dataset.type;
  });
});
