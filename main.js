import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createTextField } from './components/base/TextField.js';
import { createAddForm } from './components/domain/AddForm.js';
import { createSuccessDialog } from './components/domain/SuccessDialog.js';

const SUPABASE_URL = 'https://dfcaehvuxrcljqbquhou.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmY2FlaHZ1eHJjbGpxYnF1aG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NTc2ODMsImV4cCI6MjA5MDUzMzY4M30.drCS5FwYInXVp1HPoyG6Hwe8HDSD4uzVNFYrdx1G9Cg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- 認証 ---
const loginScreen = document.getElementById('login-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const addScreen = document.getElementById('add-screen');

const emailField = createTextField({ label: 'メールアドレス', id: 'login-email', type: 'email', required: true });
const passwordField = createTextField({ label: 'パスワード', id: 'login-password', type: 'password', required: true });
const loginFields = document.getElementById('login-fields');
loginFields.appendChild(emailField.element);
loginFields.appendChild(passwordField.element);

async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    showApp();
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';
  const email = emailField.getValue();
  const password = passwordField.getValue();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    loginError.textContent = 'ログインに失敗しました: ' + error.message;
  } else {
    showApp();
  }
});

function showApp() {
  loginScreen.style.display = 'none';
  addScreen.style.display = '';
}

// --- 追加完了ダイアログ ---
const successDialog = createSuccessDialog({
  onClose: () => {
    addForm.reset();
  }
});

// --- 追加フォーム ---
const addForm = createAddForm({
  onSubmit: async ({ body, sourceTitle, sourceAuthor, quotedAt }) => {
    const result = await supabase.from('quotes').insert({
      body,
      source_title: sourceTitle,
      source_author: sourceAuthor,
      quoted_at: quotedAt
    });
    if (!result.error) {
      successDialog.open({ body, sourceTitle, sourceAuthor });
    }
    return result;
  }
});

document.getElementById('add-form-container').appendChild(addForm.element);

// --- 初期化 ---
checkSession();
