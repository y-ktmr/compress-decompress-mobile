/**
 * 日付入力フィールド（Material Icon の today アイコン付き）
 * @returns {{ element: HTMLDivElement, getValue: () => string, setValue: (v: string) => void, reset: () => void }}
 */
export function createDatePicker() {
  const wrapper = document.createElement('div');
  wrapper.className = 'date-picker-wrapper';

  const input = document.createElement('input');
  input.type = 'date';

  const icon = document.createElement('img');
  icon.src = './assets/today.svg';
  icon.className = 'date-picker-icon';
  icon.alt = '';
  icon.setAttribute('aria-hidden', 'true');
  icon.addEventListener('click', () => {
    if (input.showPicker) input.showPicker();
  });

  wrapper.appendChild(input);
  wrapper.appendChild(icon);

  return {
    element: wrapper,
    getValue: () => input.value,
    setValue: (v) => { input.value = v; },
    reset: () => { input.value = ''; }
  };
}
