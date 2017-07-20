<template>
    <div @touchstart="dragItem($event)" ref="parent" style="position:relative;">
        <slot name="dragItem"></slot>
    </div>
</template>

<script src="./app"></script>

<style lang="less">
    //@import './styles.less';
</style>