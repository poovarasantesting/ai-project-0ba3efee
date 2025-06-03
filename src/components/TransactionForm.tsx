import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";
import { categories } from "../data/mockData";
import { Transaction, TransactionType } from "../types";

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
  onCancel: () => void;
}

export default function TransactionForm({
  onAddTransaction,
  onCancel,
}: TransactionFormProps) {
  const { toast } = useToast();
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category || !date) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: amountValue,
      description,
      category,
      date,
      type,
    };

    onAddTransaction(newTransaction);
    toast({
      title: "Success!",
      description: `${type === "income" ? "Income" : "Expense"} added successfully`,
    });
    
    // Reset form
    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <Button
          type="button"
          variant={type === "expense" ? "default" : "outline"}
          onClick={() => setType("expense")}
          className="w-1/2"
        >
          Expense
        </Button>
        <Button
          type="button"
          variant={type === "income" ? "default" : "outline"}
          onClick={() => setType("income")}
          className="w-1/2"
        >
          Income
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="What was this for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories[type].map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button variant="outline" type="button" onClick={onCancel} className="w-1/2">
          Cancel
        </Button>
        <Button type="submit" className="w-1/2">
          Save
        </Button>
      </div>
    </form>
  );
}