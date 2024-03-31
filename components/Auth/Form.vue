<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>
    <div class="pt-5 space-y-6">
      <UIInput
        label="用户名"
        placeholder="请输入用户名"
        v-model="data.username"
      />

      <UIInput
        label="密码"
        placeholder="*****"
        type="password"
        v-model="data.password"
      />
      <UIButton @on-click="handleForm" :disabled="isButtonDisabled" liquid
        >登录</UIButton
      >

      <div class="flex items-center justify-center">
        <AuthRegister />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { UserLoginDto } from '#/user'
const { login } = useAuth()
interface UserLoginForm extends UserLoginDto {
  loading: boolean
}
const data = reactive<UserLoginForm>({
  username: '',
  password: '',
  loading: true,
})

const handleForm = async () => {
  data.loading = true
  try {
    await login({
      username: data.username,
      password: data.password,
    })
  } catch (error) {
  } finally {
    data.loading = true
  }
}

const isButtonDisabled = computed(() => {
  return !data.username || !data.password || !data.loading
})
</script>
