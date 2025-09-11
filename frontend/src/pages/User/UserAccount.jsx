import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/dashboard/Sidebar";
import Heading from "../../components/dashboard/elements/Heading";

function UserAccount() {
    const { user } = useAuth();

    if (!user) {
        return <p className="text-center text-gray-500">No user data</p>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-6">
                <Heading title="My Account"/>
                <div className="bg-white p-6 rounded-lg shadow">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>  
    );
}

export default UserAccount;
