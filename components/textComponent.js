export function createTextComponent() {
  const wrapper = document.createElement('div');
  wrapper.textContent = 'Texto editable';
  return wrapper;
}
