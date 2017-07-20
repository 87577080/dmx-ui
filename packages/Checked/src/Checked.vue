<template>
    <div class="mycheck" >
        <label class="reset-checkbox_class_label" >
            <input type="checkbox" v-model="currentValue" @change="$emit('change', currentValue)" />
            <span class="rest-checkbox_box"></span>
        </label>
    </div>
</template>

<script src="./app"></script>

<style lang="less">
    @import './styles.less';
</style>
