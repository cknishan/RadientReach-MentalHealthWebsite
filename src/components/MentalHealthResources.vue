<template>
    <div id="trusted-resources" class="mt-16 mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
      <h3 class="text-2xl font-bold text-theme-black-light sm:text-3xl lg:text-4xl text-center">
        Trusted Mental Health Resources
      </h3>
      <p class="mt-4 text-lg text-theme-pink text-center">
        Explore these reliable organizations and resources for mental health support.
      </p>
  
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a v-for="site in mentalHealthSites" :key="site.name" :href="site.link" target="_blank" rel="noopener noreferrer"
          class="flex flex-col bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
          <h4 class="text-xl font-semibold text-theme-blue hover:text-theme-pink">
            {{ site.name }}
          </h4>
          <p class="mt-2 text-sm text-theme-black">
            {{ site.description }}
          </p>
          <span class="mt-4 text-sm font-semibold text-theme-blue hover:opacity-80">
            Visit Site &rarr;
          </span>
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  const mentalHealthSites = [
    { name: 'Headspace', link: 'https://headspace.org.au/', description: 'Youth mental health and well-being support.' },
    { name: 'R U OK?', link: 'https://www.ruok.org.au/', description: 'Encouraging conversations to prevent suicide.' },
    { name: 'Beyond Blue', link: 'https://www.beyondblue.org.au/', description: 'Support for anxiety, depression, and suicide.' },
    { name: 'SANE Forums', link: 'https://saneforums.org/', description: 'Peer support for mental health challenges.' },
    { name: 'Lifeline', link: 'https://www.lifeline.org.au/', description: 'Crisis support and suicide prevention services.' },
    { name: 'Suicide Callback Service', link: 'https://www.suicidecallbackservice.org.au/', description: '24/7 professional counseling.' },
    { name: 'What is Mental Health?', link: 'https://www.beyondblue.org.au/mental-health/what-is-mental-health', description: 'Learn more about mental health and how to care for it.' },
  ];
  </script>
  