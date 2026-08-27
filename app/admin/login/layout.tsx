import React from 'react';

export const metadata = {
  title: 'Admin Login - Ye Etaba',
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
