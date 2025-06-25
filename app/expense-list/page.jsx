"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Trash2, Edit } from "lucide-react"

export default function ExpenseListPage() {
  const [expenses, setExpenses] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (!auth) {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      // Load expenses from localStorage
      const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]")
      setExpenses(savedExpenses)
    }
  }, [router])

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
  }

  const editExpense = (expense) => {
    localStorage.setItem("editingExpense", JSON.stringify(expense))
    router.push("/update-expense")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
          <Link href="/add-expense">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Add New Expense</Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-800">Expense List</CardTitle>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No expenses found. Add your first expense!</p>
                <Link href="/add-expense">
                  <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">Add Expense</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <Card key={expense.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-600 text-lg">{expense.name}</h3>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Amount:</span> ${expense.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Date:</span> {new Date(expense.date).toLocaleDateString()}
                          </p>
                          {expense.description && (
                            <p className="text-sm text-gray-600 mt-2">
                              <span className="font-medium">Description:</span> {expense.description}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => editExpense(expense)}
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 hover:bg-blue-100"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => deleteExpense(expense.id)}
                            size="sm"
                            variant="outline"
                            className="bg-red-50 hover:bg-red-100 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
