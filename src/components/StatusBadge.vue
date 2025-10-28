<template>
  <span 
    :class="badgeClasses" 
    class="px-3 py-1 rounded-full text-xs font-medium border"
    :data-testid="`badge-status-${status}`"
  >
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['open', 'in_progress', 'closed'].includes(value),
  },
});

const badgeClasses = computed(() => {
  const styles = {
    open: 'bg-ticket-open-bg text-ticket-open-text border-ticket-open-border',
    in_progress: 'bg-ticket-in_progress-bg text-ticket-in_progress-text border-ticket-in_progress-border',
    closed: 'bg-ticket-closed-bg text-ticket-closed-text border-ticket-closed-border',
  };
  return styles[props.status];
});

const label = computed(() => {
  const labels = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed',
  };
  return labels[props.status];
});
</script>
