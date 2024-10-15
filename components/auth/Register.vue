<template>
	<span class="text-sm  hover:text-blue-500 text-blue-400 cursor-pointer" @click="handleOpenModal">还没有账号吗?点我注册账号</span>
	<UiModal :is-open="isOpen" @on-close="handleCloseModal" :dark-mode="darkMode">
		<div>
			<h1 class="text-lg font-bold text-green-800 dark:text-white">创建你的NeoLibrary账号</h1>
			<div class="flex flex-col gap-2 mt-5">
				<UiInput v-model="data.username" placeholder="用户名" />
				<UiInput v-model="data.name" placeholder="昵称" />
				<UiInput v-model="data.email" placeholder="@你的邮箱" type="email" />
				<UiInput v-model="data.password" placeholder="密码" type="Password" />
				<UiInput v-model="data.repeatPassword" placeholder="再次确认你的密码" type="password" />
			</div>
			<div class="mt-4 flex-col flex gap-2">
				<UiButton @on-click="handleRegister" liquid :disabled="isDisabled">注册</UiButton>
				<UiButton liquid outline @on-click="handleCloseModal">取消</UiButton>
			</div>
		</div>
	</UiModal>
</template>

<script setup lang="ts">
const { register } = useAuth()
const darkMode  = inject('darkMode',false)
const isOpen = ref(false)
interface FormType {
	username: string
	email: string
	password: string
	repeatPassword: string
	name: string
}
const data = reactive<FormType>({
	username: "",
	email: "",
	password: "",
	repeatPassword: "",
	name: ""
})

const handleRegister = async () => {
	const response = await register(data)
	if (response) {
		handleCloseModal()
	}

}
const handleCloseModal = () => {
	handleClearFormData()
	isOpen.value = false
}
const handleOpenModal = () => {
	handleClearFormData()
	isOpen.value = true
}
const handleClearFormData = () => {
	data.email = ''
	data.name = ""
	data.password = ""
	data.repeatPassword = ""
	data.username = ""
}
const isDisabled = computed(() => {
	const { username, email, password, repeatPassword, name } = data
	return !username || !email || !password || !repeatPassword || !name
})
</script>