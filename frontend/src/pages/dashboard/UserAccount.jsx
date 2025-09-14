import { useAuth } from "../../context/AuthContext.jsx";
import { PageTitle } from "./components/index.jsx";

function UserAccount() {
    const { user } = useAuth();

    if (!user) {
        return <p className="text-center text-gray-500">No user data</p>;
    }

    return (
        <>
            <PageTitle title="Account"/>
            <div className="bg-white p-6 rounded-lg shadow">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </>  
    );
}

export default UserAccount;
