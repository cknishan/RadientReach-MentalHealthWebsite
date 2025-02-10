<!-- src\views\HomeView.vue -->

<template>

    <!-- Hero Section -->
    <div class="mx-auto max-w-max px-2 sm:px-6 lg:px-8 mt-10">
        <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            aria-hidden="true">

        </div>
        <div class="mx-auto max-w-max sm:px-4 lg:px-6">
            <div class="mx-auto max-w-full lg:mx-0">
                <div class="mx-auto max-w-2xl lg:mx-0 flex flex-col items-center lg:flex-row justify-between">
                    <div class="text-center  lg:ml-6 lg:text-left">
                        <h2 class="text-4xl font-bold tracking-tight sm:text-6xl text-theme-black-light">
                            Radiant Reach
                        </h2>
                        <p class="mt-6 text-lg leading-8 text-theme-pink font-semibold">
                            Connecting Hearts, Inspiring Healing.
                        </p>
                    </div>
                    <div class="mt-6 lg:mt-0">
                        <img src="../../public/logo/ss-logo-removebg-preview.png" alt="Logo"
                            class="w-32 h-auto mx-auto lg:mx-0 sm:w-40 lg:w-max object-contain">
                    </div>
                </div>
            </div>

            <div class="mx-auto mt-8 max-w-2xl lg:mx-0 lg:max-w-none">
                <div
                    class="grid grid-cols-1 gap-x-4 gap-y-6 text-base font-semibold leading-7 sm:grid-cols-2 md:flex lg:gap-x-10">
                    <RouterLink v-for="link in links" :key="link.name" :to="link.link" class="text-theme-blue hover:opacity-80 hover:rotate-2 transition-transform duration-300 
           sm:text-lg md:text-xl lg:text-2xl 
           sm:px-2 md:px-4 lg:px-6">
                        {{ link.name }} <span aria-hidden="true">&rarr;</span>
                    </RouterLink>
                </div>

            </div>
        </div>
    </div>

</template>

<script setup>

const links = [
    { name: 'Educational Content', link: '/resources' },
    { name: 'Join Events', link: '/community' },
    { name: 'Find Help', link: '/find-help' },
    { name: 'Profile', link: '/profile' },
]

</script>