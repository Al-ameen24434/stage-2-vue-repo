<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <section
      class="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100"
    >
      <div class="absolute -top-32 -right-32 w-[400px] h-[400px] opacity-60">
        <img :src="circleUrl" alt="" class="w-full h-full" />
      </div>

      <div
        class="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-20"
      >
        <h1
          class="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-tight tracking-tight mb-6"
          data-testid="text-hero-title"
        >
          Streamline Your Support <span class="text-blue-600">Workflow</span>
        </h1>
        <p
          class="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
          data-testid="text-hero-description"
        >
          TicketFlow helps teams manage customer support tickets efficiently.
          Track, prioritize, and resolve issues with a modern, intuitive
          interface.
        </p>
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <router-link to="/auth/signup" data-testid="link-hero-signup">
            <button class="btn btn-primary text-base px-8 py-3 shadow-lg">
              Get Started Free
            </button>
          </router-link>
          <router-link to="/auth/login" data-testid="link-hero-login">
            <button class="btn btn-secondary text-base px-8 py-3">Login</button>
          </router-link>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-0 right-0 w-full h-[200px] pointer-events-none"
      >
        <img :src="waveUrl" alt="" class="w-full h-full object-cover" />
      </div>
    </section>

    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-semibold mb-4">
            Everything You Need
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features to help your team stay organized and productive
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="card p-6">
            <div class="mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"
              >
                <svg
                  class="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">Easy Tracking</h3>
            <p class="text-sm text-gray-600">
              Keep track of all your support tickets in one centralized location
            </p>
          </div>

          <div class="card p-6">
            <div class="mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"
              >
                <svg
                  class="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">Status Updates</h3>
            <p class="text-sm text-gray-600">
              Monitor ticket progress from open to in-progress to closed
            </p>
          </div>

          <div class="card p-6">
            <div class="mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"
              >
                <svg
                  class="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">Team Collaboration</h3>
            <p class="text-sm text-gray-600">
              Work together seamlessly with your support team
            </p>
          </div>

          <div class="card p-6">
            <div class="mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"
              >
                <svg
                  class="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">Analytics</h3>
            <p class="text-sm text-gray-600">
              Get insights into your team's performance and ticket trends
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
      <div class="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 class="text-3xl sm:text-4xl font-semibold mb-4">
          Ready to Get Started?
        </h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join teams already using TicketFlow to deliver exceptional customer
          support
        </p>
        <router-link to="/auth/signup">
          <button class="btn btn-primary text-base px-8 py-3 shadow-lg">
            Start Managing Tickets Today
          </button>
        </router-link>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

const waveUrl = new URL("../assets/hero-wave.svg", import.meta.url).href;
const circleUrl = new URL("../assets/decorative-circle.svg", import.meta.url)
  .href;
</script>
