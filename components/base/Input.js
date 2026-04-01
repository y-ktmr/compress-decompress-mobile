/**
 * テキスト入力フィールド
 * @param {Object} props
 * @param {string} [props.type='text']
 * @returns {{ element: HTMLInputElement, getValue: () => string, setValue: (v: string) => void, reset: () => void }}
 */
export function createInput({ type = 'text' } = {}) {
  const input = document.createElement('input');
  input.type = type;
  return {
    element: input,
    getValue: () => input.value,
    setValue: (v) => { input.value = v; },
    reset: () => { input.value = ''; }
  };
}
