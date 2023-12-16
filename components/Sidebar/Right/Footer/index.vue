<template>
	<footer>
		<ul class="mx-2 my-4 text-xs text-gray-500">
			<!-- <SidebarRightFooterItem label="切换颜色模式" @click.prevent="handleToggleDarkMode" /> -->
			<SidebarRightFooterItem label="社区规则" />
			<SidebarRightFooterItem label="Github 仓库" />
			<SidebarRightFooterItem label="Neo-Library" />
			<SidebarRightFooterItem label="© 2023 Neo-Library" />
		</ul>
	</footer>
</template>

<script setup lang="ts">

const emitter = useEmitter()
const handleToggleDarkMode = () => {
	emitter.$emit('toggleDarkMode')
}
</script>