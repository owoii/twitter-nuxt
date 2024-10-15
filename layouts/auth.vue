<script lang="ts" setup>
useHead({

})
</script>
<template>
  <div class="min-h-screen relative flex flex-col items-center">
    <NuxtImg src="/img/pagebg.png" class="absolute right-0 top-0 h-screen object-cover select-none -z-[1]" />
    <div class="flex-1 flex w-full relative">
      <div class="justify-center flex-1 items-center min-h-[45vh] hidden lg:flex">
        <Logo class="h-96" />
      </div>
      <div class="p-4  min-w-[45vw] flex justify-center flex-col">
        <main class="w-full p-6">
          <slot />
        </main>
      </div>
    </div>

    <footer class="shrink-0">
      <div class="w-full flex justify-center items-center p-4 flex-col">
        <p class="text-sm ">© 結束バンド</p>
      </div>
    </footer>
  </div>
</template>
