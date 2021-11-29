import { Radio, Checkbox, CheckboxGroup } from 'element-ui';
import { rangeArr, compare } from '@/utils/utils';
import InputNumber from './input-number';
import prop from './prop';

export default {
	name: 'Week',
	components: { Radio, Checkbox, InputNumber, CheckboxGroup },
	mixins: [prop],
	data() {
		return {
			radioValue: '',
			week: 1,
			// 指定
			checkList: [],
			// 周期
			cycle: {
				min: 1,
				max: 2
			},
			noop: {
				min: 1,
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
			} else if (value === '?') {
				this.radioValue = '2';
			} else if (/^([\d]+)\/([\d]+)$/.test(value)) {
				this.radioValue = '3';
				this.cycle.min = +RegExp.$1;
				this.cycle.max = +RegExp.$2;
			} else if (/^([\d]+)#([\d]+)$/.test(value)) {
				this.radioValue = '4';
				this.noop.min = +RegExp.$1;
				this.noop.max = +RegExp.$2;
			} else if (/^([\d]+)L$/.test(value)) {
				this.radioValue = '5';
				this.week = +RegExp.$1;
			} else if (/^\d+(,\d+)*$/.test(value)) {
				this.radioValue = '6';
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
					input = '?';
					this.checkList = [];
					break;
				case '3':
					input = `${this.cycle.min}/${this.cycle.max}`;
					this.checkList = [];
					break;
				case '4':
					input = `${this.noop.min}#${this.noop.max}`;
					this.checkList = [];
					break;
				case '5':
					input = `${this.week}L`;
					this.checkList = [];
					break;
				case '6': {
					if (!bool && !this.checkList.length) {
						this.checkList = ['1'];
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
		const { noop, week, cycle, disabled, className, checkList, radioValue, radioInput, radioChange, handleChange } =
			this;
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
						周 允许的通配符[, - * / L #]
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
						不指定
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
						周期 从每星期{' '}
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
							max={7}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.cycle.max = $event)}
						></input-number>
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
						第{' '}
						<input-number
							value={noop.min}
							min={1}
							max={4}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.noop.min = $event)}
						></input-number>{' '}
						周的星期{' '}
						<input-number
							value={noop.max}
							min={1}
							max={7}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.noop.max = $event)}
						></input-number>
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
						label="5"
					>
						本月最后一个星期{' '}
						<input-number
							value={week}
							min={1}
							max={7}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.week = $event)}
						></input-number>
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
						label="6"
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
						{rangeArr(7).map((item, index) => (
							<checkbox class={`${className}__checkbox`} label={`${index + 1}`}>
								{index + 1}
							</checkbox>
						))}
					</checkbox-group>
				</div>
			</div>
		);
	}
};
