import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import Header from './Header';

const BudgetTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [email, setEmail] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        setEmail(storedEmail);

        fetchExpenses(storedEmail);
    }, []);
    useEffect(() => {
        const filteredExpenses = selectedMonth
            ? expenses.filter((expense) => expense.date.includes(selectedMonth))
            : expenses;

        setFilteredExpenses(filteredExpenses);
    }, [expenses, selectedMonth]);

// ...

    const handleMonthFilter = (e) => {
        setSelectedMonth(e.target.value);
    };
    const fetchExpenses = async (storedEmail) => {
        try {
            const response = await fetch(`https://backend-contact-list.onrender.com/expenses?email=${storedEmail}`);
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();

        const item = e.target.item.value;
        const amount = parseFloat(e.target.amount.value);
        const date = e.target.date.value;

        if (item && amount && date) {
            const newExpense = { item, amount, date };

            try {
                const storedEmail = localStorage.getItem('email');
                const response = await fetch('https://backend-contact-list.onrender.com/expenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: storedEmail, ...newExpense }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setExpenses([...expenses, data]);
                    e.target.reset();
                } else {
                    console.error('Failed to save expense');
                }
            } catch (error) {
                console.error('Error saving expense:', error);
            }
        }
    };

    const chartData = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#C9CBCF',
                ],
            },
        ],
    };

    // Aggregate expenses by item name
    const aggregatedExpenses = expenses.reduce((accumulator, expense) => {
        if (accumulator.hasOwnProperty(expense.item)) {
            accumulator[expense.item] += expense.amount;
        } else {
            accumulator[expense.item] = expense.amount;
            chartData.labels.push(expense.item); // Add unique item names to chartData.labels
        }
        return accumulator;
    }, {});

    // Update chartData with aggregated expenses
    Object.keys(aggregatedExpenses).forEach((item) => {
        chartData.datasets[0].data.push(aggregatedExpenses[item]);
    });





    const handleDeleteExpense = async (id) => {
        try {
            await fetch(`https://backend-contact-list.onrender.com/expenses/${id}`, {
                method: 'DELETE',
            });

            setExpenses(expenses.filter((expense) => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <>
            <Header />
            <div
                className="min-h-screen min-w-screen bg-gradient-to-r from-teal-300 to-green-300 py-8 mt-8"
                style={{
                    background: 'linear-gradient(-45deg, #B2F5EA 50%, #ABEBC6 50%)',
                }}
            >
                <div className="container mx-auto px-4 mt-8">
                    <h1 className="text-2xl font-bold mb-3 text-white">Budget Tracker</h1>

                    <form onSubmit={handleAddExpense} className="flex items-center mb-5">
                        <input
                            type="text"
                            name="item"
                            placeholder="Item"
                            className="px-3 py-2 mr-2 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            className="px-3 py-2 mr-2 border border-gray-300 rounded"
                        />
                        <input
                            type="date"
                            name="date"
                            className="px-3 py-2 mr-2 border border-gray-300 rounded"
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                            Add Expense
                        </button>
                    </form>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded bg-white p-4 shadow-lg">
                            <h2 className="text-lg font-semibold mb-2">Expense List</h2>
                            <select
                                value={selectedMonth}
                                onChange={handleMonthFilter}
                                className="px-3 py-2 border border-gray-300 rounded mb-2"
                            >
                                <option value="">All Months</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                                {/* Add more options for other months */}
                            </select>
                            {filteredExpenses.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredExpenses.map((expense) => (
                                        <div
                                            key={expense._id}
                                            className="rounded bg-gray-100 p-3 flex items-center justify-between"
                                        >
                                            <div>
                                                <div>
                                                    <span>{expense.item}</span>
                                                </div>
                                                <div className="px-2 py-1 text-gray-500 text-sm rounded-full bg-amber-200">{expense.date}</div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
                                                    Rs. {expense.amount}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteExpense(expense._id)}
                                                    className="px-2 py-1 bg-red-500 text-white rounded-full"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No expenses found for {selectedMonth}</p>
                            )}
                        </div>
                        <div className="rounded bg-white p-4 shadow-lg">
                            <h2 className="text-lg font-semibold mb-2">Expense Distribution</h2>

                            <div style={{width: `${filteredExpenses.length*100}px`, height: `${filteredExpenses.length*100}px`, margin: 'auto'}}>
                                <Pie data={chartData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BudgetTracker;
