<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <router-link to="/" class="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors" data-testid="link-home">
          <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span>TicketFlow</span>
        </router-link>

        <div class="hidden md:flex items-center gap-4">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/dashboard" data-testid="link-dashboard">
              <button class="btn btn-ghost">Dashboard</button>
            </router-link>
            <router-link to="/tickets" data-testid="link-tickets">
              <button class="btn btn-ghost">Tickets</button>
            </router-link>
            <div class="flex items-center gap-2 pl-2 border-l">
              <span class="text-sm text-gray-600" data-testid="text-user-name">{{ authStore.currentUser.name }}</span>
              <button @click="handleLogout" class="btn btn-ghost" data-testid="button-logout">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </template>
          <template v-else>
            <router-link to="/auth/login" data-testid="link-login">
              <button class="btn btn-ghost">Login</button>
            </router-link>
            <router-link to="/auth/signup" data-testid="link-signup">
              <button class="btn btn-primary">Get Started</button>
            </router-link>
          </template>
        </div>

        <button @click="toggleMobileMenu" class="md:hidden btn btn-ghost" data-testid="button-mobile-menu">
          <svg v-if="!mobileMenuOpen" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden border-t bg-white">
      <div class="px-4 py-4 space-y-2">
        <template v-if="authStore.isAuthenticated">
          <router-link to="/dashboard" @click="toggleMobileMenu">
            <button class="btn btn-ghost w-full text-left">Dashboard</button>
          </router-link>
          <router-link to="/tickets" @click="toggleMobileMenu">
            <button class="btn btn-ghost w-full text-left">Tickets</button>
          </router-link>
          <div class="pt-2 border-t">
            <p class="text-sm text-gray-600 px-3 py-2">{{ authStore.currentUser.name }}</p>
            <button @click="handleLogout" class="btn btn-ghost w-full text-left">Logout</button>
          </div>
        </template>
        <template v-else>
          <router-link to="/auth/login" @click="toggleMobileMenu">
            <button class="btn btn-ghost w-full text-left">Login</button>
          </router-link>
          <router-link to="/auth/signup" @click="toggleMobileMenu">
            <button class="btn btn-primary w-full">Get Started</button>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleLogout = () => {
  authStore.logout();
  router.push('/');
  mobileMenuOpen.value = false;
};
</script>
