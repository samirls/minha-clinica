'use client'

import React from 'react'
import SidebarWithHeader from '@/app/components/SidebarWithHeader/SidebarWithHeader'

function layout({ children }) {
  return (
    <div>
        <SidebarWithHeader>
            { children }
        </SidebarWithHeader >
    </div>
  )
}

export default layout