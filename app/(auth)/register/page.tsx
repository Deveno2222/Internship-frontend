import { RegisterForm } from "@/features/register/ui/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm border rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
