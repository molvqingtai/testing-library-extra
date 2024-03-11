import { type GetErrorFunction, buildQueries, type waitForOptions } from '@testing-library/dom'
import checkContainerType from '../utils/checkContainerType'

const queryAllBySelector = <R extends HTMLElement = HTMLElement>(container: HTMLElement, selector: string) => {
  checkContainerType(container)
  return [...container.querySelectorAll<R>(selector)]
}

const getMultipleError: GetErrorFunction = (_, id) => `Found multiple elements with the selector of: ${id}`
const getMissingError: GetErrorFunction = (_, id) => `Unable to find an element with the selector of: ${id}`

const [_queryBySelector, _getAllBySelector, _getBySelector, _findAllBySelector, _findBySelector] = buildQueries(
  queryAllBySelector,
  getMultipleError,
  getMissingError
)

const queryBySelector = <R extends HTMLElement = HTMLElement>(container: HTMLElement, selector: string): R | null => {
  return _queryBySelector(container, selector) as R | null
}

const getAllBySelector = <R extends HTMLElement = HTMLElement>(container: HTMLElement, selector: string): R[] => {
  return _getAllBySelector(container, selector) as R[]
}

const getBySelector = <R extends HTMLElement = HTMLElement>(container: HTMLElement, selector: string): R => {
  return _getBySelector(container, selector) as R
}
const findAllBySelector = async <R extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  selector: string,
  waitForOptions?: waitForOptions
): Promise<R[]> => {
  return (await _findAllBySelector(container, selector, undefined, waitForOptions)) as R[]
}
const findBySelector = async <R extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  selector: string,
  waitForOptions?: waitForOptions
): Promise<R> => {
  return (await _findBySelector(container, selector, undefined, waitForOptions)) as R
}

export { queryBySelector, queryAllBySelector, getBySelector, getAllBySelector, findAllBySelector, findBySelector }
