export default {
        name: 'dmx-cell',
        props: {
            title: String,
            value: String,
            link: Boolean,
            to: String
        },
        data () {
            return {
                classObject: {
                  'mx-cell__wrapper': true,
                  'mx-cell__wrapper__link' : false  
                }
            }
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event);
            }
        },
        computed: {
            isClass () {
                this.classObject['mx-cell__wrapper__link'] = this.$props.link ? true : false
                return this.classObject;
            },
            isTitle () {
                return this.$props.title;
            },
            isValue () {
                return this.$props.value;
            },
            isLink () {
                return this.$props.link ? this.$props.to : 'javascript:;';
            }
        }
    }