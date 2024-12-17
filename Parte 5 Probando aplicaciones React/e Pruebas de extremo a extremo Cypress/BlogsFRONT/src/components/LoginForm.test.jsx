import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'; 

test('<LoginForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<LoginForm createNote={createNote} />)

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)
  console.log(createNote.mock.calls)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})