<template>
  <footer class="border-t bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span class="text-xl font-bold">TicketFlow</span>
          </div>
          <p class="text-sm text-gray-600">
            Professional ticket management system designed for teams of all sizes. Streamline your support workflow efficiently.
          </p>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><router-link to="/" class="hover:text-gray-900 transition-colors">Home</router-link></li>
            <li><router-link to="/auth/login" class="hover:text-gray-900 transition-colors">Login</router-link></li>
            <li><router-link to="/auth/signup" class="hover:text-gray-900 transition-colors">Sign Up</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Contact</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>support@ticketflow.app</li>
            <li>1-800-TICKETS</li>
            <li>San Francisco, CA</li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t text-center text-sm text-gray-600">
        <p>&copy; {{ new Date().getFullYear() }} TicketFlow. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
