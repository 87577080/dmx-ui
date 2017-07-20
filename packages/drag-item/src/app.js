import bus from '../../../common/bus'

export default {
    name: 'dmx-drag-item',
    props: {
        index: [Number, String]
    },
    methods: {
        setIndex () {
            bus.$emit('indexValue',{
                index: parseInt(this.index)
            })
        }
    }
}