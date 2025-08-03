export function generateCode() {
  const canvas = document.getElementById('canvas');
  const html = canvas.innerHTML
    .replace(/contenteditable="true"/g, '')
    .replace(/draggable="true"/g, '')
    .replace(/ class="draggable"/g, '');
  // Podemos añadir CSS separado si guardamos estilos inline
  return `<div id="canvas">\n${html.trim().split('\n').map(line => '  ' + line).join('\n')}\n</div>`;
}
