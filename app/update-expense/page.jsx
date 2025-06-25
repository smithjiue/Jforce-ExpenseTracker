"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function UpdateExpensePage() {
  const [expenseName, setExpenseName] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [expenseId, setExpenseId] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (!auth) {
      router.push("/")
    } else {
      setIsAuthenticated(true)

      // Load expense data for editing
      const editingExpense = localStorage.getItem("editingExpense")
      if (editingExpense) {
        const expense = JSON.parse(editingExpense)
        setExpenseId(expense.id)
        setExpenseName(expense.name)
        setAmount(expense.amount.toString())
        setDate(expense.date)
        setDescription(expense.description)
      } else {
        router.push("/expense-list")
      }
    }
  }, [router])

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedExpense = {
      id: expenseId,
      name: expenseName,
      amount: Number.parseFloat(amount),
      date,
      description,
    }

    // Get existing expenses and update the specific one
    const existingExpenses = JSON.parse(localStorage.getItem("expenses") || "[]")
    const updatedExpenses = existingExpenses.map((expense) => (expense.id === expenseId ? updatedExpense : expense))
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))

    // Clear editing expense
    localStorage.removeItem("editingExpense")

    // Redirect to expense list
    router.push("/expense-list")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/expense-list" className="text-blue-600 hover:underline">
            ← Back to Expense List
          </Link>
        </div>

        <Card className="max-w-2xl mx-auto bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-800">Update Expense</CardTitle>
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
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
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
                  placeholder="Lunch at the downtown cafe"
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Update Expense
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
