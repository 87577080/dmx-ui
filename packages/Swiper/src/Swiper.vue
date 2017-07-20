<template>
    <div v-if="isType" ref="root" @touchstart="handleTouch($event,isAnimation)">
        <div ref="swiper" >
            <slot></slot>
        </div>
    </div>
</template>

<script src="./app.js"></script>

<style lang="less">
    @import './styles.less';
</style>
