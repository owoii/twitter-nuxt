<template>
  <MainSection title="主页" :loading="loading">
    <!-- {{ user }} -->
    <div class="border-b" :class="twitterBorderColor">
      <TweetForm :user="user" placeholder="有什么新书想分享?!" @on-success="handFormSuccess"/>
    </div>
    <TweetListFeed :tweets="homeTweets" />
  </MainSection>
</template>
<script setup lang="ts">
import type{ UserPayload } from "#/user";

useHead({
  title: "Neo Library社区 / 主页"
})

const loading = ref(false);
const { useAuthUser } = useAuth();
const { twitterBorderColor } = useTailwindiConfig()
const { getTweets } = useTweets()
const homeTweets = ref<unknown[]>([])

const user = useAuthUser() as UserPayload;


onBeforeMount(async () => {
  loading.value = true
  try {
    const { tweets } = await getTweets() as { tweets: unknown[] }
    homeTweets.value = tweets
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }

})

const handFormSuccess = (tweets)=>{
  navigateTo({
    path:`/status/${tweets.id}`
  })
}

</script>
