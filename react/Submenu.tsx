import React, { Fragment } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import {
  NavigationContextProvider,
  useNavigationItems,
} from './components/NavigationContext'

const CSS_HANDLES = ['childrenWrapper'] as const

function Submenu(props: any) {
  const { children } = props
  const navigation = useNavigationItems()
  const handles = useCssHandles(CSS_HANDLES)

  let maybeWrappedChildren = children
  if (React.Children.count(children) > 0) {
    maybeWrappedChildren = (
      <div className={handles.childrenWrapper}>{children}</div>
    )
  }
  const hasItems =
    navigation?.navigationItems && navigation?.navigationItems.length > 0

  return hasItems ? (
    <Fragment>
      <ul className="list pl0">
        {navigation?.navigationItems.map((Item, idx) => (
          <li className="pv3 pl0">
            <Item key={idx} />
          </li>
        ))}
      </ul>
      {maybeWrappedChildren}
    </Fragment>
  ) : null
}

const WrappedSubmenuBlock = (props: any) => {
  return (
    <NavigationContextProvider {...props}>
      <Submenu {...props} />
    </NavigationContextProvider>
  )
}

export default WrappedSubmenuBlock
