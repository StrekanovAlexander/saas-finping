import { Routes, Route } from "react-router-dom";
import { 
    Home, 
    HowItWorks,
    Contacts,
    Dashboard, 
    SignIn, 
    SignUp 
} from "../pages";

export default function() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/user/sign-in" element={<SignIn />} />
            <Route path="/user/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}