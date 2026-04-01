/**
 * ラベル付きボタン
 * @param {Object} props
 * @param {string} props.label
 * @param {string} [props.variant='primary']
 * @param {string} [props.type='button']
 * @param {string} [props.className='']
 * @returns {{ element: HTMLButtonElement }}
 */
export function createButton({ label, variant = 'primary', type = 'button', className = '' }) {
  const btn = document.createElement('button');
  btn.type = type;
  btn.textContent = label;
  btn.className = `btn btn-${variant} ${className}`.trim();
  return { element: btn };
}
