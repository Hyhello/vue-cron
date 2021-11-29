# Quick start

## @hyhello/vue-cron

The @hyhello/vue-cron component for vue2, supports single page applications.

## Examples

[demo](https://github.com/Hyhello/vue-cron/blob/master/index.html)

## Use Setup

### install @hyhello/vue-cron

```javascript
npm install @hyhello/vue-cron --save
```

### Vue mount

```vuejs
// global use
import Vue from 'vue';
import vueCron from '@hyhello/vue-cron';

Vue.use(vueCron);

// or Local use
import { Cron } from '@hyhello/vue-cron';

export default {
    components: { Cron }
};
```

### Use in SPA

```html
<style>
	html,
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 15px;
		text-align: center;
	}
</style>
<template>
	<vue-cron v-model="value" @change="change"></vue-cron>
</template>
<script>
	import { Cron as vueCron } from '@hyhello/vue-cron';

	export default {
		components: { vueCron },
		data: function () {
			return {
				value: null
			};
		},
		methods: {
			change(val) {
				console.log('value:', val);
			}
		}
	};
</script>
```

## Api

| 参数          | 说明         | 类型    | 可选值       | 默认值 |
| ------------- | ------------ | ------- | ------------ | ------ |
| value/v-model | 需要绑定的值 | string  | —            | -      |
| disabled      | 是否禁用     | boolean | true / false | false  |
| readonly      | 是否只读     | boolean | true / false | false  |

### Events

| 事件名 | 说明       | 回调参数   |
| ------ | ---------- | ---------- |
| change | 监听值变化 | 变化后的值 |
