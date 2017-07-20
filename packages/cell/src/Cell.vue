<template>
    <div>
        <a :href="isLink" class="dmx-cell">
            <div :class="isClass" @click="handleClick">
                <span class="dmx-cell__left" v-text="isTitle"></span>
                <span class="dmx-cell__right" v-text="isValue"></span>
            </div>
        </a>
    </div>
</template>

<script src="./app.js"></script>

<style lang="less">
    @import './style.less';
</style>