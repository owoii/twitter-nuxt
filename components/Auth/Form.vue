<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>
    <div class="pt-5 space-y-6">
      <UIInput label="Username" placeholder="@username" v-model="data.username" />

      <UIInput label="Password" placeholder="*****" type="password" v-model="data.password" />
      <UIButton @on-click="handleForm" :disabled="isButtonDisabled" liquid>Login</UIButton>

      <div class="flex items-center justify-center">
        <AuthRegister />
      </div>
    </div>


  </div>
</template>
<script lang="ts" setup>
import { UserLoginDto } from "~/types/user";
const { login } = useAuth();
interface UserLoginForm extends UserLoginDto {
  loading: boolean;
}
const data = reactive<UserLoginForm>({
  username: '',
  password: '',
  loading: true,
});

const handleForm = async () => {

  data.loading = true;
  try {
    const re = await login({
      username: data.username,

      password: data.password,
    });

  } catch (error) {

  } finally {
    data.loading = false;
  }
};

const isButtonDisabled = computed(() => {
  return (!data.username || !data.password) || !data.loading
})
</script>
