"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    router.push("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div> */}

        <Card className="max-w-2xl mx-auto bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Welcome to Expense Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="flex justify-center space-x-4">
              <Link href="/add-expense" className="text-green-600">
                {/* <Button className="bg-green-600 hover:bg-green-700 text-white px-6"> */}
                Add Expense
                {/* </Button> */}
              </Link>
              <Link href="/expense-list" className="text-green-600">
                {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6"> */}
                Expense List
                {/* </Button> */}
              </Link>
            </div>
            <p className="text-gray-600 text-sm">
              Track and manage your expenses effectively. Use the navigation
              links to add new expenses or view your expense history.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
