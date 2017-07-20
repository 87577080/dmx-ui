<template>
    <div ref="drag-item" @touchstart="setIndex">
        <slot name="itemTitle">
            <div slot="itemTitle"></div>
        </slot>
        <slot name="dragElement"></slot>
    </div>
</template>

<script src="./app"></script>

<style lang="less">
//v-once
    //@import './styles.less';
</style>