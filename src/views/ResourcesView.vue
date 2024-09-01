<!-- src\views\ResourcesView.vue -->

<template>
    <div class="px-4 py-12 ">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold text-center text-gray-900 sm:text-4xl">Mental Health Essentials</h2>
            <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="post in posts" :key="post.id" class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold text-gray-900">{{ post.title }}</h3>
                    <p class="mt-3 text-sm text-gray-600 line-clamp-3">
                        {{ post.content }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const posts = [
    {
        id: 1,
        title: 'Managing Daily Stress',
        content: 'Learn quick and effective techniques to manage daily stress, including breathing exercises, scheduled breaks, and mindfulness practices. These methods can help you maintain calm and focus throughout your day.',
    },
    {
        id: 2,
        title: 'Overcoming Anxiety',
        content: 'Explore strategies to manage and overcome anxiety, such as cognitive behavioral techniques, exposure therapy, and daily journaling. Understanding the triggers and learning coping mechanisms can greatly improve your quality of life.',
    },
    {
        id: 3,
        title: 'Finding Motivation',
        content: 'Discover ways to boost your motivation when you\'re feeling low. Setting clear goals, celebrating small wins, and maintaining a positive environment are key to sustaining motivation over time.',
    },
    {
        id: 4,
        title: 'Cultivating Positivity',
        content: 'Cultivate a positive mindset by practicing gratitude, engaging in positive self-talk, and surrounding yourself with positive influences. These habits can transform your outlook and interactions each day.',
    },
    {
        id: 5,
        title: 'Enhancing Mental Resilience',
        content: 'Strengthen your mental resilience by facing challenges head-on, maintaining a growth mindset, and staying connected with supportive friends and family. Resilience can be built through intentional actions and attitudes.',
    },
    {
        id: 6,
        title: 'Sleep and Mental Health',
        content: 'Understand the critical role of sleep in maintaining mental health. Quality sleep can improve your mood, cognitive function, and overall health. Learn tips for better sleep hygiene to enhance your wellbeing.',
    },
]
</script>