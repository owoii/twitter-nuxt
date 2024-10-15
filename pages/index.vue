<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

</script>
<template>
  <div class="flex flex-col md:max-w-sm">
    <Logo class="h-12 w-12 lg:hidden" />
    <h1 class="text-6xl my-12 font-bold">
      結束バンド
    </h1>
    <h2 class="text-4xl mb-8">後援会</h2>
    <AuthOAuth />
    <UiSeparator label="or" class="my-6" />
    <div class="flex flex-col gap-2">
      <UiButton class="rounded-full">
        サインアップ
      </UiButton>
      <p class="text-xs">サインアップすると、Cookie の利用規約を含むサービス利用規約とプライバシー ポリシーに同意したことになります。</p>
    </div>

    <div class="mt-12 w-full flex flex-col">
      <b class="mb-6 text-2xl">すでにアカウントをお持ちです</b>
      <UiButton class="rounded-full" variant="outline">
        サインイン
      </UiButton>
    </div>
    <div>
      <NuxtPage />
    </div>
  </div>
</template>