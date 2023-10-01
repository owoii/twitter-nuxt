<template>
  <div class="flex flex-col ">

    <!-- 搜索栏 -->
    <div class="p-2 sticky top-0 bg-white dark:bg-dim-900">
      <div class="absolute top-0 flex items-center h-full pl-4 text-gray-600 cursor-pointer">
        <div class="w-6 h-6">
          <SearchIcon @click="handleSearch" />

        </div>

      </div>
      <input type="text" v-model="search"
        class="flex items-center w-full pl-12 text-black text-sm font-normal dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full  dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border-blue-200 h-12"
        placeholder="搜索" />
    </div>

    <!-- 预览卡片 新鲜事 -->
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem v-for="whatshapping in whatsHappingItems">
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatshapping.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ whatshapping.count }}</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- 预览卡片 推荐关注 -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem v-for="whoToFllow in whoToFllowItems">
        <div class="flex flex-row justify-between items-center p-2">
          <div class="flex" flex-row>
            <img class="w-10 h-10 rounded-full" :src="whoToFllow.image" :alt="whoToFllow.name" />
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFllow.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ whoToFllow.handle }}</p>
            </div>
          </div>
          <div class="flex h-full">
            <button class="rounded-full px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white">
              Fllow
            </button>
          </div>
        </div>

      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <SidebarRightFooter />
  </div>
</template>
<script setup lang="ts">
import { SearchIcon } from '@heroicons/vue/outline';
const whatsHappingItems = ref([
  {
    title: "SpaceX",
    count: "18.8k Tweets",
  },
  {
    title: "#CodingIsFun",
    count: "8.8k Tweets",
  },
  {
    title: "#artforall",
    count: "1.8k Tweets",
  },
]);

type WhoToFllow = {
  name: string;
  handle: string;
  image: string;
};
const whoToFllowItems = ref<WhoToFllow[]>([
  {
    name: "NuxtLabs",
    handle: "@NuxtLabs",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "SpaceX",
    handle: "@SpaceX",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Tesla",
    handle: "@Tesla",
    image: "https://picsum.photos/200/200",
  },
]);

const search = ref('')
const handleSearch = () => {
  useRouter().push({
    path: '/search',
    query: {
      q: search.value
    }
  })
}
</script>
