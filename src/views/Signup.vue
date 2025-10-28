<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    
    <div class="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <div class="card p-8">
          <div class="mb-6">
            <h2 class="text-2xl font-semibold mb-2" data-testid="text-signup-title">Create an Account</h2>
            <p class="text-gray-600" data-testid="text-signup-description">Get started with TicketFlow today</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="name"
                type="text"
                id="name"
                class="input"
                :class="{ 'border-red-500': errors.name }"
                placeholder="John Doe"
                data-testid="input-name"
              />
              <p v-if="errors.name" class="text-sm text-red-600 mt-1" data-testid="error-name">{{ errors.name }}</p>
            </div>

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

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                v-model="confirmPassword"
                type="password"
                id="confirmPassword"
                class="input"
                :class="{ 'border-red-500': errors.confirmPassword }"
                placeholder="••••••••"
                data-testid="input-confirm-password"
              />
              <p v-if="errors.confirmPassword" class="text-sm text-red-600 mt-1" data-testid="error-confirm-password">{{ errors.confirmPassword }}</p>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="isLoading"
              data-testid="button-submit"
            >
              {{ isLoading ? 'Creating account...' : 'Create Account' }}
            </button>

            <div class="text-center text-sm">
              <span class="text-gray-600">Already have an account? </span>
              <router-link to="/auth/login" class="text-blue-600 hover:underline" data-testid="link-login">Login</router-link>
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
import { registerUser, loginUser } from '../lib/auth';
import { useAuthStore } from '../stores/auth';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const errors = ref({});

const validateForm = () => {
  const newErrors = {};

  if (!name.value) newErrors.name = 'Name is required';
  if (!email.value) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newErrors.email = 'Please enter a valid email';
  }
  if (!password.value) {
    newErrors.password = 'Password is required';
  } else if (password.value.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }
  if (!confirmPassword.value) {
    newErrors.confirmPassword = 'Please confirm your password';
  } else if (password.value !== confirmPassword.value) {
    newErrors.confirmPassword = 'Passwords do not match';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    registerUser(email.value, password.value, name.value);
    const session = loginUser(email.value, password.value);
    authStore.setSession(session);
    toast.success('Account created! Welcome to TicketFlow.');
    router.push('/dashboard');
  } catch (error) {
    toast.error(error.message || 'An error occurred');
  } finally {
    isLoading.value = false;
  }
};
</script>
