import { Radio } from 'element-ui';
import InputNumber from './input-number';
import prop from './prop';

const now = new Date();

export default {
	name: 'Year',
	components: { Radio, InputNumber },
	mixins: [prop],
	data() {
		return {
			radioValue: '',
			// 周期
			cycle: {
				min: now.getFullYear(),
				max: now.getFullYear() + 1
			}
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			const { value } = this;
			if (!value) {
				this.radioValue = '1';
			} else if (value === '*') {
				this.radioValue = '2';
			} else if (/^([\d]+)-([\d]+)$/.test(value)) {
				this.radioValue = '3';
				this.cycle.min = +RegExp.$1;
				this.cycle.max = +RegExp.$2;
			}
		},
		radioInput(val) {
			this.radioValue = val;
		},
		radioChange(val) {
			let input = '';
			switch (val) {
				case '1':
					break;
				case '2':
					input = '*';
					break;
				case '3':
					input = `${this.cycle.min}-${this.cycle.max}`;
					break;
				default:
					break;
			}
			this.$emit('change', input);
		},
		// Input change
		handleChange() {
			this.radioChange(this.radioValue);
		}
	},
	render() {
		const { cycle, disabled, className, radioValue, radioInput, radioChange, handleChange } = this;
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
						不指定 允许的通配符[, - * /] 非必填
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
						每年
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
							min={1970}
							disabled={disabled}
							max={cycle.max - 1}
							onChange={handleChange}
							onInput={($event) => (this.cycle.min = $event)}
						></input-number>{' '}
						-{' '}
						<input-number
							value={cycle.max}
							min={cycle.min + 1}
							max={2099}
							disabled={disabled}
							onChange={handleChange}
							onInput={($event) => (this.cycle.max = $event)}
						></input-number>
					</radio>
				</div>
			</div>
		);
	}
};
