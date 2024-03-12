# testing-library-extra
Add `bySelector` and `byAttribute` to [@testing-library/dom](https://github.com/testing-library/dom-testing-library)



## Why?

The [@testing-library/dom](https://github.com/testing-library/dom-testing-library) manager believes that using `querySelector` API as the escape hatch in the test code is a bad practice.

But for some special purpose: when automating in browser extensions, it will be extremely difficult without a `css selector`.

See: [PR (267)](https://github.com/testing-library/dom-testing-library/pull/267)  [issues (512)](https://github.com/testing-library/dom-testing-library/issues/512)



## Install

```shell
npm install testing-library-extra
```



## Usage

**Use BySelector**

Example DOM

```html
<button class="open-dialog">open dialog</button>
<div class="dialog">
  <form>
    <input name="username"/>
    <input name="password"/>
    <button type="submit"/>
  </form>
</div>
```

Use the css selector to simulate user login.

```typescript
import { getBySelector, findBySelector } from 'testing-library-extra'
import userEvent from '@testing-library/user-event'

const dialogButton = getBySelector(document.body, '.open-dialog')

// Click the button to pop up the user form.
userEvent.click(dialogButton)

const dialog = await findBySelector(document.body, '.dialog', { timeout: 1000 })

const usernameInput = getBySelector(dialog, 'form input[name="username"]')
const passwordInput = getBySelector(dialog, 'form input[name="password"]')
const loginButton = getBySelector(dialog, 'form button[type="submit"]')

userEvent.type(usernameInput, 'admin')
userEvent.type(passwordInput, 'abc123')

userEvent.click(loginButton)
```



**Use ByAttribute**

Example DOM

```html
<button data-action="openFn...">open dialog<button>
<div data-id="dialog">
  <form>
    <input data-name="username"/>
    <input data-name="password"/>
    <button data-action="loginFn" type="submit"/>
  </form>
</div>
```
Use the attribute selector to match any dom.
```typescript
import { getByAttribute, findByAttribute } from 'testing-library-extra'
import userEvent from '@testing-library/user-event'

const dialogButton = getByAttribute(document.body, 'data-action', /^open/)

userEvent.click(dialogButton)

const dialog = await findByAttribute(document.body, 'data-id', 'dialog', undefined, { timeout: 1000 })

const usernameInput = getByAttribute(dialog, 'data-name', 'username')
const passwordInput = getByAttribute(dialog, 'data-name', 'password')
const loginButton = getByAttribute(dialog, 'data-action', /^login/)

userEvent.type(usernameInput, 'admin')
userEvent.type(passwordInput, 'abc123')

userEvent.click(loginButton)
```



## Expose API

This project exposes the following api, and the usage is consistent with the original project [@testing-library/dom](https://github.com/testing-library/dom-testing-library) .

**BySelector**

* getBySelector
* getAllBySelector
* queryBySelector
* queryAllBySelector
* findBySelector
* findAllBySelector

**ByAttribute**

* getByAttribute
* getAllByAttribute
* queryByAttribute
* queryAllByAttribute
* findByAttribute
* findAllByAttribute



## LICENSE

This project is licensed under the MIT License - see the [LICENSE](https://github.com/molvqingtai/testing-library-extra/blob/master/LICENSE) file for details.
