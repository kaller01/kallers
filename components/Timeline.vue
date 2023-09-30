<template>
    <div class="timeline">
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    name: 'Timeline',
};
</script>
  
<style scoped>
.timeline {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
  