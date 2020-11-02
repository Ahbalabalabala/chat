import {Icon,Button,Field,CellGroup,Search,NavBar,Toast,Dialog,Notify,Popup,Cell,Image,Lazyload,DropdownMenu, DropdownItem,RadioGroup,Radio} from 'vant'

const vants = [Icon,Button,Field,CellGroup,Search,NavBar,Toast,Dialog,Notify,Popup,Cell,Image,Lazyload,DropdownMenu, DropdownItem,RadioGroup,Radio]

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
    },


}
