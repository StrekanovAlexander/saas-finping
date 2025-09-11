import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; 
import { 
    Home, 
    HowItWorks,
    Contacts,
    Dashboard, 
    SignIn, 
    SignUp,
    SignOut 
} from "../pages";

export default function() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/user/sign-in" element={<SignIn />} />
            <Route path="/user/sign-up" element={<SignUp />} />
            <Route
                path="/user/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/user/sign-out"
                element={
                    <PrivateRoute>
                        <SignOut />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}