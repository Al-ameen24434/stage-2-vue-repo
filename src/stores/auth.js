import { defineStore } from 'pinia';
import { getSession, clearSession } from '../lib/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: null,
    isLoading: true,
  }),

  getters: {
    isAuthenticated: (state) => !!state.session,
    currentUser: (state) => state.session?.user || null,
  },

  actions: {
    initialize() {
      this.session = getSession();
      this.isLoading = false;
    },

    setSession(session) {
      this.session = session;
    },

    logout() {
      clearSession();
      this.session = null;
    },
  },
});
