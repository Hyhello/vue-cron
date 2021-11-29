import { Radio, Checkbox, CheckboxGroup } from 'element-ui';
import { rangeArr, compare } from '@/utils/utils';
import InputNumber from './input-number';
import prop from './prop';

export default {
	name: 'Day',
	components: { Radio, Checkbox, InputNumber, CheckboxGroup },
	mixins: [prop],
	data() {
		return {
			radioValue: '',
			month: 1,
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
			} else if (/^([\d]+)-([\d]+)$/.test(value)) {
				this.radioValue = '3';
				this.cycle.min = +RegExp.$1;
				this.cycle.max = +RegExp.$2;
			} else if (/^([\d]+)\/([\d]+)$/.test(value)) {
				this.radioValue = '4';
				this.noop.min = +RegExp.$1;
				this.noop.max = +RegExp.$2;
			} else if (/^([\d]+)W&/.test(value)) {
				this.radioValue = '5';
				this.month = +RegExp.$1;
			} else if (value === 'L') {
				this.radioValue = '6';
			} else if (/^\d+(,\d+)*$/.test(value)) {
				this.radioValue = '7';
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
					input = `${this.cycle.min}-${this.cycle.max}`;
					this.checkList = [];
					break;
				case '4':
					input = `${this.noop.min}/${this.noop.max}`;
					this.checkList = [];
					break;
				case '5':
					input = `${this.month}W`;
					this.checkList = [];
					break;
				case '6':
					input = 'L';
					this.checkList = [];
					break;
				case '7': {
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
		const {
			noop,
			cycle,
			month,
			disabled,
			className,
			radioValue,
			radioInput,
			radioChange,
			checkList,
			handleChange
		} = this;
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
						日 允许的通配符[, - * / L W]
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
							max={31}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.cycle.max = $event)}
						></input-number>{' '}
						日
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
						从{' '}
						<input-number
							value={noop.min}
							min={1}
							max={31}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.noop.min = $event)}
						></input-number>{' '}
						日开始，每{' '}
						<input-number
							value={noop.max}
							min={1}
							max={31}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.noop.max = $event)}
						></input-number>{' '}
						天执行一次
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
						每月{' '}
						<input-number
							value={month}
							min={1}
							max={31}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.month = $event)}
						></input-number>{' '}
						号最近的那个工作日
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
						本月最后一天
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
						label="7"
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
						{rangeArr(31).map((item, index) => (
							<checkbox class={`${className}__checkbox`} label={`${index + 1}`}>
								{index < 9 ? `0${index + 1}` : index + 1}
							</checkbox>
						))}
					</checkbox-group>
				</div>
			</div>
		);
	}
};
