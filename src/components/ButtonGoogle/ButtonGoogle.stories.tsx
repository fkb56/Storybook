import {ButtonGoogle} from './ButtonGoogle';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Components/ButtonGoogle',
	component: ButtonGoogle,
	// tags: ['autodocs'],
	argTypes: {
		backgroundColor: {control: 'color'},
	},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
	args: {
		primary: true,
		label: 'ButtonGoogle',
	},
};

export const Secondary = {
	args: {
		label: 'ButtonGoogle',
	},
};

export const Large = {
	args: {
		size: 'large',
		label: 'ButtonGoogle',
	},
};

export const Small = {
	args: {
		size: 'small',
		label: 'ButtonGoogle',
	},
};
