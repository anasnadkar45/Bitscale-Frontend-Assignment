import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <main className='flex-1 w-full'>
                <Header />
                <ScrollArea className="flex-1 h-full p-4">
                    {children}
                </ScrollArea>
            </main>
        </div>
    )
}

export default layout