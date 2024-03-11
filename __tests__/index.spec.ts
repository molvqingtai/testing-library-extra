import { test, describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

import {
  getBySelector,
  getAllBySelector,
  queryBySelector,
  queryAllBySelector,
  findBySelector,
  findAllBySelector,
  getByAttribute,
  getAllByAttribute,
  queryByAttribute,
  queryAllByAttribute,
  findByAttribute,
  findAllByAttribute
} from '../src'
import createElement from './utils/createElement'

const createExampleDOM = () => {
  const dom = createElement<HTMLFormElement>(`
  <body>
    <form class="form">
      <div class="form-item">
        <div class="username">username</div>
      </div>
      <div class="form-item">
        <div class="password">password</div>
      </div>
      <div class="form-item">
        <button class="login-button">login</button>
      </div>
    </form>
  </body>
`)
  dom.querySelector('button')!.addEventListener('click', () => {
    const timer = setTimeout(
      () => {
        const message = createElement(`
          <div class="dialog">
            <div class="message">Login success</div>
            <button class="close-button">close</button>
          </div>`)
        dom.appendChild(message)
        clearTimeout(timer)
      },
      1000
      // Math.floor(Math.random() * 200)
    )
  })
  return dom
}

describe('Test bySelector', () => {
  test('getBySelector', () => {
    const container = createExampleDOM()
    const usernameRef = getBySelector(container, 'form .username')
    expect(usernameRef.textContent).toBe('username')
  })

  test('getAllBySelector', () => {
    const container = createExampleDOM()
    const formItemRefs = getAllBySelector(container, 'form .form-item')
    expect(formItemRefs.length).toBe(3)
  })

  test('queryBySelector', () => {
    const container = createExampleDOM()
    const usernameRef = queryBySelector(container, 'form .username')
    expect(usernameRef?.textContent).toBe('username')
  })

  test('queryAllBySelector', () => {
    const container = createExampleDOM()
    const formItemRefs = queryAllBySelector(container, 'form .form-item')
    expect(formItemRefs.length).toBe(3)
  })

  test('findBySelector', async () => {
    const container = createExampleDOM()
    const loginButtonRef = getBySelector(container, 'form .login-button')
    userEvent.click(loginButtonRef)

    const messageRef = await findBySelector(container, '.message', { timeout: 2000 })
    expect(messageRef.textContent).toBe('Login success')
  })

  test('findAllBySelector', async () => {
    const container = createExampleDOM()
    const loginButtonRef = getBySelector(container, 'form .login-button')
    userEvent.click(loginButtonRef)

    const [messageRef, closeButtonRef] = await findAllBySelector(container, '.dialog :is(div, button)', {
      timeout: 2000
    })
    expect(messageRef.textContent).toBe('Login success')
    expect(closeButtonRef.textContent).toBe('close')
  })
})

describe('Test byAttribute', () => {
  test('getByAttribute', () => {
    const container = createExampleDOM()
    const usernameRef = getByAttribute(container, 'class', 'username')
    expect(usernameRef.textContent).toBe('username')
  })

  test('getAllByAttribute', () => {
    const container = createExampleDOM()
    const formItemRefs = getAllByAttribute(container, 'class', 'form-item')
    expect(formItemRefs.length).toBe(3)
  })

  test('queryByAttribute', () => {
    const container = createExampleDOM()
    const usernameRef = queryByAttribute(container, 'class', 'username')
    expect(usernameRef?.textContent).toBe('username')
  })

  test('queryAllByAttribute', () => {
    const container = createExampleDOM()
    const formItemRefs = queryAllByAttribute(container, 'class', 'form-item')
    expect(formItemRefs.length).toBe(3)
  })

  test('findByAttribute', async () => {
    const container = createExampleDOM()
    const loginButtonRef = getByAttribute(container, 'class', 'login-button')
    userEvent.click(loginButtonRef)

    const messageRef = await findByAttribute(container, 'class', 'message', undefined, { timeout: 2000 })
    expect(messageRef.textContent).toBe('Login success')
  })

  test('findAllByAttribute', async () => {
    const container = createExampleDOM()
    const loginButtonRef = getByAttribute(container, 'class', 'login-button')
    userEvent.click(loginButtonRef)

    const [messageRef, closeButtonRef] = await findAllByAttribute(
      container,
      'class',
      /message|close-button/,
      undefined,
      {
        timeout: 2000
      }
    )
    expect(messageRef.textContent).toBe('Login success')
    expect(closeButtonRef.textContent).toBe('close')
  })
})
