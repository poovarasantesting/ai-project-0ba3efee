import { LoginForm } from "./components/ui/auth/LoginForm";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <LoginForm />
      <Toaster />
    </div>
  );
}

export default App;