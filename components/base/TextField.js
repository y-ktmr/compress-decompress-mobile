import { createInput } from './Input.js';
import { createTextArea } from './TextArea.js';
import { createDatePicker } from './DatePicker.js';

/**
 * ラベル付き入力フィールド（MUI TextField 準拠）
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.id
 * @param {boolean} [props.multiline=false]
 * @param {string} [props.type='text']
 * @param {boolean} [props.required=false]
 * @returns {{ element: HTMLDivElement, getValue: () => string, setValue: (v: string) => void, reset: () => void }}
 */
export function createTextField({ label, id, multiline = false, type = 'text', required = false }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'form-field';

  const labelEl = document.createElement('label');
  labelEl.htmlFor = id;
  labelEl.textContent = label;
  if (required) {
    const star = document.createElement('span');
    star.className = 'required';
    star.textContent = ' *';
    labelEl.appendChild(star);
  }

  let field;
  if (multiline) {
    field = createTextArea();
  } else if (type === 'date') {
    field = createDatePicker();
  } else {
    field = createInput({ type });
  }

  const inputEl = field.element.tagName === 'DIV'
    ? field.element.querySelector('input')
    : field.element;
  if (inputEl) {
    inputEl.id = id;
    if (required) inputEl.required = true;
  }

  wrapper.appendChild(labelEl);
  wrapper.appendChild(field.element);

  return {
    element: wrapper,
    getValue: () => field.getValue(),
    setValue: (v) => field.setValue(v),
    reset: () => field.reset()
  };
}
