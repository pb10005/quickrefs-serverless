<script setup>
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Knowledge', href: '/knowledge/list', current: false },
  { name: 'Profile', href: '/profile', current: false },
]

</script>

<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-10">
          <div class="flex items-center">
            <div class="font-bold flex-shrink-0">
              QuickRefs
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900' : 'text-gray-700 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <div class="bg-secondary grid grid-cols-12"> 
          <router-view class="min-h-screen col-span-12 md:col-start-3 md:col-span-8"/>
    </div>
    <footer>
      これはサンドボックス環境です。すべてのデータは予告なく削除される可能性があります。
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
.logo {
  padding: 0 10px;
}
</style>
