## el-bug

- 时间选择器组件选择时间范围的时候，当需要清空赋值的开始时间和结束时间的时候，不能将开始时间和结束时间各自赋值为空再赋值给组件的数组，而是直接赋值一个空数组，否则组件的当前时间会回到1970年的1月1日
- IE11 input 输入框placeholder 会自动校验为空
- 表单校验自定义校验规则结束必须加上callback回调的调用，不然校验通过之后不会有任何反应，大坑