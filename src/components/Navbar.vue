// src\components\Navbar.vue

<template>
    <Disclosure as="nav" class="bg-theme-white text-theme-black-dark" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <!-- logo will go here -->
                    <!-- <div class="flex flex-shrink-0 items-center">
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company" />
                    </div> -->
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex">
                            <a v-for="item in navigation" :key="item.name">
                                <RouterLink :to="item.link" :class="['router-link-custom']" aria-current="page">{{
                                    item.name }}</RouterLink>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- <button type="button"
                        class="relative rounded-full hover:text-theme-green focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ">
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">View notifications</span>
                        <BellIcon class="h-8 w-8" aria-hidden="true" />
                    </button> -->

                    <!-- Profile dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <div>
                            <MenuButton
                                class="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-theme-green">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">Open user menu</span>
                                <UserIcon class="h-8 w-8" aria-hidden="true" />
                            </MenuButton>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem v-slot="{ active }">
                                <RouterLink to="/profile" :class="['router-link-custom']">Your Profile</RouterLink>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <RouterLink to="/settings" :class="['router-link-custom']">Settings</RouterLink>
                                </MenuItem>
                                <!-- <MenuItem v-slot="{ active }">
                                <RouterLink to="/login" :class="['router-link-custom']">Login</RouterLink>
                                </MenuItem> -->
                            </MenuItems>

                        </transition>
                    </Menu>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <a v-for="item in navigation" :key="item.name" class="block text-center py-2">
                    <RouterLink :to="item.link" active-class="active" :class="['router-link-custom']">{{
                        item.name }}</RouterLink>
                </a>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon, UserIcon } from '@heroicons/vue/24/outline'

const navigation = [
    { name: 'Home', link: '/home' },
    { name: 'Resources', link: '/resources' },
    { name: 'Community', link: '/community' },
    { name: 'Find Help', link: '/find-help' },
]

</script>
