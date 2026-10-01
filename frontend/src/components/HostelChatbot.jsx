import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    MessageSquare, 
    X, 
    Send, 
    Bot, 
    User, 
    Sparkles, 
    HelpCircle 
} from 'lucide-react';

const HostelChatbot = () => {
    const { 
        currentStudent, 
        monthlyFee, 
        minContinuousDays, 
        paymentDeadlineDay, 
        lateFinePerDay, 
        getStudentBill 
    } = useContext(MessContext);

    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: `👋 Hi ${currentStudent.name}! I am your AI Hostel & Mess Assistant. Ask me about your 7-day mess cut rules, ₹0 room rent policy, pay deadline (10th), late fines (₹5/day), or room allocation!`
        }
    ]);

    const bill = getStudentBill(currentStudent.id);

    const handleSend = (userQuery) => {
        const textToProcess = userQuery || input;
        if (!textToProcess.trim()) return;

        // Add user message
        const newMessages = [...messages, { sender: 'user', text: textToProcess }];
        setMessages(newMessages);
        if (!userQuery) setInput('');

        // Bot Response Engine
        setTimeout(() => {
            const query = textToProcess.toLowerCase();
            let botReply = "I can help answer questions about Hostel Mess Cuts, ₹0 Room Rent Policy, Payment Deadlines, Late Fines, and Daily Menus! Try asking 'What is the 7-day rule?' or 'What is my current bill?'";

            if (query.includes('7 day') || query.includes('mess cut') || query.includes('discount') || query.includes('rule')) {
                botReply = `📌 **7-Day Continuous Mess Cut Rule**: If you continuously skip food for 7 or more days, you get a pro-rated discount deducted from your monthly bill upon admin approval. Leave under 7 days is logged for kitchen records, but does NOT reduce the monthly bill.`;
            } else if (query.includes('fine') || query.includes('deadline') || query.includes('late') || query.includes('pay') || query.includes('10th')) {
                botReply = `⏰ **Payment Deadline & Late Fine Policy**: The deadline to pay your monthly mess bill is the **10th of every month**. If payment is delayed past the 10th, a late fine of **₹${lateFinePerDay} per day** of delay is added automatically to your bill.`;
            } else if (query.includes('room') || query.includes('rent') || query.includes('allocation')) {
                botReply = `🏠 **Room Allocation & Policy**: You are allocated to **${currentStudent.block}, Room ${currentStudent.room} (${currentStudent.bed})**. Note: As per central hostel policy, **Room Rent is strictly ₹0.00**. You only pay for food mess subscription!`;
            } else if (query.includes('dinner') || query.includes('menu') || query.includes('food')) {
                botReply = `🍲 **Dinner Menu Details**: Today's detailed dinner includes Mix Veg Sabzi, Dal Makhani, Phulka Roti, Steamed Rice, Salad, Pickle, and Sweet Dessert (Gulab Jamun / Kheer). Served 7:30 PM - 9:30 PM!`;
            } else if (query.includes('bill') || query.includes('total') || query.includes('amount')) {
                botReply = `💰 **Your October Bill Summary**: Base Fee: ₹${monthlyFee} | Room Rent: ₹0.00 | Approved Cuts: -₹${bill.messCutDeduction} | Overdue Fine: ₹${bill.lateFine} | **Total Net Payable: ₹${bill.netPayable}**.`;
            }

            setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
        }, 500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2 font-bold text-xs shadow-blue-500/30"
                >
                    <Bot className="w-6 h-6 animate-pulse" />
                    <span className="hidden sm:inline">AI Hostel Assistant</span>
                </button>
            ) : (
                <div className="bg-white rounded-3xl w-80 sm:w-96 shadow-2xl border border-slate-200 flex flex-col h-[480px] overflow-hidden animate-in fade-in zoom-in duration-200">
                    {/* Header */}
                    <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-600 rounded-xl">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-1">
                                    Mess AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                </h4>
                                <span className="text-[10px] text-emerald-400 font-semibold block">Online • Instant Answers</span>
                            </div>
                        </div>

                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                        {messages.map((m, idx) => (
                            <div key={idx} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {m.sender === 'bot' && (
                                    <div className="p-1 bg-blue-50 text-blue-600 rounded-lg shrink-0 h-fit mt-1">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                )}
                                <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                                    m.sender === 'user'
                                        ? 'bg-blue-600 text-white font-medium rounded-br-none'
                                        : 'bg-slate-100 text-slate-800 rounded-bl-none font-normal border border-slate-200/60'
                                }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="p-2 bg-slate-50 border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
                        <button onClick={() => handleSend("What is the 7-day rule?")} className="bg-white border px-2.5 py-1 rounded-full text-slate-700 whitespace-nowrap hover:bg-blue-50">
                            ❓ 7-Day Rule
                        </button>
                        <button onClick={() => handleSend("What is the pay deadline & late fine?")} className="bg-white border px-2.5 py-1 rounded-full text-slate-700 whitespace-nowrap hover:bg-blue-50">
                            ⏰ Late Fine (₹5/day)
                        </button>
                        <button onClick={() => handleSend("What is my current bill?")} className="bg-white border px-2.5 py-1 rounded-full text-slate-700 whitespace-nowrap hover:bg-blue-50">
                            💰 Current Bill
                        </button>
                    </div>

                    {/* Input Field */}
                    <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Ask about mess cuts, fine, bill..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={() => handleSend()}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HostelChatbot;
