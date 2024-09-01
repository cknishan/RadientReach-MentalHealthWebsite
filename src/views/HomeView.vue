<!-- src\views\HomeView.vue -->

<template>

    <!-- Hero Section -->
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-16 py-12">
        <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            aria-hidden="true">

        </div>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-4xl font-bold tracking-tight sm:text-6xl text-theme-black-light">Work
                    with us</h2>
                <p class="mt-6 text-lg leading-8 ">Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                    irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
            </div>
            <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                <div
                    class="grid grid-cols-1 gap-x-8 gap-y-6 text-lg font-semibold leading-7 sm:grid-cols-2 md:flex lg:gap-x-10 text-theme-pink">
                    <a v-for="link in links" :key="link.name" :href="link.href">{{ link.name }} <span
                            aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </div>
    </div>

    <!-- Blog Sections -->
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-16 py-12">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                <p class="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.
                </p>
            </div>
            <div
                class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <article v-for="post in posts" :key="post.id"
                    class="flex max-w-xl flex-col items-start justify-between">
                    <div class="flex items-center gap-x-4 text-xs">
                        <time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
                        <a :href="post.category.href"
                            class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{
                                post.category.title }}</a>
                    </div>
                    <div class="group relative">
                        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            <a :href="post.href">
                                <span class="absolute inset-0" />
                                {{ post.title }}
                            </a>
                        </h3>
                        <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.description }}</p>
                    </div>
                    <div class="relative mt-8 flex items-center gap-x-4">
                        <img :src="post.author.imageUrl" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
                        <div class="text-sm leading-6">
                            <p class="font-semibold text-gray-900">
                                <a :href="post.author.href">
                                    <span class="absolute inset-0" />
                                    {{ post.author.name }}
                                </a>
                            </p>
                            <p class="text-gray-600">{{ post.author.role }}</p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script setup>

const links = [
    { name: 'Open roles', href: '#' },
    { name: 'Internship program', href: '#' },
    { name: 'Our values', href: '#' },
    { name: 'Meet our leadership', href: '#' },
]


const posts = [
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 2,
        title: 'How to use social media effectively',
        href: '#',
        description:
            'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur?',
        date: 'Apr 22, 2020',
        datetime: '2020-04-22',
        category: { title: 'Social Media', href: '#' },
        author: {
            name: 'Sarah Connor',
            role: 'Marketing Manager',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 3,
        title: '10 Tips for better content marketing',
        href: '#',
        description:
            'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur? Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
        date: 'May 10, 2020',
        datetime: '2020-05-10',
        category: { title: 'Content Marketing', href: '#' },
        author: {
            name: 'John Doe',
            role: 'Content Strategist',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1502767089025-6572583495b4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 4,
        title: 'The importance of SEO in 2023',
        href: '#',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'Jun 5, 2020',
        datetime: '2020-06-05',
        category: { title: 'SEO', href: '#' },
        author: {
            name: 'Jane Smith',
            role: 'SEO Specialist',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 5,
        title: 'Understanding customer behavior',
        href: '#',
        description:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: 'Jul 14, 2020',
        datetime: '2020-07-14',
        category: { title: 'Analytics', href: '#' },
        author: {
            name: 'Alice Johnson',
            role: 'Data Analyst',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1524154220188-3d1cf442f9a6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 6,
        title: 'Building a strong brand identity',
        href: '#',
        description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        date: 'Aug 23, 2020',
        datetime: '2020-08-23',
        category: { title: 'Branding', href: '#' },
        author: {
            name: 'Mark Brown',
            role: 'Brand Strategist',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
]
</script>