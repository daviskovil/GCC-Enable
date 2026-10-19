/**
 * Contact and newsletter form handling. Submits to Web3Forms (default) or
 * public/contact.php, depending on site.formHandler. Settings are passed in
 * via data attributes on <body> so this file never needs editing.
 */

const cfg = document.body.dataset;
const handler = cfg.formHandler === 'php' ? 'php' : 'web3forms';
const accessKey = cfg.web3formsKey || '';
const keyMissing = handler === 'web3forms' && (!accessKey || /YOUR_|PLACEHOLDER/i.test(accessKey));

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function setError(field: Field, message: string) {
  const errorEl = document.getElementById(`${field.id}-error`);
  if (message) {
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  } else {
    field.removeAttribute('aria-invalid');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
  }
}

function validate(form: HTMLFormElement, focus = true): boolean {
  let firstInvalid: Field | null = null;
  form.querySelectorAll<Field>('[required]').forEach((field) => {
    let message = '';
    if (field instanceof HTMLInputElement && field.type === 'checkbox') {
      if (!field.checked) message = field.dataset.error || 'Please tick this box to continue.';
    } else if (!field.value.trim()) {
      message = field.dataset.error || 'This field is required.';
    } else if (field instanceof HTMLInputElement && field.type === 'email' && !emailOk(field.value.trim())) {
      message = 'Please enter a valid email address.';
    }
    if (field.id) setError(field, message);
    if (message && !firstInvalid) firstInvalid = field;
  });
  if (firstInvalid && focus) (firstInvalid as Field).focus();
  return !firstInvalid;
}

async function submit(form: HTMLFormElement): Promise<{ ok: boolean; message?: string }> {
  const data = new FormData(form);
  // Honeypot: real people never tick the hidden box
  if (data.get('botcheck')) return { ok: true };

  // Collapse checkbox groups into one readable line
  const interests = data.getAll('interest');
  if (interests.length) {
    data.delete('interest');
    data.set('interest', interests.join(', '));
  }

  if (handler === 'php') {
    const res = await fetch('/contact.php', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok && json.success !== false, message: json.message };
  }

  data.set('access_key', accessKey);
  data.set('from_name', 'GCC Enable website');
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok && json.success !== false, message: json.message };
}

document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const success = form.parentElement?.querySelector<HTMLElement>('[data-form-success]');
  const defaultStatus = status?.textContent ?? '';

  const setStatus = (text: string, state?: 'error' | 'success') => {
    if (!status) return;
    status.textContent = text;
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };

  // Re-validate a field once the user has been shown an error on it
  form.querySelectorAll<Field>('[required]').forEach((field) => {
    const recheck = () => {
      if (field.getAttribute('aria-invalid')) validate(form, false);
    };
    field.addEventListener('change', recheck);
    field.addEventListener('input', recheck);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate(form)) {
      setStatus('Please check the highlighted fields.', 'error');
      return;
    }
    if (keyMissing) {
      setStatus('This form is not connected yet. Please email us directly instead.', 'error');
      console.warn('GCC Enable: set web3formsKey in src/config/site.ts to enable forms.');
      return;
    }

    const label = button?.innerHTML;
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }
    try {
      const result = await submit(form);
      if (!result.ok) throw new Error(result.message || 'Submission failed');
      form.reset();
      if (success) {
        form.hidden = true;
        success.hidden = false;
        success.focus();
      } else {
        setStatus('Thanks, you are subscribed. Look out for the next note.', 'success');
      }
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong. Please try again or email us directly.', 'error');
    } finally {
      if (button && label) {
        button.disabled = false;
        button.innerHTML = label;
      }
    }
  });

  form.addEventListener('reset', () => {
    if (!success) return;
    setStatus(defaultStatus);
  });
});
