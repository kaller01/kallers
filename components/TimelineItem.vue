<template>
    <div class="timeline-item">
        <div class="timeline-date">
            <slot name="date"></slot>
        </div>
        <div class="timeline-circle">
            <slot name="icon"></slot>
        </div>
        <div class="timeline-line"></div>
        <div class="timeline-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'TimelineItem',
};
</script>
  
<style scoped>

.timeline-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    position: relative;
}

.timeline-date {
    font-size: 14px;
    width: 72px;
    margin-right: 16px;
    margin-top: 7px;
    text-align: right;
}

.timeline-line {
    width: 2px;
    margin: 0;
    padding: 0;
    background-color: white;
    /* Change to your desired line color */
    height: 100%;
    position: absolute;
    left: 84px;
}

.timeline-circle {
    margin: 0;
    margin-top: 4px;
    padding: 0;
    background-color: #1e1e1e;
    /* Change to your desired line color */
    position: absolute;
    left: 71px;
    z-index: 1;
    border-radius: 10px;
    padding: 2px;
}

.timeline-content {
    margin-left: 16px;
    width: calc(100% - 120px);
    position: static;
    display: block;
    height: auto;
    margin-bottom: 30px;
}
</style>
  