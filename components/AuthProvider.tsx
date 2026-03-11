'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useWorkoutStore } from '@/store/workoutStore';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, initialized, initialize } = useAuthStore();
  const { syncFromSupabase } = useWorkoutStore();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  // Sync data when user logs in
  useEffect(() => {
    if (user && isSupabaseConfigured()) {
      syncFromSupabase();
    }
  }, [user, syncFromSupabase]);

  useEffect(() => {
    // Skip auth check if Supabase is not configured (local-only mode)
    if (!isSupabaseConfigured()) {
      return;
    }

    // Wait for auth to initialize
    if (!initialized) {
      return;
    }

    // If not logged in and not on login page, redirect to login
    if (!user && pathname !== '/login') {
      router.push('/login');
    }

    // If logged in and on login page, redirect to workout
    if (user && pathname === '/login') {
      router.push('/workout');
    }
  }, [user, initialized, pathname, router]);

  // Show loading while initializing
  if (!initialized && isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
