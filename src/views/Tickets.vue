<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    
    <div class="flex-1 py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-semibold mb-2" data-testid="text-tickets-title">Tickets</h1>
            <p class="text-gray-600" data-testid="text-tickets-description">Manage and track all your support tickets</p>
          </div>
          <button @click="openCreateDialog" class="btn btn-primary" data-testid="button-create-ticket">
            <svg class="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Ticket
          </button>
        </div>

        <div class="space-y-4">
          <div v-if="tickets.length === 0" class="card p-12 text-center" data-testid="card-empty-state">
            <p class="text-gray-600 mb-4">No tickets yet. Create your first ticket to get started.</p>
            <button @click="openCreateDialog" class="btn btn-secondary">
              <svg class="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Ticket
            </button>
          </div>

          <div v-for="ticket in tickets" :key="ticket.id" class="card p-6" :data-testid="`card-ticket-${ticket.id}`">
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-lg font-semibold" :data-testid="`text-ticket-title-${ticket.id}`">{{ ticket.title }}</h3>
                  <StatusBadge :status="ticket.status" />
                </div>
                <p class="text-gray-600 text-sm" :data-testid="`text-ticket-description-${ticket.id}`">{{ ticket.description }}</p>
              </div>
              <div class="flex gap-2">
                <button @click="openEditDialog(ticket)" class="btn btn-ghost p-2" :data-testid="`button-edit-${ticket.id}`">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="openDeleteDialog(ticket)" class="btn btn-ghost p-2 text-red-600" :data-testid="`button-delete-${ticket.id}`">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span :data-testid="`text-ticket-date-${ticket.id}`">{{ formatDate(ticket.createdAt) }}</span>
              <span class="capitalize" :data-testid="`text-ticket-priority-${ticket.id}`">Priority: {{ ticket.priority }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Dialog -->
    <div v-if="showDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeDialog">
      <div class="card p-6 max-w-md w-full mx-4" :data-testid="dialogMode === 'create' ? 'dialog-create-ticket' : 'dialog-edit-ticket'">
        <h2 class="text-xl font-semibold mb-4">{{ dialogMode === 'create' ? 'Create New Ticket' : 'Edit Ticket' }}</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input v-model="formData.title" type="text" class="input" :class="{ 'border-red-500': formErrors.title }" placeholder="Brief description of the issue" :data-testid="`input-${dialogMode}-title`" />
            <p v-if="formErrors.title" class="text-sm text-red-600 mt-1" :data-testid="`error-${dialogMode}-title`">{{ formErrors.title }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea v-model="formData.description" rows="4" class="input" :class="{ 'border-red-500': formErrors.description }" placeholder="Detailed description of the issue" :data-testid="`input-${dialogMode}-description`"></textarea>
            <p v-if="formErrors.description" class="text-sm text-red-600 mt-1" :data-testid="`error-${dialogMode}-description`">{{ formErrors.description }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select v-model="formData.status" class="input" :data-testid="`select-${dialogMode}-status`">
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select v-model="formData.priority" class="input" :data-testid="`select-${dialogMode}-priority`">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="closeDialog" class="btn btn-secondary" :data-testid="`button-cancel-${dialogMode}`">Cancel</button>
          <button @click="handleSubmit" class="btn btn-primary" :data-testid="`button-confirm-${dialogMode}`">
            {{ dialogMode === 'create' ? 'Create Ticket' : 'Update Ticket' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeDeleteDialog">
      <div class="card p-6 max-w-md w-full mx-4" data-testid="dialog-delete-ticket">
        <h2 class="text-xl font-semibold mb-2">Delete Ticket</h2>
        <p class="text-gray-600 mb-6">Are you sure you want to delete this ticket? This action cannot be undone.</p>
        <div class="flex justify-end gap-3">
          <button @click="closeDeleteDialog" class="btn btn-secondary" data-testid="button-cancel-delete">Cancel</button>
          <button @click="handleDelete" class="btn btn-destructive" data-testid="button-confirm-delete">Delete</button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/auth';
import { getTickets, createTicket, updateTicket, deleteTicket } from '../lib/tickets';
import { format } from 'date-fns';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import StatusBadge from '../components/StatusBadge.vue';

const toast = useToast();
const authStore = useAuthStore();

const tickets = ref([]);
const showDialog = ref(false);
const showDeleteDialog = ref(false);
const dialogMode = ref('create');
const selectedTicket = ref(null);
const formData = ref({ title: '', description: '', status: 'open', priority: 'medium' });
const formErrors = ref({});

const loadTickets = () => {
  if (authStore.currentUser) {
    tickets.value = getTickets(authStore.currentUser.id);
  }
};

const validateForm = () => {
  const errors = {};
  if (!formData.value.title.trim()) errors.title = 'Title is required';
  if (!formData.value.description.trim()) errors.description = 'Description is required';
  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const openCreateDialog = () => {
  dialogMode.value = 'create';
  formData.value = { title: '', description: '', status: 'open', priority: 'medium' };
  formErrors.value = {};
  showDialog.value = true;
};

const openEditDialog = (ticket) => {
  dialogMode.value = 'edit';
  selectedTicket.value = ticket;
  formData.value = { ...ticket };
  formErrors.value = {};
  showDialog.value = true;
};

const openDeleteDialog = (ticket) => {
  selectedTicket.value = ticket;
  showDeleteDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  selectedTicket.value = null;
};

const closeDeleteDialog = () => {
  showDeleteDialog.value = false;
  selectedTicket.value = null;
};

const handleSubmit = () => {
  if (!validateForm() || !authStore.currentUser) return;

  try {
    if (dialogMode.value === 'create') {
      createTicket(
        formData.value.title,
        formData.value.description,
        formData.value.status,
        formData.value.priority,
        authStore.currentUser.id
      );
      toast.success('Ticket created successfully');
    } else {
      updateTicket(selectedTicket.value.id, formData.value);
      toast.success('Ticket updated successfully');
    }
    closeDialog();
    loadTickets();
  } catch (error) {
    toast.error('Failed to save ticket');
  }
};

const handleDelete = () => {
  if (!selectedTicket.value) return;

  try {
    deleteTicket(selectedTicket.value.id);
    toast.success('Ticket deleted successfully');
    closeDeleteDialog();
    loadTickets();
  } catch (error) {
    toast.error('Failed to delete ticket');
  }
};

const formatDate = (dateString) => {
  return format(new Date(dateString), 'MMM d, yyyy');
};

onMounted(() => {
  loadTickets();
});
</script>
