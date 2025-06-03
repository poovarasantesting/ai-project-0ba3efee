import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Transaction, CategoryTotal, MonthlyTotal } from "../types";
import { formatCurrency, getCurrentMonth } from "../lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MonthlyChartProps {
  transactions: Transaction[];
}

export default function MonthlyChart({ transactions }: MonthlyChartProps) {
  // Calculate totals by category
  const categoryTotals = useMemo(() => {
    const incomeTotals: CategoryTotal[] = [];
    const expenseTotals: CategoryTotal[] = [];

    transactions.forEach((transaction) => {
      const totalsArray =
        transaction.type === "income" ? incomeTotals : expenseTotals;
      const existingCategory = totalsArray.find(
        (item) => item.category === transaction.category
      );

      if (existingCategory) {
        existingCategory.amount += transaction.amount;
      } else {
        totalsArray.push({
          category: transaction.category,
          amount: transaction.amount,
        });
      }
    });

    return { incomeTotals, expenseTotals };
  }, [transactions]);

  // Calculate monthly totals
  const monthlyTotal = useMemo(() => {
    const total: MonthlyTotal = {
      income: categoryTotals.incomeTotals.reduce(
        (sum, item) => sum + item.amount,
        0
      ),
      expense: categoryTotals.expenseTotals.reduce(
        (sum, item) => sum + item.amount,
        0
      ),
      balance: 0,
    };
    total.balance = total.income - total.expense;
    return total;
  }, [categoryTotals]);

  // Chart data for expenses
  const expenseChartData = {
    labels: categoryTotals.expenseTotals.map((item) => item.category),
    datasets: [
      {
        data: categoryTotals.expenseTotals.map((item) => item.amount),
        backgroundColor: [
          "#f87171", // red-400
          "#fb923c", // orange-400
          "#fbbf24", // amber-400
          "#a3e635", // lime-400
          "#34d399", // emerald-400
          "#2dd4bf", // teal-400
          "#22d3ee", // cyan-400
          "#38bdf8", // sky-400
          "#818cf8", // indigo-400
          "#a78bfa", // violet-400
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for income
  const incomeChartData = {
    labels: categoryTotals.incomeTotals.map((item) => item.category),
    datasets: [
      {
        data: categoryTotals.incomeTotals.map((item) => item.amount),
        backgroundColor: [
          "#4ade80", // green-400
          "#60a5fa", // blue-400
          "#a78bfa", // violet-400
          "#34d399", // emerald-400
          "#fbbf24", // amber-400
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 12,
        },
      },
    },
  };

  const currentMonth = getCurrentMonth();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{currentMonth} Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="text-lg font-medium text-green-600">
                {formatCurrency(monthlyTotal.income)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Expenses</p>
              <p className="text-lg font-medium text-red-600">
                {formatCurrency(monthlyTotal.expense)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Balance</p>
              <p
                className={`text-lg font-medium ${
                  monthlyTotal.balance >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatCurrency(monthlyTotal.balance)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] flex items-center justify-center">
              {categoryTotals.expenseTotals.length > 0 ? (
                <Doughnut data={expenseChartData} options={chartOptions} />
              ) : (
                <p className="text-muted-foreground">No expense data</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Income Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] flex items-center justify-center">
              {categoryTotals.incomeTotals.length > 0 ? (
                <Doughnut data={incomeChartData} options={chartOptions} />
              ) : (
                <p className="text-muted-foreground">No income data</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}