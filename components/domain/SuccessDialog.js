/**
 * 追加完了ダイアログ（ExpandedCard プレビュー + 「続けて追加する」ボタン）
 * @param {Object} props
 * @param {() => void} props.onClose
 * @returns {{ element: HTMLElement, open: (quote: {body: string, sourceTitle: string|null, sourceAuthor: string|null}) => void }}
 */
export function createSuccessDialog({ onClose }) {
  const dialog = document.getElementById('success-dialog');
  const preview = document.getElementById('success-preview');
  const closeBtn = document.getElementById('success-close');

  function open(quote) {
    preview.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'success-card';

    const quoteText = document.createElement('p');
    quoteText.className = 'quoteText';
    quoteText.innerHTML = quote.body.replace(/\n/g, '<br>');
    card.appendChild(quoteText);

    const metaRow = document.createElement('div');
    metaRow.className = 'displayFlex';

    if (quote.sourceTitle) {
      const title = document.createElement('p');
      title.className = 'title';
      title.textContent = quote.sourceTitle;
      metaRow.appendChild(title);
    }

    if (quote.sourceAuthor) {
      const author = document.createElement('p');
      author.className = 'author';
      author.textContent = quote.sourceAuthor;
      metaRow.appendChild(author);
    }

    if (quote.sourceTitle || quote.sourceAuthor) {
      card.appendChild(metaRow);
    }

    preview.appendChild(card);
    dialog.style.display = 'flex';
  }

  closeBtn.addEventListener('click', () => {
    dialog.style.display = 'none';
    onClose();
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.style.display = 'none';
      onClose();
    }
  });

  return { element: dialog, open };
}
