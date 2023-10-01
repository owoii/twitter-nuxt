<template>
	<footer>
		<ul class="mx-2 my-4 text-xs text-gray-500">
			<SidebarRightFooterItem label="Dark Mode" @click.prevent="handleToggleDarkMode" />
			<SidebarRightFooterItem label="Privacy Policy" />
			<SidebarRightFooterItem label="Cookie Policy" />
			<SidebarRightFooterItem label="Accessability" />
			<SidebarRightFooterItem label="Ads Info" />
			<SidebarRightFooterItem label="More" />
			<SidebarRightFooterItem label="© 2023 Twitter, Inc." />
		</ul>
	</footer>
</template>

<script setup lang="ts">

const emitter = useEmitter()
const handleToggleDarkMode = () => {
	emitter.$emit('toggleDarkMode')
}
</script>