export default {
    name: 'dmx-checked',
    props: {
        value: Boolean
    },
    computed: {
        currentValue: {
            get() {
                
                return this.value;
            },
            set(val) {
                console.log( val )
                this.$emit('input', val);
            }
        }
    }
}