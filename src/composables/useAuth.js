import { ref, computed, readonly } from 'vue'

const _user    = ref(null)
const _pending = ref(null)   // { email, name?, redirectTo } — set between credential check and code verify
const _isLoading = ref(false)
const _error     = ref(null)

export function useAuth() {
  const isAuthenticated     = computed(() => _user.value !== null)
  const pendingVerification = readonly(_pending)

  function clearError() { _error.value = null }

  async function signIn(email, password) {
    _isLoading.value = true
    _error.value = null
    try {
      await _api.signIn(email, password)
      _pending.value = { email, redirectTo: '/discs' }
    } catch (e) {
      _error.value = e.message || 'Sign-in failed. Please try again.'
      throw e
    } finally {
      _isLoading.value = false
    }
  }

  async function signUp(name, email, password) {
    _isLoading.value = true
    _error.value = null
    try {
      await _api.signUp(name, email, password)
      _pending.value = { email, name, redirectTo: '/onboarding' }
    } catch (e) {
      _error.value = e.message || 'Account creation failed. Please try again.'
      throw e
    } finally {
      _isLoading.value = false
    }
  }

  async function verify(code) {
    if (!_pending.value) throw new Error('No pending verification.')
    _isLoading.value = true
    _error.value = null
    try {
      await _api.verify(code)
      const { email, name, redirectTo } = _pending.value
      _user.value    = { id: '1', email, name: name ?? email.split('@')[0] }
      _pending.value = null
      return redirectTo
    } catch (e) {
      _error.value = e.message || 'Invalid code. Please try again.'
      throw e
    } finally {
      _isLoading.value = false
    }
  }

  async function resendCode() {
    if (!_pending.value) return
    await _api.resendCode(_pending.value.email)
  }

  async function signOut() {
    await _api.signOut()
    _user.value = null
  }

  async function sendPasswordReset(email) {
    _isLoading.value = true
    _error.value = null
    try {
      await _api.sendPasswordReset(email)
    } catch (e) {
      _error.value = e.message || 'Could not send reset link. Please try again.'
      throw e
    } finally {
      _isLoading.value = false
    }
  }

  return {
    user: readonly(_user),
    isAuthenticated,
    pendingVerification,
    isLoading: readonly(_isLoading),
    error: readonly(_error),
    clearError,
    signIn,
    signUp,
    verify,
    resendCode,
    signOut,
    sendPasswordReset,
  }
}

// ---------------------------------------------------------------------------
// Stub API — replace each method with real HTTP calls when the backend is ready.
// ---------------------------------------------------------------------------
const _api = {
  async signIn(_email, _password) {
    await _delay(900)
    // throw new Error('Invalid email or password')
  },

  async signUp(_name, _email, _password) {
    await _delay(900)
  },

  async verify(code) {
    await _delay(700)
    if (code.length !== 6) throw new Error('Enter the full 6-digit code.')
    // throw new Error('Incorrect code. Please try again.') // uncomment to test error
  },

  async resendCode(_email) {
    await _delay(600)
  },

  async signOut() {
    await _delay(200)
  },

  async sendPasswordReset(_email) {
    await _delay(700)
  },
}

function _delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
