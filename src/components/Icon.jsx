import React from 'react'
import { memo } from 'react'

// Import images using regular import syntax
import dashboardIcon from '../assets/icons/dashboard.svg?url'
import ordersIcon from '../assets/icons/orders.svg?url'
import customersIcon from '../assets/icons/customers.svg?url'
import settingsIcon from '../assets/icons/settings.svg?url'
import searchIcon from '../assets/icons/search.svg?url'
import bellIcon from '../assets/icons/bell.svg?url'
import salesIcon from '../assets/icons/sales.svg?url'
import averageIcon from '../assets/icons/average.svg?url'
import arrowUpIcon from '../assets/icons/arrow-up.svg?url'
import arrowDownIcon from '../assets/icons/arrow-down.svg?url'
import dropdownIcon from '../assets/icons/dropdown.svg?url'
import calendarIcon from '../assets/icons/calendar.svg?url'
import kanbanIcon from '../assets/icons/kanban.svg?url'
import plusIcon from '../assets/icons/plus.svg?url'
import importIcon from '../assets/icons/import.svg?url'
import exportIcon from '../assets/icons/export.svg?url'
import eyeIcon from '../assets/icons/eye.svg?url'
import editIcon from '../assets/icons/edit.svg?url'
import trashIcon from '../assets/icons/trash.svg?url'
import userAvatarIcon from '../assets/icons/user-avatar.svg?url'

const icons = {
  dashboard: dashboardIcon,
  orders: ordersIcon,
  customers: customersIcon,
  settings: settingsIcon,
  search: searchIcon,
  bell: bellIcon,
  sales: salesIcon,
  average: averageIcon,
  arrowUp: arrowUpIcon,
  arrowDown: arrowDownIcon,
  dropdown: dropdownIcon,
  calendar: calendarIcon,
  kanban: kanbanIcon,
  plus: plusIcon,
  import: importIcon,
  export: exportIcon,
  eye: eyeIcon,
  edit: editIcon,
  trash: trashIcon,
  userAvatar: userAvatarIcon,
}

const Icon = memo(({ name, className = '', size = 24 }) => {
  const IconComponent = icons[name]
  if (!IconComponent) {
    return null
  }

  return (
    <img
      src={IconComponent}
      alt={`${name} icon`}
      className={className}
      width={size}
      height={size}
    />
  )
})

Icon.displayName = 'Icon'

export default Icon 