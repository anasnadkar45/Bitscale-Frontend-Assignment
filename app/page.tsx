import Dashboard from '@/components/Dashboard'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className='flex-1 w-full'>
        <Header />
        <Dashboard />
      </main>
    </div>
  )
}

export default page