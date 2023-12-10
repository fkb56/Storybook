import {render} from '@testing-library/react';
import {BasicInput} from './input.stories';

it('renders with the correct text', () => {
	const {getAllByText} = render(<BasicInput/>);
	const rendered = getAllByText('Names');
	expect(rendered).toBeTruthy();
});
