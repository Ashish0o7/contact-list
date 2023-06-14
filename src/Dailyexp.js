import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import Header from './Header';

const BudgetTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        setEmail(storedEmail);

        fetchExpenses(storedEmail);
    }, []);

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

        if (item && amount) {
            const newExpense = { item, amount };

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
        labels: expenses.map((expense) => expense.item),
        datasets: [
            {
                data: expenses.map((expense) => expense.amount),
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

    return (
        <>
            <Header />
            <div
                className="container mx-auto px-4 py-8 mt-8"
                style={{
                    background: 'linear-gradient(-45deg, #B2F5EA 50%, #ABEBC6 50%)',
                }}
            >
                <h1 className="text-2xl font-bold mb-3">Expense Tracker</h1>

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
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Add Expense
                    </button>
                </form>

                <div className="w-1/2 mx-auto">
                    <Pie key={expenses.length} data={chartData} />
                </div>
            </div>
        </>
    );
};

export default BudgetTracker;
