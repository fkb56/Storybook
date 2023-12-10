import {render} from '@testing-library/react';
import {
	ContainedButton,
	DangerButton,
	GoogleButton,
	GoogleButtonDisabled,
	OutlinedButton,
	TextButton
} from './button.stories';

it('renders TextButton with the correct text', () => {
	const {getByText} = render(<TextButton/>);
	const rendered = getByText('Text');
	expect(rendered).toBeTruthy();
});

it('renders OutlinedButton with the correct text', () => {
	const {getByText} = render(<OutlinedButton/>);
	const rendered = getByText('outlined');
	expect(rendered).toBeTruthy();
});

it('renders ContainedButton with the correct text', () => {
	const {getByText} = render(<ContainedButton/>);
	const rendered = getByText('contained');
	expect(rendered).toBeTruthy();
});

it('renders DangerButton with the correct text', () => {
	const {getByText} = render(<DangerButton/>);
	const rendered = getByText('danger');
	expect(rendered).toBeTruthy();
});

it('renders GoogleButton with the correct text', () => {
	const {getByText} = render(<GoogleButton/>);
	const rendered = getByText('Sign in with Google');
	expect(rendered).toBeTruthy();
});

it('renders GoogleButtonDisabled with the correct text', () => {
	const {getByText} = render(<GoogleButtonDisabled/>);
	const rendered = getByText('Sign in with Google');
	expect(rendered).toBeTruthy();
});
