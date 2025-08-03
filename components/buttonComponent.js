export function createButtonComponent() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<button class="btn">Clic aquí</button>`;
  return wrapper;
}
