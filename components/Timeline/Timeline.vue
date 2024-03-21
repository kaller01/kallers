<template>
    <div class="timeline">
        <slot></slot>
    </div>
</template>

<style scoped>
.timeline {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>