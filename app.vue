<template>
  <div :class="{ dark: darkMode }" >
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />
      <!-- 应用主要界面 -->
      <div class="min-h-full" v-else-if="user">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- 侧边栏 -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0 ">
              <SidebarLeft @on-tweet="handleOpenTweetModal" :user="user" @on-logout="handleLogout" />
            </div>
          </div>

          <!-- 主界面 -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <NuxtPage />
          </main>
          <!-- 右侧边栏 -->
          <div class="hidden col-span-12 md:block xs:col-span-1 xl:col-span-4 md:col-span-3">
            <div class="sticky top-0 overflow-scroll max-h-screen">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <!-- Auth -->
      <AuthPage v-else />

      <UIModal :isOpen="postTweetModal" @on-close="handleModalClose" :darkMode="darkMode">
        <TweetForm :reply-to="replyTweet" showReply :user="user || {}" @on-success="handleFormSuccess"
          placeholder="有什么新书想分享?" />
      </UIModal>
    </div>
  </div>
</template>

<script setup lang="ts">
const darkMode = ref(false);
const { initAuth, useAuthUser, useAuthLoading, logout } = useAuth();
provide("darkMode", darkMode)
useHead({
  script: [
    {
      src: "http://localhost:8098",
      type: "text/javascript",
    },
  ],
});

const isAuthLoading = useAuthLoading();
const user = useAuthUser();
onBeforeMount(() => {
  initAuth();

});

const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweets()

const postTweetModal = usePostTweetModal()

const handleFormSuccess = (tweet) => {
  closePostTweetModal()
  navigateTo({
    path: `/status/${tweet.id}`
  })
}
const handleModalClose = () => {
  closePostTweetModal()
}

const handleOpenTweetModal = () => {
  openPostTweetModal()
}

const emitter = useEmitter()
const replyTweet = useReplyTweet()
emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet)
})

emitter.$on('toggleDarkMode', () => {
  darkMode.value = !darkMode.value
})

const handleLogout = () => {
  logout()
}
</script>
