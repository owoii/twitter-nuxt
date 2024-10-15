<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 my-2 rounded-full w-min xl:w-full hover:bg-blue-50 dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <NuxtLink to="/">
        <div class="w-8 h-8 flex items-center gap-4">
          <LogoTwitter />
          <b class="text-lg hidden xl:block">Bond</b>
        </div>
      </NuxtLink>
    </div>

    <div class="mt-2 space-y-3 overflow-scroll max-h-screen">
      <SidebarLeftTab active>
        <template #icon>
          <HomeIcon />
        </template>
        <template #name> 主页 </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <HashtagIcon />
        </template>
        <template #name> 探索 </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <BellIcon />
        </template>
        <template #name> 通知 </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <InboxIcon />
        </template>
        <template #name> 信息 </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <DocumentTextIcon />
        </template>
        <template #name> Lists </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <UserIcon />
        </template>
        <template #name> 个人信息 </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <DotsCircleHorizontalIcon />
        </template>
        <template #name> More </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UiButton liquid size="lg" @on-click="emits('onTweet')">
          <span class="font-bold"> 发帖 </span>
        </UiButton>
      </div>

      <div class="block xl:hidden">
        <UiButton @on-click="emits('onTweet')">
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UiButton>
      </div>
    </div>
    <SidebarLeftAccountMenu :user="props.user" @on-logout="emits('onLogout')" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/solid'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  PencilIcon,
} from '@heroicons/vue/outline'
const { defaultTransition } = useTailwindiConfig()
const emits = defineEmits(['onTweet', 'onLogout'])
interface Props {
  user?: any
}
const props = withDefaults(defineProps<Props>(), {
  user: null,
})
</script>
