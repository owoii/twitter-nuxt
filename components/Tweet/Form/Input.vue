<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-start">
        <img
          :src="props.user.profileImage!"
          alt=""
          class="inline-block w-10 h-10 rounded-full"
        />
      </div>
      <div class="w-full p-2">
        <textarea
          v-model="text"
          class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0"
          :placeholder="placeholder"
        />
      </div>
    </div>

    <!-- File selector -->
    <div class="p-4 pl-16">
      <img
        :src="inputImageUrl"
        alt="image"
        v-if="inputImageUrl"
        class="rounded-2xl border"
        :class="twitterBorderColor"
      />
      <input
        type="file"
        ref="imageInput"
        hidden
        accept="image/png,image/gif,image/jpeg"
        @change="handleImageChange"
      />
    </div>

    <!-- Icon bar -->
    <div class="flex p-2 pl-14 items-center">
      <div class="flex w-full text-white">
        <TweetFormIcon @click="handleImageClick">
          <IconImage />
        </TweetFormIcon>
      </div>
      <div class="ml-auto">
        <UIButton size="sm" :disabled="isDisabled" @on-click="handleFormSubmit">
          <span class="font-bold"> Tweet </span>
        </UIButton>
        <!-- @click="handleFormSubmit" -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserPayload } from '~/types/user'

const { twitterBorderColor } = useTailwindiConfig()
export type TwitterInputData = {
  text: string
  mediaFiles: Array<File | null>
}

const imageInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const inputImageUrl = ref()
const handleImageClick = () => {
  imageInput.value!.click()
}

const emits = defineEmits<{
  onSubmit: [data: TwitterInputData]
}>()
const text = ref('')
const isDisabled = computed(() => {
  return text.value === ''
})
type Prop = {
  user: Required<UserPayload>
  placeholder?: string
}

const props = defineProps<Prop>()

const handleFormSubmit = () => {
  emits('onSubmit', {
    text: text.value,
    mediaFiles: [selectedFile.value],
  })
}

const handleImageChange = (event: any) => {
  const target = event.target as HTMLInputElement
  if (target.files == null) {
    return
  }
  const file = target.files[0]
  selectedFile.value = file

  const reader = new FileReader()
  reader.onload = (event) => {
    inputImageUrl.value = event.target?.result
  }
  reader.readAsDataURL(file)
}
</script>
