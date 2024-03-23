<script setup>
const props = defineProps(["photos", "horizontal", "cols"]);
const horizontal = computed(() => props.horizontal === '' || !!props.horizontal);
const cols = computed(() => props.cols ?? 3);
</script>


<template>
    <div :class="horizontal ? 'horizontal-gallery' : 'vertical-gallery'"
        :style="!horizontal && { 'column-count': cols }">
        <Photo v-for="photo in photos" v-bind:key="photo._id" :photo="photo"
            :class="horizontal ? 'horizontal-wrapper' : ''" />
    </div>
</template>

<style scoped>
.vertical-gallery {
    /* column-count: 3; */
    column-gap: 8px;
}

.horizontal-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    list-style: none;
}

.horizontal-wrapper {
    height: 300px;
    flex: 1 1 auto;
}
</style>