import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders a todo with correct details', () => {
    const todo = { title: 'Test Todo', completed: false };
    render(<Todo todo={todo} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
});
