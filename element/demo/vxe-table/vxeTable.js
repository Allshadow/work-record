// 依赖引入
import 'xe-utils'
// 样式引入
import 'vxe-table/lib/style.css'
// 图标引入
import '@/assets/vxeFont/css/font-awesome.min.css'
import {
  // 核心
  VXETable,

  // 表格功能
  Header,
  // Footer,
  // Icon,
  // Filter,
  // Edit,
  // Menu,
  // Export,
  // Keyboard,
  // Validator,

  // 可选组件
  Column,
  // Colgroup,
  // Grid,
  // Tooltip,
  // Toolbar,
  // Pager,
  // Form,
  // FormItem,
  // FormGather,
  // Checkbox,
  // CheckboxGroup,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Switch,
  // Input,
  // Select,
  // Optgroup,
  // Option,
  // Textarea,
  // Button,
  // Modal,
  // List,
  // Pulldown,

  // 表格
  Table
} from 'vxe-table'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
// VXETable.setup({
//   i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
// })

export function useTable (app) {
  // 表格功能
  app.use(Header)
  // .use(Footer)
  // .use(Icon)
  // .use(Filter)
  // .use(Edit)
  // .use(Menu)
  // .use(Export)
  // .use(Keyboard)
  // .use(Validator)

  // 可选组件
  .use(Column)
  // .use(Colgroup)
  // .use(Grid)
  // .use(Tooltip)
  // .use(Toolbar)
  // .use(Pager)
  // .use(Form)
  // .use(FormItem)
  // .use(FormGather)
  // .use(Checkbox)
  // .use(CheckboxGroup)
  // .use(Radio)
  // .use(RadioGroup)
  // .use(RadioButton)
  // .use(Switch)
  // .use(Input)
  // .use(Select)
  // .use(Optgroup)
  // .use(Option)
  // .use(Textarea)
  // .use(Button)
  // .use(Modal)
  // .use(List)
  // .use(Pulldown)

  // 安装表格
  .use(Table)
}