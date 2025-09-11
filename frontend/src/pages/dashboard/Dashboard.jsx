import { PageTitle, Sidebar } from "./components";

function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <PageTitle title="Dashboard"/>
                </div>
            </div>
        </div>    
    )
}

export default Dashboard;