import {
  buildQueries,
  queryHelpers,
  type GetErrorFunction,
  type Matcher,
  type MatcherOptions,
  type waitForOptions as WaitForOptions
} from '@testing-library/dom'
import checkContainerType from '../utils/checkContainerType'

const _queryAllByAttribute = <R extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  matcher: Matcher,
  options: MatcherOptions & { attribute: string }
) => {
  checkContainerType(container)
  return queryHelpers.queryAllByAttribute(options.attribute, container, matcher, options) as R[]
}

const getMultipleError: GetErrorFunction = (_, id) => `Found multiple elements with the attribute of: ${id}`
const getMissingError: GetErrorFunction = (_, id) => `Unable to find an element with the attribute of: ${id}`

const [_queryByAttribute, _getAllByAttribute, _getByAttribute, _findAllByAttribute, _findByAttribute] = buildQueries(
  // @ts-expect-error -- Incorrect derivation of buildQueries internal type
  // see https://github.com/testing-library/dom-testing-library/blob/bd04cf95a1ed85a2238f7dfc1a77d5d16b4f59dc/types/query-helpers.d.ts#L62
  _queryAllByAttribute,
  getMultipleError,
  getMissingError
)

const queryAllByAttribute = <R extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  attribute: string,
  value: Matcher,
  options?: MatcherOptions
): R[] => {
  return _queryAllByAttribute(container, value, { ...options, attribute })
}

const queryByAttribute = <R extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  attribute: string,
  value: Matcher,
  options?: MatcherOptions
): R | null => {
  // @ts-expect-error -- Incorrect derivation of buildQueries internal type
  return _queryByAttribute(container, value, { ...options, attribute }) as R | null
}

const getAllByAttribute = <R extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  attribute: string,
  value: Matcher,
  options?: MatcherOptions
): R[] => {
  // @ts-expect-error -- Incorrect derivation of buildQueries internal type
  return _getAllByAttribute(container, value, { ...options, attribute }) as R[]
}

const getByAttribute = <R extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  attribute: string,
  value: Matcher,
  options?: MatcherOptions
): R => {
  // @ts-expect-error -- Incorrect derivation of buildQueries internal type
  return _getByAttribute(container, value, { ...options, attribute }) as R
}

const findAllByAttribute = async <R extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  attribute: string,
  value: Matcher,
  options?: MatcherOptions,
  waitForOptions?: WaitForOptions
): Promise<R[]> => {
  // @ts-expect-error -- Incorrect derivation of buildQueries internal type
  return (await _findAllByAttribute(container, value, { ...options, attribute }, waitForOptions)) as R[]
}

const findByAttribute = async <R extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  attribute: string,
  value: Matcher,
  options?: MatcherOptions,
  waitForOptions?: WaitForOptions
): Promise<R> => {
  // @ts-expect-error -- Incorrect derivation of buildQueries internal type
  return (await _findByAttribute(container, value, { ...options, attribute }, waitForOptions)) as R
}

export { queryByAttribute, queryAllByAttribute, getAllByAttribute, getByAttribute, findAllByAttribute, findByAttribute }
