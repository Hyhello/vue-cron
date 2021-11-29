import { Radio, Checkbox, CheckboxGroup } from 'element-ui';
import { rangeArr, compare } from '@/utils/utils';
import InputNumber from './input-number';
import prop from './prop';

export default {
	name: 'Minute',
	components: { Radio, Checkbox, InputNumber, CheckboxGroup },
	mixins: [prop],
	data() {
		return {
			radioValue: '',
			// 指定
			checkList: [],
			// 周期
			cycle: {
				min: 1,
				max: 2
			},
			noop: {
				min: 0,
				max: 1
			}
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			const { value } = this;
			if (value === '*') {
				this.radioValue = '1';
			} else if (/^([\d]+)-([\d]+)$/.test(value)) {
				this.radioValue = '2';
				this.cycle.min = +RegExp.$1;
				this.cycle.max = +RegExp.$2;
			} else if (/^([\d]+)\/([\d]+)$/.test(value)) {
				this.radioValue = '3';
				this.noop.min = +RegExp.$1;
				this.noop.max = +RegExp.$2;
			} else if (/^\d+(,\d+)*$/.test(value)) {
				this.radioValue = '4';
				this.checkList = value.split(',');
			}
		},
		radioInput(val) {
			this.radioValue = val;
		},
		radioChange(val, bool = false) {
			let input = '';
			switch (val) {
				case '1':
					input = '*';
					this.checkList = [];
					break;
				case '2':
					input = `${this.cycle.min}-${this.cycle.max}`;
					this.checkList = [];
					break;
				case '3':
					input = `${this.noop.min}/${this.noop.max}`;
					this.checkList = [];
					break;
				case '4': {
					if (!bool && !this.checkList.length) {
						this.checkList = ['0'];
					}
					const list = this.checkList.slice();
					input = list.sort(compare).join(',');
					break;
				}
				default:
					break;
			}
			this.$emit('change', input);
		},
		// Input change
		handleChange(val) {
			if (Array.isArray(val) && !val.length) {
				this.radioValue = '1';
			}
			this.radioChange(this.radioValue, true);
		}
	},
	render() {
		const { noop, cycle, disabled, className, checkList, radioValue, radioInput, radioChange, handleChange } = this;
		return (
			<div>
				<div class={`${className}__p`}>
					<radio
						class={`${className}__radio`}
						name="radio"
						disabled={disabled}
						onInput={radioInput}
						onChange={radioChange}
						value={radioValue}
						label="1"
					>
						每分钟 允许的通配符[, - * /]
					</radio>
				</div>
				<div class={`${className}__p`}>
					<radio
						class={`${className}__radio`}
						name="radio"
						disabled={disabled}
						onInput={radioInput}
						onChange={radioChange}
						value={radioValue}
						label="2"
					>
						周期 从{' '}
						<input-number
							value={cycle.min}
							min={1}
							max={cycle.max - 1}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.cycle.min = $event)}
						></input-number>{' '}
						-{' '}
						<input-number
							value={cycle.max}
							min={cycle.min + 1}
							max={59}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.cycle.max = $event)}
						></input-number>{' '}
						分钟
					</radio>
				</div>
				<div class={`${className}__p`}>
					<radio
						class={`${className}__radio`}
						name="radio"
						disabled={disabled}
						onInput={radioInput}
						onChange={radioChange}
						value={radioValue}
						label="3"
					>
						从{' '}
						<input-number
							value={noop.min}
							min={0}
							max={noop.max - 1}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.noop.min = $event)}
						></input-number>{' '}
						分钟开始，每{' '}
						<input-number
							value={noop.max}
							min={noop.min + 1}
							max={59}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.noop.max = $event)}
						></input-number>{' '}
						分钟执行一次
					</radio>
				</div>
				<div class={`${className}__p`}>
					<radio
						class={`${className}__radio`}
						name="radio"
						disabled={disabled}
						onInput={radioInput}
						onChange={radioChange}
						value={radioValue}
						label="4"
					>
						指定
					</radio>
				</div>
				<div class={`${className}__time`}>
					<checkbox-group
						value={checkList}
						disabled={disabled}
						onInput={($event) => (this.checkList = $event)}
						onChange={handleChange}
					>
						{rangeArr(60).map((item, index) => (
							<checkbox class={`${className}__checkbox`} label={`${index}`}>
								{index < 10 ? `0${index}` : index}
							</checkbox>
						))}
					</checkbox-group>
				</div>
			</div>
		);
	}
};
