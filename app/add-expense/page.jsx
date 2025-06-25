"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddExpensePage() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
      // Set today's date as default
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now().toString(),
      name: expenseName,
      amount: Number.parseFloat(amount),
      date,
      description,
    };

    // Get existing expenses from localStorage
    const existingExpenses = JSON.parse(
      localStorage.getItem("expenses") || "[]"
    );
    const updatedExpenses = [...existingExpenses, newExpense];
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    // Reset form
    setExpenseName("");
    setAmount("");
    setDescription("");

    // Redirect to expense list
    router.push("/expense-list");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <Card className="max-w-2xl mx-auto bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Add New Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expenseName" className="text-sm text-gray-600">
                  Expense Name:
                </Label>
                <Input
                  id="expenseName"
                  type="text"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm text-gray-600">
                  Amount:
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm text-gray-600">
                  Date:
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm text-gray-600">
                  Description:
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Add Expense
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
