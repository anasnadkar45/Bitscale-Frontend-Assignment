import DashboardCards from '@/components/DashboardCards'
import GridTable from '@/components/GridTable'
import ToolBar from '@/components/ToolBar'
import React from 'react'

const page = () => {
  return (
    <div className='space-y-4'>
        <ToolBar />
        <DashboardCards />
        <GridTable />
    </div>
  )
}

export default page