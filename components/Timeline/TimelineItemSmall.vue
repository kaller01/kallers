<template>
    <div class="timeline-item">
        <div class="timeline-circle">
            <slot name="icon"></slot>
        </div>
        <div class="timeline-line"></div>
        <div class="timeline-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>


<style scoped>
.timeline-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    position: relative;
}

.timeline-line {
    width: 2px;
    margin: 0;
    padding: 0;
    background-color: white;
    /* Change to your desired line color */
    height: 100%;
    position: absolute;
    left: 0px;
}

.timeline-circle {
    margin: 0;
    margin-top: 7px;
    padding: 0;
    background-color: #1e1e1e;
    /* Change to your desired line color */
    position: absolute;
    left: -17px;
    z-index: 1;
    border-radius: 10px;
}

.timeline-content {
    margin-left: 16px;
    width: calc(100% - 20px);
    position: static;
    display: block;
    height: auto;
    margin-bottom: 30px;
}
</style>