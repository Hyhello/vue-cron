const CLASS_PREFIX = '__PREFIX__-input';

const STEP = 1;

export default {
	name: 'Inputnumber',
	props: {
		value: {
			type: Number,
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		min: {
			type: Number,
			default: -Infinity
		},
		max: {
			type: Number,
			default: Infinity
		},
		placeholder: {
			type: String,
			default: ''
		}
	},
	computed: {
		currentValue: {
			set(val) {
				this.$emit('input', val);
				this.$emit('change', val);
			},
			get() {
				return this.value;
			}
		},
		classes() {
			const { disabled } = this;
			const list = [CLASS_PREFIX];
			if (disabled) {
				list.push('is-disabled');
			}
			return list;
		},
		minDisabled() {
			return this.value <= this.min;
		},
		maxDisabled() {
			return this.value >= this.max;
		}
	},
	methods: {
		increase() {
			if (this.maxDisabled || this.disabled) return;
			this.currentValue += STEP;
		},
		decrease() {
			if (this.minDisabled || this.disabled) return;
			this.currentValue -= STEP;
		},
		setCurrentValue(value) {
			let newVal = Number(value);
			const oldValue = this.currentValue;
			if (newVal >= this.max) newVal = this.max;
			if (newVal <= this.min) newVal = this.min;
			if (oldValue === newVal) return;
			this.currentValue = newVal;
		},
		// 失去焦点
		handleBlur(ev) {
			const oldValue = this.currentValue;
			const value = Number(ev.target.value);
			if (!Number.isNaN(value)) {
				this.setCurrentValue(value);
				ev.target.value = this.currentValue;
			} else {
				ev.target.value = oldValue;
			}
			this.$emit('blur', ev);
		},
		// 获取焦点
		handleFocus(ev) {
			this.$emit('focus', ev);
		}
	},
	render() {
		const {
			classes,
			increase,
			decrease,
			disabled,
			handleBlur,
			handleFocus,
			minDisabled,
			maxDisabled,
			placeholder,
			currentValue
		} = this;
		return (
			<div class={classes}>
				<input
					class={`${CLASS_PREFIX}__inner`}
					disabled={disabled}
					value={currentValue}
					onBlur={handleBlur}
					onFocus={handleFocus}
					placeholder={placeholder}
					vOn:keydown_up_prevent={increase}
					vOn:keydown_down_prevent={decrease}
					type="text"
				/>
				<div class={`${CLASS_PREFIX}__extra`}>
					<span
						class={[`${CLASS_PREFIX}__increase`, { 'is-disabled': maxDisabled }]}
						vOn:click_stop={increase}
						role="button"
					>
						<svg
							class={`${CLASS_PREFIX}__svg`}
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M830.24 685.76l11.328-11.312a16 16 0 0 0 0-22.64L530.448 340.688a16 16 0 0 0-22.64 0L196.688 651.808a16 16 0 0 0 0 22.64l11.312 11.312a16 16 0 0 0 22.624 0l288.496-288.512L807.632 685.76a16 16 0 0 0 22.624 0z"></path>
						</svg>
					</span>
					<span
						class={[`${CLASS_PREFIX}__decrease`, { 'is-disabled': minDisabled }]}
						vOn:click_stop={decrease}
						role="button"
					>
						<svg
							class={`${CLASS_PREFIX}__svg`}
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z"></path>
						</svg>
					</span>
				</div>
			</div>
		);
	}
};
