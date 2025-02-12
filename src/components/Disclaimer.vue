<template>
  <div v-if="showDisclaimer"
    class="fixed inset-x-0 bottom-0 flex justify-center z-50 transform transition-transform duration-500 ease-in-out"
    :class="{ 'translate-y-0': isVisible, 'translate-y-full': !isVisible }">
    <div
      class=" bg-yellow-100 bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 p-6 max-w-4xl w-full flex items-center justify-between">
      <div class="text-gray-700 text-sm sm:text-base pr-4">
        <span class="font-bold">Disclaimer!</span>
        <p class="pt-2">
          This website is not affiliated with any real organization and does not provide medical or mental health advice. For trusted resources on mental health, please refer to the
          <button @click="goToTrustedResources" class="font-bold text-theme-blue underline hover:opacity-80">
            Trusted Resources
          </button>.
        </p>
        <p class="py-2">This is a personal project to showcase my web development skills. To see more of my work,
          <a href="https://github.com/cknishan" target="_blank" rel="noopener noreferrer"
            class="font-bold text-theme-blue underline hover:opacity-80">
            visit my github
          </a>.
        </p>
        <button @click="acceptDisclaimer" class="text-theme-green bg-theme-black-dark px-2 rounded-3xl">
          Close
        </button>
      </div>
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
      // Slide up the disclaimer after 2 seconds
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
    goToTrustedResources() {
      if (this.$route.name === 'Home') {
        // If already on the home page, scroll directly
        const element = document.querySelector('#trusted-resources');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home, then scroll
        this.$router.push({ name: 'Home' }).then(() => {
          setTimeout(() => {
            const element = document.querySelector('#trusted-resources');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 300); // Adjust delay to ensure the DOM is ready
        });
      }
    }
  }

};
</script>
