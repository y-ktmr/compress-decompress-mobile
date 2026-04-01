import { createTextField } from '../base/TextField.js';
import { createButton } from '../base/Button.js';

/**
 * 追加フォームコンポーネント（モーダルではなくページ内に表示）
 * @param {Object} props
 * @param {(data: {body: string, sourceTitle: string|null, sourceAuthor: string|null, quotedAt: string|null}) => Promise<{error: any}>} props.onSubmit
 * @returns {{ element: HTMLElement, reset: () => void }}
 */
export function createAddForm({ onSubmit }) {
  const container = document.createElement('div');

  const h2 = document.createElement('h2');
  h2.textContent = '新しい言葉を追加';

  const form = document.createElement('form');

  const bodyField = createTextField({ label: '文章', id: 'add-body', multiline: true, required: true });
  const titleField = createTextField({ label: 'タイトル', id: 'add-title' });
  const authorField = createTextField({ label: '著者名', id: 'add-author' });
  const dateField = createTextField({ label: '引用日', id: 'add-date', type: 'date' });

  const actions = document.createElement('div');
  actions.className = 'add-form-buttons';

  const clearBtn = createButton({ label: 'クリア', variant: 'secondary' });
  const submitBtn = createButton({ label: '追加', variant: 'primary', type: 'submit' });

  clearBtn.element.addEventListener('click', () => reset());

  actions.appendChild(clearBtn.element);
  actions.appendChild(submitBtn.element);

  const fieldsGroup = document.createElement('div');
  fieldsGroup.className = 'add-form-fields';
  fieldsGroup.appendChild(bodyField.element);
  fieldsGroup.appendChild(titleField.element);
  fieldsGroup.appendChild(authorField.element);
  fieldsGroup.appendChild(dateField.element);

  form.appendChild(fieldsGroup);
  form.appendChild(actions);
  container.appendChild(h2);
  container.appendChild(form);

  function reset() {
    bodyField.reset();
    titleField.reset();
    authorField.reset();
    dateField.setValue(new Date().toISOString().split('T')[0]);
  }

  // 初期表示時に今日の日付をセット
  dateField.setValue(new Date().toISOString().split('T')[0]);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = bodyField.getValue();
    const sourceTitle = titleField.getValue() || null;
    const sourceAuthor = authorField.getValue() || null;
    const quotedAt = dateField.getValue() || null;

    if (!body) return;

    submitBtn.element.disabled = true;

    const { error } = await onSubmit({ body, sourceTitle, sourceAuthor, quotedAt });

    submitBtn.element.disabled = false;

    if (error) {
      alert('追加に失敗しました: ' + error.message);
    }
  });

  return { element: container, reset };
}
