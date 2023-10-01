<template>
  <div class="h-screen flex flex-col">
    <div class="p-2 my-2 rounded-full w-min hover:bg-blue-50 dark:hover:bg-white/20" :class="defaultTransition">
      <NuxtLink to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>

    <div class="mt-2 space-y-3 overflow-scroll max-h-screen">
      <SidebarLeftTab active>
        <template #icon>
          <HomeIcon />
        </template>
        <template #name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <HashtagIcon />
        </template>
        <template #name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <BellIcon />
        </template>
        <template #name> Notification </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <InboxIcon />
        </template>
        <template #name> Messages </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <BookmarkIcon />
        </template>
        <template #name> Bookmarks </template>
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
        <template #name> Profile </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <DotsCircleHorizontalIcon />
        </template>
        <template #name> More </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg" @on-click="emits('onTweet')">
          <span class="font-bold">
            Tweet
          </span>
        </UIButton>
      </div>

      <div class="block xl:hidden">
        <UIButton @on-click="emits('onTweet')">
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>
    <SidebarLeftAccountMenu :user="props.user" @on-logout="emits('onLogout')" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  PencilIcon
} from "@heroicons/vue/outline";
const { defaultTransition } = useTailwindiConfig();
const emits = defineEmits(['onTweet', 'onLogout'])
interface Props {
  user?: any
}
const props = withDefaults(defineProps<Props>(), {
  user: null
})
</script>
