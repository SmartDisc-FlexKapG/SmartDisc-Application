import { ref, readonly } from 'vue'

const STORAGE_KEY = 'sd_preferences'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function persist(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const _stored   = load()
const _language = ref(_stored?.language ?? null)
const _theme    = ref(_stored?.theme    ?? null)
const _set      = ref(_stored?.language != null && _stored?.theme != null)

function applyTheme(theme) {
  if (!theme) return
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = theme === 'dark' || (theme === 'system' && prefersDark)
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

if (_set.value) applyTheme(_stored.theme)

export function usePreferences() {
  function saveLanguage(lang) {
    _language.value = lang
    persist({ language: lang, theme: _theme.value })
    _set.value = _language.value != null && _theme.value != null
  }

  function saveTheme(theme) {
    _theme.value = theme
    persist({ language: _language.value, theme })
    _set.value = _language.value != null && _theme.value != null
    applyTheme(theme)
  }

  function savePreferences(language, theme) {
    _language.value = language
    _theme.value    = theme
    _set.value      = true
    persist({ language, theme })
    applyTheme(theme)
  }

  return {
    language: readonly(_language),
    theme:    readonly(_theme),
    isSet:    readonly(_set),
    saveLanguage,
    saveTheme,
    savePreferences,
  }
}
