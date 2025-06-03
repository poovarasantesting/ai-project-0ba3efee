import { useState } from "react";
import { Transaction } from "../types";
import { Badge } from "./ui/badge";
import { formatCurrency, formatDate } from "../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { categories } from "../data/mockData";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filter transactions based on search, category, and tab
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by search term
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by category
    const matchesCategory =
      filterCategory === "all" || transaction.category === filterCategory;

    // Filter by type (tab)
    const matchesType =
      activeTab === "all" || transaction.type === activeTab;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Get all categories from both income and expense
  const allCategories = [
    ...new Set([...categories.income, ...categories.expense]),
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-[180px]">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expense">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <TransactionItems transactions={filteredTransactions} />
        </TabsContent>

        <TabsContent value="income" className="mt-4">
          <TransactionItems
            transactions={filteredTransactions.filter(
              (t) => t.type === "income"
            )}
          />
        </TabsContent>

        <TabsContent value="expense" className="mt-4">
          <TransactionItems
            transactions={filteredTransactions.filter(
              (t) => t.type === "expense"
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TransactionItems({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No transactions found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className={`${
                transaction.type === "income"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } p-2 rounded-full`}
            >
              {transaction.type === "income" ? (
                <ArrowUpCircle className="h-5 w-5" />
              ) : (
                <ArrowDownCircle className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="font-medium">{transaction.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {formatDate(transaction.date)}
                </span>
                <Badge variant="outline" className="text-xs">
                  {transaction.category}
                </Badge>
              </div>
            </div>
          </div>
          <div
            className={`font-medium ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}