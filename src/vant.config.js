import {Icon,Button,Field,CellGroup,Search,NavBar} from 'vant'

const vants = [Icon,Button,Field,CellGroup,Search,NavBar]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }

}