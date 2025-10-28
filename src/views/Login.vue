<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    
    <div class="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <div class="card p-8">
          <div class="mb-6">
            <h2 class="text-2xl font-semibold mb-2" data-testid="text-login-title">Welcome Back</h2>
            <p class="text-gray-600" data-testid="text-login-description">Enter your credentials to access your account</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="email"
                type="email"
                id="email"
                class="input"
                :class="{ 'border-red-500': errors.email }"
                placeholder="you@example.com"
                data-testid="input-email"
              />
              <p v-if="errors.email" class="text-sm text-red-600 mt-1" data-testid="error-email">{{ errors.email }}</p>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                v-model="password"
                type="password"
                id="password"
                class="input"
                :class="{ 'border-red-500': errors.password }"
                placeholder="••••••••"
                data-testid="input-password"
              />
              <p v-if="errors.password" class="text-sm text-red-600 mt-1" data-testid="error-password">{{ errors.password }}</p>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="isLoading"
              data-testid="button-submit"
            >
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>

            <div class="text-center text-sm">
              <span class="text-gray-600">Don't have an account? </span>
              <router-link to="/auth/signup" class="text-blue-600 hover:underline" data-testid="link-signup">Sign up</router-link>
            </div>

            <div class="pt-4 border-t">
              <p class="text-xs text-gray-500 text-center">Test credentials: test@test.com / 123456</p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { loginUser } from '../lib/auth';
import { useAuthStore } from '../stores/auth';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errors = ref({});

const validateForm = () => {
  const newErrors = {};

  if (!email.value) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newErrors.email = 'Please enter a valid email';
  }

  if (!password.value) {
    newErrors.password = 'Password is required';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    const session = loginUser(email.value, password.value);
    authStore.setSession(session);
    toast.success('Welcome back! You have successfully logged in.');
    router.push('/dashboard');
  } catch (error) {
    toast.error(error.message || 'Invalid credentials');
  } finally {
    isLoading.value = false;
  }
};
</script>
