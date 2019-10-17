/* eslint-disable no-empty-label */
import { Themes, StorageList } from './enums'

/**
 * @2019/4/17
 * @author: huiming
 * desc:  该文件存放开发的一些配置
 */
export const theme = Themes.navy

/**
 * @2019/4/17
 * @author: huiming
 * desc:  左边菜单宽度
 */

export const sideWidth = '200px'

/**
 * @2019/4/17
 * @author: huiming
 * desc:  这个数据不能修改，想要修改则需要去修改  element-menu对应的css
 */
export const sideCloseWidth = '50px'

export const aesSwitch = false

export const aesKey = ''

export const appName = '管理系统'

export const appTitle = '管理系统'

export const baseUrl = 'localhost:8780'

export const mockUrl = 'http://0.0.0.0:3002/'

export const userCache = StorageList.local
