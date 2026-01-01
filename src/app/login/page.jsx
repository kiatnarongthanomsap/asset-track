'use client';

import { useRouter } from 'next/navigation';
import LoginPage from '@/components/LoginPage';

export default function Login() {
  const router = useRouter();

  const handleLogin = (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    }
  };

  return <LoginPage onLogin={handleLogin} />;
}

