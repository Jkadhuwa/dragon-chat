import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import { Home, RootLayout } from "./_root";
import { SignupForm, AuthLayout, SigninForm } from "./_auth";

const App = () => {
  
  return (
   
      <main className="flex h-screen">
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SigninForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Route>

          {/* Private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>

        <Toaster />
      </main>
   
  );
};

export default App;
