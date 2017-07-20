
<template>
    <div>  
        <slot name="checked"></slot>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'dmx-checklist'
    }
</script>

<style lang="less">
    @import './styles.less';
</style>