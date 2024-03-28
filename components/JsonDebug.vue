<script setup>
const props = defineProps(['json'])
</script>

<template>
    <DevOnly>
        <v-textarea auto-grow readonly :model-value="JSON.stringify(props.json, null, 4)"></v-textarea>
    </DevOnly>
</template>