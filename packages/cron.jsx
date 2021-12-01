import prop from './prop';
import { TABS, RESULT_TPL } from './const';
import { apiFormat } from '@/utils/utils';
import { Day, Hour, Year, Week, Month, Second, Minute } from './src';

const CLASS_PREFIX = '__PREFIX__-cron';

export default {
	name: 'Cron',
	components: { Day, Hour, Year, Week, Month, Minute, Second },
	mixins: [prop],
	data() {
		return {
			tabValue: 'second',
			mapData: {}
		};
	},
	computed: {
		classes() {
			const { disabled, readonly } = this;
			const list = [CLASS_PREFIX];
			if (disabled) {
				list.push('is-disabled');
			}
			if (readonly) {
				list.push('is-readonly');
			}
			return list;
		},
		currentIndex() {
			const { tabValue } = this;
			let index = -1;
			for (let i = 0; i < TABS.length; i++) {
				if (TABS[i].value === tabValue) {
					index = i;
					break;
				}
			}
			return index;
		},
		displayValue() {
			const { value, currentIndex } = this;
			if (!value || (value && typeof value !== 'string')) return;
			const valueList = value.split(/\s+/);
			return valueList[currentIndex];
		}
	},
	methods: {
		tabChange(tab) {
			if (this.disabled) return;
			this.tabValue = tab.value;
		},
		// 值改变
		handleChange(val) {
			const { tabValue } = this;
			this.mapData[tabValue] = val;
			if (this.mapData.week == null) {
				this.mapData.week = '?';
			}
			const output = apiFormat(RESULT_TPL, this.mapData).trim();
			this.$emit('input', output);
			this.$emit('change', output);
		}
	},
	render() {
		const { classes, disabled, readonly, tabValue, tabChange, displayValue, handleChange } = this;
		return (
			<div class={classes}>
				<div class={`${CLASS_PREFIX}__header`}>
					{TABS.map((tab, key) => (
						<div
							class={[`${CLASS_PREFIX}__item`, { 'is-active': tabValue === tab.value }]}
							key={key}
							onClick={tabChange.bind(this, tab)}
						>
							{tab.label}
						</div>
					))}
				</div>
				<tabValue
					class={`${CLASS_PREFIX}__body`}
					value={displayValue}
					disabled={disabled || readonly}
					class-name={CLASS_PREFIX}
					onChange={handleChange}
				></tabValue>
			</div>
		);
	}
};
