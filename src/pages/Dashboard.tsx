import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import MonthlyChart from "../components/MonthlyChart";
import { Transaction } from "../types";
import { initialTransactions } from "../data/mockData";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
    setDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
        <p className="text-muted-foreground">
          Track your income and expenses to manage your finances better
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Monthly Overview</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm
              onAddTransaction={handleAddTransaction}
              onCancel={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <MonthlyChart transactions={transactions} />
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}