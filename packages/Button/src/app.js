export default {
        name: 'dmx-button',
        props: {
            disabled: String,
            type: String
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event);
            }
        },
        computed: {
            isDisabled () {
                return typeof this.$props.disabled === 'undefined' ? false : true;
            },
            isType () {
                let obj = {
                    'primary': 'dmx-button dmx-button__primary dmx-button_large',
                    'default': 'dmx-button  dmx-button__default dmx-button_small'
                }
                return obj[this.$props.type];
            }
        }       
    }