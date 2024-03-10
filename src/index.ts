import {
  type Matcher,
  type GetErrorFunction,
  type MatcherOptions,
  buildQueries,
  queryHelpers
} from '@testing-library/dom'

const queryAllByClass = (container: HTMLElement, id: Matcher, options?: MatcherOptions) => {
  if (id instanceof RegExp) {
    return queryHelpers.queryAllByAttribute('class', container, id, options)
  } else {
    return [...container.querySelectorAll(`${id}`)] as HTMLElement[]
  }
}

const getMultipleError: GetErrorFunction = (c, value) => `Found multiple elements with the class name of: ${value}`
const getMissingError: GetErrorFunction = (c, value) => `Unable to find an element with the class name of: ${value}`

const [queryByClass, getAllByClass, getByClass, findAllByClass, findByClass] = buildQueries(
  queryAllByClass,
  getMultipleError,
  getMissingError
)

export { queryByClass, queryAllByClass, getByClass, getAllByClass, findAllByClass, findByClass }
