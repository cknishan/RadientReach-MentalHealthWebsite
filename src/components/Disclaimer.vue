<template>
    <div
      v-if="showDisclaimer"
      class="fixed inset-x-0 bottom-0 flex justify-center p-4 z-50 transform transition-transform duration-500 ease-in-out"
      :class="{ 'translate-y-0': isVisible, 'translate-y-full': !isVisible }"
    >
      <div class="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-6 max-w-md w-full flex items-center justify-between">
        <p class="text-gray-700 text-sm">
          This is a disclaimer. Please read it carefully.
        </p>
        <button
          @click="acceptDisclaimer"
          class="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          I Understand
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showDisclaimer: false,
        isVisible: false, // Controls the slide-up animation
      };
    },
    mounted() {
      this.checkDisclaimer();
      if (this.showDisclaimer) {
        // Slide up the disclaimer after 5 seconds
        setTimeout(() => {
          this.isVisible = true;
        }, 2000);
      }
    },
    methods: {
      checkDisclaimer() {
        const hasSeenDisclaimer = sessionStorage.getItem('hasSeenDisclaimer');
        if (!hasSeenDisclaimer) {
          this.showDisclaimer = true;
        }
      },
      acceptDisclaimer() {
        sessionStorage.setItem('hasSeenDisclaimer', 'true');
        this.isVisible = false; // Slide down
        setTimeout(() => {
          this.showDisclaimer = false; // Hide after animation
        }, 500); // Match the duration of the slide-down animation
      },
    },
  };
  </script>
  
  <style scoped>
  /* No additional styles needed since Tailwind handles everything */
  </style>