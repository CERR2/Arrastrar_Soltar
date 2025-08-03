export function createContainerComponent() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="container">
      <p>Contenedor</p>
    </div>`;
  return wrapper;
}
