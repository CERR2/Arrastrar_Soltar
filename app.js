import interact from 'https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js';

let selectedEl = null;
const inspector = document.getElementById('inspector');
const fields = {
  bgColor:  document.getElementById('prop-bgColor'),
  width:    document.getElementById('prop-width'),
  height:   document.getElementById('prop-height'),
  borderR:  document.getElementById('prop-borderRadius'),
  left:     document.getElementById('prop-left'),
  top:      document.getElementById('prop-top'),
};

function initInspector() {
  // Al seleccionar un elemento
  document.getElementById('canvas').addEventListener('click', e => {
    if (!e.target.classList.contains('component')) return;
    if (selectedEl) selectedEl.classList.remove('selected');

    selectedEl = e.target;
    selectedEl.classList.add('selected');
    showInspector(selectedEl);
  });

  // Conexión de inputs
  Object.entries(fields).forEach(([key, input]) => {
    input.addEventListener('input', () => {
      if (!selectedEl) return;
      let val = input.value;
      switch (key) {
        case 'bgColor': selectedEl.style.backgroundColor = val; break;
        case 'width':   selectedEl.style.width  = val + 'px'; break;
        case 'height':  selectedEl.style.height = val + 'px'; break;
        case 'borderR': selectedEl.style.borderRadius = val + 'px'; break;
        case 'left':    selectedEl.style.left   = val + 'px'; break;
        case 'top':     selectedEl.style.top    = val + 'px'; break;
      }
    });
  });

  // Interact.js para drag & resize
  let selectedEl = null;
  export function initDragAndDrop() {
  interact('.component')
    .draggable({
      modifiers: [ interact.modifiers.restrict({
        restriction: '#canvas',
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      })],
      listeners: {
        move(event) {
          const el = event.target;
          const x = (parseFloat(el.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(el.getAttribute('data-y')) || 0) + event.dy;
          el.style.transform = `translate(${x}px, ${y}px)`;
          el.setAttribute('data-x', x);
          el.setAttribute('data-y', y);
          // Actualizamos inspector
          if (el === selectedEl) {
            fields.left.value = Math.round(el.getBoundingClientRect().left - canvas.getBoundingClientRect().left);
            fields.top.value  = Math.round(el.getBoundingClientRect().top  - canvas.getBoundingClientRect().top);
          }
        }
      }
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          let { x, y } = event.target.dataset;
          x = parseFloat(x) || 0;
          y = parseFloat(y) || 0;

          // Ajusta tamaño
          event.target.style.width  = event.rect.width + 'px';
          event.target.style.height = event.rect.height + 'px';

          // Ajusta posición si se redimensiona desde bordes superiores/izquierdos
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          event.target.style.transform = `translate(${x}px,${y}px)`;
          event.target.dataset.x = x;
          event.target.dataset.y = y;

          // Refresca inspector si está seleccionado
          if (event.target === selectedEl) {
            fields.width.value  = Math.round(event.rect.width);
            fields.height.value = Math.round(event.rect.height);
          }
        }
      },
      modifiers: [
        interact.modifiers.restrictSize({ min: { width: 30, height: 20 } })
      ]
    });
}

function showInspector(el) {
  inspector.classList.remove('hidden');
  const styles = window.getComputedStyle(el);
  fields.bgColor.value = rgbToHex(styles.backgroundColor);
  fields.width.value   = parseInt(styles.width);
  fields.height.value  = parseInt(styles.height);
  fields.borderR.value = parseInt(styles.borderRadius);
  const canvasRect = document.getElementById('canvas').getBoundingClientRect();
  const elRect     = el.getBoundingClientRect();
  fields.left.value = Math.round(elRect.left - canvasRect.left);
  fields.top.value  = Math.round(elRect.top  - canvasRect.top);
}

// Convierte "rgb(r,g,b)" a "#rrggbb"
function rgbToHex(rgb) {
  const [r,g,b] = rgb.match(/\d+/g).map(n => parseInt(n));
  return '#'+[r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

// Invoca tras initDragAndDrop()
window.addEventListener('DOMContentLoaded', () => {
  initDragAndDrop();
  initInspector();                 // <— ¡No lo olvides!
  console.log('Inspector listo');  // Para asegurarte que corre
});



