import React from 'react'
import { render } from '@testing-library/react'

import { Grid, getGridClasses } from './Grid'

describe('getGridClasses', () => {
  it('returns the classes with no breakpoint', () => {
    expect(
      getGridClasses({
        col: 3,
        offset: 5,
      })
    ).toEqual('grid-col-3 grid-offset-5')

    expect(getGridClasses({ col: true })).toEqual('grid-col')

    expect(getGridClasses({ col: 'auto' })).toEqual('grid-col-auto')
    expect(getGridClasses({ col: 'fill' })).toEqual('grid-col-fill')

    expect(getGridClasses({ row: true })).toEqual('grid-row')
    expect(getGridClasses({ row: true, gap: true })).toEqual(
      'grid-row grid-gap'
    )

    expect(
      getGridClasses({
        row: true,
        gap: 'sm',
      })
    ).toEqual('grid-row grid-gap-sm')
  })

  it('returns the classes with a given breakpoint', () => {
    expect(getGridClasses({ col: true }, 'tablet')).toEqual('tablet:grid-col')
    expect(getGridClasses({ col: 4 }, 'tablet')).toEqual('tablet:grid-col-4')
    expect(getGridClasses({ gap: 2, col: 6 }, 'mobileLg')).toContain(
      'mobile-lg:grid-col-6'
    )
    expect(getGridClasses({ gap: 2, col: 6 }, 'mobileLg')).toContain(
      'mobile-lg:grid-gap-2'
    )
  })
})

describe('Grid component', () => {
  it('renders without errors', () => {
    const { queryByTestId } = render(<Grid />)
    expect(queryByTestId('grid')).toBeInTheDocument()
  })

  it('renders its children', () => {
    const { queryByText } = render(<Grid>My Content</Grid>)
    expect(queryByText('My Content')).toBeInTheDocument()
  })

  it('implements the col prop', () => {
    const { getByTestId } = render(<Grid col={5}>My Content</Grid>)
    expect(getByTestId('grid')).toHaveClass('grid-col-5')
  })

  it('implements the col auto prop', () => {
    const { getByTestId } = render(<Grid col="auto">My Content</Grid>)
    expect(getByTestId('grid')).toHaveClass('grid-col-auto')
  })

  it('implements the col fill prop', () => {
    const { getByTestId } = render(<Grid col="fill">My Content</Grid>)
    expect(getByTestId('grid')).toHaveClass('grid-col-fill')
  })

  it('implements the offset prop', () => {
    const { getByTestId } = render(<Grid offset={4}>My Content</Grid>)
    expect(getByTestId('grid')).toHaveClass('grid-offset-4')
  })

  it('implements the row prop', () => {
    const { getByTestId } = render(<Grid row>My Content</Grid>)
    expect(getByTestId('grid')).toHaveClass('grid-row')
  })

  it('implements the gap prop', () => {
    const { getByTestId } = render(<Grid gap>My Content</Grid>)
    expect(getByTestId('grid')).toHaveClass('grid-gap')
  })

  it('implements the gap size prop', () => {
    const { getByTestId } = render(<Grid gap="sm">My Content</Grid>)
    expect(getByTestId('grid')).toHaveClass('grid-gap-sm')
  })

  it('implements breakpoint props', () => {
    const { getByTestId } = render(<Grid tablet={{ col: 8 }}>My Content</Grid>)
    expect(getByTestId('grid')).toHaveClass('tablet:grid-col-8')
  })
})
