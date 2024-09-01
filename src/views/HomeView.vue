<!-- src\views\HomeView.vue -->

<template>

    <!-- Hero Section -->
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-16 py-12">
        <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            aria-hidden="true">

        </div>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-4xl font-bold tracking-tight sm:text-6xl text-theme-black-light">Taking Care of
                    Mental Health</h2>
                <p class="mt-6 text-lg leading-8 ">Learn about Mental Health, Discover Resources, Connect with our
                    Community, Ask
                    for Help, and Track your Mood. All in One Place.</p>
            </div>
            <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                <div
                    class="grid grid-cols-1 gap-x-8 gap-y-6 text-lg font-semibold leading-7 sm:grid-cols-2 md:flex lg:gap-x-10 text-theme-pink">
                    <RouterLink v-for="link in links" :key="link.name" :to="link.link">{{ link.name }} <span
                            aria-hidden="true">&rarr;</span></RouterLink>
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