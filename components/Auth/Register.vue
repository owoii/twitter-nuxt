<template>
	<span class="text-sm  hover:text-blue-500 text-blue-400 cursor-pointer" @click="handleOpenModal">New to Twitter? Create
		an account</span>
	<UIModal :is-open="isOpen" @on-close="handleCloseModal" :dark-mode="darkMode">
		<div>
			<h1 class="text-lg font-bold text-green-800 dark:text-white">Create your account</h1>
			<div class="flex flex-col gap-2 mt-5">
				<UIInput v-model="data.username" placeholder="Username" />
				<UIInput v-model="data.name" placeholder="Name" />
				<UIInput v-model="data.email" placeholder="@Email" type="email" />
				<UIInput v-model="data.password" placeholder="Password" type="Password" />
				<UIInput v-model="data.repeatPassword" placeholder="Confirm password" type="password" />
			</div>
			<div class="mt-4 flex-col flex gap-2">
				<UIButton @on-click="handleRegister" liquid :disabled="isDisabled">OK</UIButton>
				<UIButton liquid outline @on-click="handleCloseModal">Cancel</UIButton>
			</div>
		</div>
	</UIModal>
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