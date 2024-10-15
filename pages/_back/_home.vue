<script setup lang="ts">
import type { UserPayload } from "#/user";

useHead({
    title: "主页 | Bond",
});

const loading = ref(false);
const { useAuthUser } = useAuth();
const { twitterBorderColor } = useTailwindiConfig();
const { getTweets } = useTweets();
const homeTweets = ref<unknown[]>([]);

const user = useAuthUser() as UserPayload;

onBeforeMount(async () => {
    loading.value = true;
    try {
        const { tweets } = (await getTweets()) as { tweets: unknown[] };
        homeTweets.value = tweets;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
});

const handFormSuccess = (tweets) => {
    navigateTo({
        path: `/status/${tweets.id}`,
    });
};
</script>

<template>
    <MainSection title="主页" :loading="loading">
        <div class="border-b" :class="twitterBorderColor">
            <TweetForm :user="user" placeholder="有什么新书想分享?!" @on-success="handFormSuccess" />
        </div>
        <TweetListFeed :tweets="homeTweets" />
    </MainSection>
</template>
