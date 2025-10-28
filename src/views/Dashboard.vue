<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    
    <div class="flex-1 py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-semibold mb-2" data-testid="text-dashboard-title">Dashboard</h1>
          <p class="text-gray-600" data-testid="text-dashboard-description">Welcome back, {{ authStore.currentUser.name }}! Here's an overview of your tickets.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="card p-6" data-testid="card-stat-total">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-gray-600">Total Tickets</h3>
              <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div class="text-4xl font-bold" data-testid="text-stat-total">{{ stats.total }}</div>
            <p class="text-xs text-gray-500 mt-1">All tickets in the system</p>
          </div>

          <div class="card p-6" data-testid="card-stat-open">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-gray-600">Open Tickets</h3>
              <svg class="h-4 w-4 text-ticket-open-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="text-4xl font-bold text-ticket-open-text" data-testid="text-stat-open">{{ stats.open }}</div>
            <p class="text-xs text-gray-500 mt-1">Awaiting response</p>
          </div>

          <div class="card p-6" data-testid="card-stat-closed">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-gray-600">Resolved Tickets</h3>
              <svg class="h-4 w-4 text-ticket-closed-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="text-4xl font-bold text-ticket-closed-text" data-testid="text-stat-closed">{{ stats.closed }}</div>
            <p class="text-xs text-gray-500 mt-1">Successfully resolved</p>
          </div>
        </div>

        <div class="card p-6">
          <h2 class="text-lg font-semibold mb-4">Quick Actions</h2>
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/tickets" data-testid="link-view-tickets">
              <button class="btn btn-primary">
                <svg class="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                View All Tickets
              </button>
            </router-link>
            <router-link to="/tickets?action=create" data-testid="link-create-ticket">
              <button class="btn btn-secondary">Create New Ticket</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { getTickets } from '../lib/tickets';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const authStore = useAuthStore();
const stats = ref({ total: 0, open: 0, inProgress: 0, closed: 0 });

onMounted(() => {
  if (authStore.currentUser) {
    const tickets = getTickets(authStore.currentUser.id);
    stats.value = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length,
    };
  }
});
</script>
