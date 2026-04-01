/**
 * テキストエリアフィールド
 * @returns {{ element: HTMLTextAreaElement, getValue: () => string, setValue: (v: string) => void, reset: () => void }}
 */
export function createTextArea() {
  const textarea = document.createElement('textarea');
  return {
    element: textarea,
    getValue: () => textarea.value,
    setValue: (v) => { textarea.value = v; },
    reset: () => { textarea.value = ''; }
  };
}
