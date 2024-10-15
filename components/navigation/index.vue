<script setup lang="ts">
import PhHouse from '~icons/ph/house'
import PhMagnifyingGlass from '~icons/ph/magnifying-glass'
import PhMagnifyingGlassBold from '~icons/ph/magnifying-glass-bold'
import { NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from 'radix-vue'
</script>
<template>
    <NavigationMenuRoot asChild>
        <header class="h-screen flex flex-col items-end grow select-none border-r sticky top-0 left-0 overflow-y-auto">
            <NavigationMenuList asChild>
                <div class="w-[275px] h-full flex flex-col">
                    <NavigationMenuItem asChild>
                        <div class="py-2">
                            <Logo class="h-12" />
                        </div>
                    </NavigationMenuItem>

                    <NavigationMenuItem asChild>
                        <NavigationMenuList class="flex flex-col">
                            <NavigationMenuItem class="w-full">
                                <NavigationMenuLink class="w-full group" href="/">
                                    <div class="rounded-full w-max group-hover:bg-primary/20 text-xl gap-4 p-3 flex">
                                        <PhHouse class="text-2xl" />主页
                                    </div>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <UiButton variant='ghost'
                                class="rounded-full w-max hover:bg-primary/20 text-xl font-bold gap-4 p-3">
                                <PhMagnifyingGlassBold class="text-2xl" />探索
                            </UiButton>
                        </NavigationMenuList>
                    </NavigationMenuItem>
                </div>

            </NavigationMenuList>
        </header>
    </NavigationMenuRoot>
</template>