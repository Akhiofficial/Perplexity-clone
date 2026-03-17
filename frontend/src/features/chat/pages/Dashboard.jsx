import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import Sidebar from '../components/Sidebar'
import SearchSection from '../components/SearchSection'

const Dashboard = () => {

    const chat = useChat();

    const { user } = useSelector(state => state.auth)
    console.log(user);
    
    useEffect(() => {
        chat.initializeSocketConnection;
    }, [])

  return (
    <div className="flex bg-brand-bg text-brand-text h-screen overflow-hidden">
        <Sidebar />
        <SearchSection />
    </div>
  )
}

export default Dashboard