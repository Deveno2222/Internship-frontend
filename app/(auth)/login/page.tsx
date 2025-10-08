import { LoginForm } from "@/features/login/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm border rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Вход</h1>
        <LoginForm />
      </div>
    </div>
  );
}
