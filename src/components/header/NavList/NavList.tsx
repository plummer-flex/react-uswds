import React from 'react'
import classnames from 'classnames'

interface NavListProps {
  items: React.ReactNode[]
  primary?: boolean
  secondary?: boolean
  subnav?: boolean
  megamenu?: boolean
  footerSecondary?: boolean
}

export const NavList = (
  props: NavListProps & React.HTMLAttributes<HTMLUListElement>
): React.ReactElement => {
  const {
    items,
    primary,
    secondary,
    subnav,
    megamenu,
    footerSecondary,
    className,
    ...ulProps
  } = props

  const ulClasses = classnames(
    {
      'usa-nav__primary usa-accordion': primary,
      'usa-nav__secondary-links': secondary,
      'usa-nav__submenu': subnav,
      'usa-nav__submenu-list': megamenu,
      'usa-list usa-list--unstyled': footerSecondary,
    },
    className
  )

  const liClasses = classnames({
    'usa-nav__primary-item': primary,
    'usa-nav__secondary-item': secondary,
    'usa-nav__submenu-item': subnav || megamenu,
    'usa-footer__secondary-link': footerSecondary,
  })

  return (
    <ul className={ulClasses} {...ulProps}>
      {items.map((item, i) => (
        <li key={`item_${i}`} className={liClasses}>
          {item}
        </li>
      ))}
    </ul>
  )
}
