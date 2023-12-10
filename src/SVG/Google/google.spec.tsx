import {render} from '@testing-library/react';
import {BasicGoogle} from "./google.stories";

it('renders with the correct text', () => {
	const {baseElement} = render(<BasicGoogle/>);
	expect(baseElement).toBeTruthy()
});
