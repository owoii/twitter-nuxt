<template>
  <MainSection title="Home" :loading="loading">
    <!-- {{ user }} -->
    <div class="border-b" :class="twitterBorderColor">
      <TweetForm :user="user" placeholder="有什么新鲜事?!" @on-success="handFormSuccess"/>
    </div>
    <TweetListFeed :tweets="homeTweets" />
  </MainSection>
</template>
<script setup lang="ts">
import { UserPayload } from "~/types/user";

useHead({
  title: "Twitter / Home"
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
