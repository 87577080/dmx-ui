<template>
    <div>
        <div class="page-button-group">
            <button :class='isType' :disabled='isDisabled' @click='handleClick'>
                <slot></slot>
                <slot name="icon"></slot>
            </button>
        </div>
    </div>
</template>

<script src="./app.js"></script>

<style lang="less">
    @import './styles.less';
</style>
