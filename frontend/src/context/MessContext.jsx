import React, { createContext, useState } from 'react';

export const MessContext = createContext();

export const MessProvider = ({ children }) => {
    // Settings state
    const [monthlyFee, setMonthlyFee] = useState(3000);
    const [minContinuousDays, setMinContinuousDays] = useState(7);
    const [roomRent] = useState(0); // STRICTLY 0
    const [paymentDeadlineDay, setPaymentDeadlineDay] = useState(10);
    const [lateFinePerDay, setLateFinePerDay] = useState(5);

    // Strict Auth state: default isLoggedIn = false
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // 'student', 'admin', 'messteam'

    // Room Allocation data (Admin editable, Room Rent = 0)
    const [students, setStudents] = useState([
        { 
            id: 'STU101', 
            name: 'Rahul Sharma', 
            room: '102', 
            bed: 'Bed 1', 
            block: 'Block A', 
            roomType: 'Double Sharing Non-AC', 
            roommates: ['Vikram Patel'],
            department: 'Computer Science', 
            year: '3rd Year',
            phone: '+91 98765 43210' 
        },
        { 
            id: 'STU102', 
            name: 'Ananya Verma', 
            room: '205', 
            bed: 'Bed 2', 
            block: 'Block B', 
            roomType: 'Triple Sharing Non-AC', 
            roommates: ['Sneha Reddy'],
            department: 'Electrical Engg', 
            year: '2nd Year',
            phone: '+91 98765 43211' 
        },
        { 
            id: 'STU103', 
            name: 'Vikram Patel', 
            room: '102', 
            bed: 'Bed 2', 
            block: 'Block A', 
            roomType: 'Double Sharing Non-AC', 
            roommates: ['Rahul Sharma'],
            department: 'Mechanical Engg', 
            year: '4th Year',
            phone: '+91 98765 43212' 
        },
        { 
            id: 'STU104', 
            name: 'Sneha Reddy', 
            room: '205', 
            bed: 'Bed 1', 
            block: 'Block B', 
            roomType: 'Triple Sharing Non-AC', 
            roommates: ['Ananya Verma'],
            department: 'Civil Engg', 
            year: '1st Year',
            phone: '+91 98765 43213' 
        }
    ]);

    const [currentStudentId, setCurrentStudentId] = useState('STU101');
    const currentStudent = students.find(s => s.id === currentStudentId) || students[0];

    // Weekly Mess Menu (Admin Editable)
    const [weeklyMenu, setWeeklyMenu] = useState([
        {
            day: 'Monday',
            breakfast: 'Crispy Idli, Sambhar, Coconut Chutney & Hot Filter Coffee/Tea',
            lunch: 'Rajma Masala, Steamed Basmati Rice, Butter Chapati, Fresh Curd & Cucumber Salad',
            snacks: 'Crispy Samosa, Mint Chutney & Chai',
            dinner: 'Aloo Gobi Dry, Dal Tadka, Tandoori Roti, Jeera Rice, Green Salad, Papad & Hot Gulab Jamun Dessert',
            type: 'Veg'
        },
        {
            day: 'Tuesday',
            breakfast: 'Puri Bhaji, Fresh Banana & Hot Milk/Tea',
            lunch: 'Kadai Paneer, Veg Pulao, Butter Chapati & Boondi Raita',
            snacks: 'Veg Cutlet, Ketchup & Tea',
            dinner: 'Egg Curry / Shahi Paneer Gravy, Yellow Dal Fry, Phulka Roti, Steamed Rice, Onion Salad & Rasgulla Dessert',
            type: 'Egg/Veg'
        },
        {
            day: 'Wednesday',
            breakfast: 'Stuffed Aloo Paratha, Fresh Curd, Mixed Pickle & Tea/Coffee',
            lunch: 'Chicken Gravy / Paneer Butter Masala, Saffron Rice, Butter Roti & Garden Salad',
            snacks: 'Bread Pakora & Hot Chai',
            dinner: 'Mix Veg Handi, Dal Makhani, Tandoori Naan, Steamed Rice, Green Salad, Papad & Rice Kheer Dessert',
            type: 'NonVeg'
        },
        {
            day: 'Thursday',
            breakfast: 'Masala Dosa, Spicy Sambhar & Peanut Chutney',
            lunch: 'Delhi Style Chole Bhature, Masala Chass & Onion Salad',
            snacks: 'Bhel Puri & Cold Coffee',
            dinner: 'Sev Tamatar Sabzi, Dal Fry, Whole Wheat Chapati, Steamed Rice, Salad, Pickle & Moong Dal Halwa Dessert',
            type: 'Veg'
        },
        {
            day: 'Friday',
            breakfast: 'Indori Poha, Jalebi, Boiled Sprouts & Tea/Coffee',
            lunch: 'Special Veg Biryani, Mirchi Ka Salan, Onion Raita & Papad',
            snacks: 'Peri Peri French Fries & Hot Tea',
            dinner: 'Hyderabadi Chicken Biryani / Malai Kofta Curry, Gravy, Butter Naan, Salad, Raitha & Chocolate Ice Cream Dessert',
            type: 'NonVeg'
        },
        {
            day: 'Saturday',
            breakfast: 'Onion Uttapam, Tomato Chutney & Tea/Coffee',
            lunch: 'Rajasthani Dal Baati Churma, Gatte Ki Sabzi & Spicy Buttermilk',
            snacks: 'Mumbai Pav Bhaji & Hot Tea',
            dinner: 'Bhindi Masala Fry, Panchmel Dal, Whole Wheat Roti, Steamed Rice, Salad, Chutney & Fruit Custard Dessert',
            type: 'Veg'
        },
        {
            day: 'Sunday',
            breakfast: 'Chana Puri, Sooji Halwa & Milk/Tea',
            lunch: 'Sunday Feast: Butter Chicken / Shahi Paneer Tikka, Garlic Naan, Fried Rice & Rasmalai Dessert',
            snacks: 'Cream Biscuits & Tea',
            dinner: 'Special Khichdi, Gujarati Kadhi, Roasted Papad, Garlic Chutney & Fresh Seasonal Fruits',
            type: 'NonVeg'
        }
    ]);

    // Initial Mess Cuts
    const [messCuts, setMessCuts] = useState([
        {
            id: 'MC-1001',
            studentId: 'STU101',
            studentName: 'Rahul Sharma',
            roomNumber: '102',
            startDate: '2026-10-10',
            endDate: '2026-10-19',
            totalDays: 10,
            reason: 'Diwali Festival Break & Home Visit',
            status: 'Approved',
            isEligibleForDiscount: true,
            reductionAmount: 1000,
            appliedAt: '2026-10-01'
        }
    ]);

    // Hostel Announcements State
    const [announcements, setAnnouncements] = useState([
        {
            id: 'ANC-101',
            title: '🎉 Special Diwali Festival Feast Announced!',
            content: 'Central Hostel Mess will serve a special festive dinner on Oct 20 featuring Paneer Butter Masala, Gulab Jamun, and Ice Cream. All residents welcome!',
            category: 'Festival Feast',
            postedBy: 'Hostel Warden',
            date: '2026-10-01'
        },
        {
            id: 'ANC-102',
            title: '⏰ October Mess Bill Payment Deadline Reminder',
            content: 'Please pay your monthly mess subscription before Oct 10th to avoid the ₹5/day late fine. Pay online via UPI or NetBanking.',
            category: 'Mess Notice',
            postedBy: 'Warden Office',
            date: '2026-10-01'
        }
    ]);

    // Student Complaints State
    const [complaints, setComplaints] = useState([
        {
            id: 'CMP-201',
            studentId: 'STU101',
            studentName: 'Rahul Sharma',
            roomNumber: '102',
            category: 'Food Quality',
            subject: 'Request for Less Oil in Evening Snacks',
            description: 'The samosa served yesterday had extra oil. Kindly instruct the mess team to use less oil.',
            status: 'In Progress',
            adminResponse: 'Instructed head chef Ramesh to optimize frying temperature and reduce oil retention.',
            createdAt: '2026-10-01'
        }
    ]);

    // Attendance Records
    const [attendanceRecords, setAttendanceRecords] = useState({
        '2026-10-01': {
            'STU101': { hostel: 'Present', food: { breakfast: true, lunch: true, snacks: true, dinner: true } },
            'STU102': { hostel: 'Present', food: { breakfast: true, lunch: true, snacks: false, dinner: true } }
        }
    });

    // Mess Team Logs
    const [messTeamLogs, setMessTeamLogs] = useState([
        {
            id: 'LOG-501',
            date: '2026-10-01',
            meal: 'Dinner',
            totalCount: 115,
            vegCount: 88,
            nonVegCount: 27,
            recordedBy: 'Head Chef Ramesh',
            notes: 'Night dinner service completed. Required count provided by Warden.'
        }
    ]);

    // Payment History
    const [paymentHistory, setPaymentHistory] = useState([
        {
            id: 'PAY-901',
            studentId: 'STU101',
            studentName: 'Rahul Sharma',
            month: 'September 2026',
            baseMonthlyFee: 3000,
            roomRent: 0,
            messCutDeduction: 500,
            lateFine: 0,
            netPaid: 2500,
            paidAt: '2026-09-08 11:30 AM',
            transactionId: 'TXN-984210',
            paymentMethod: 'UPI'
        }
    ]);

    const [currentPaidBills, setCurrentPaidBills] = useState({});

    // Toast State
    const [toast, setToast] = useState(null);
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // Authentication Handlers
    const loginUser = (role, studentId = 'STU101') => {
        setUserRole(role);
        if (role === 'student') setCurrentStudentId(studentId);
        setIsLoggedIn(true);
        showToast(`Signed in successfully as ${role === 'student' ? 'Student' : role === 'admin' ? 'Hostel Warden' : 'Mess Kitchen Team'}!`, 'success');
    };

    const logoutUser = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        showToast('Logged out of portal.', 'info');
    };

    // Room Allocation Handler (Admin Only)
    const updateRoomAllocation = (studentId, roomData) => {
        setStudents(prev => prev.map(s => s.id === studentId ? { ...s, ...roomData } : s));
        showToast(`Room allocation updated for ${studentId}!`, 'success');
    };

    const addStudent = (newStudentData) => {
        setStudents(prev => [...prev, newStudentData]);
        showToast(`New student resident added and room allocated!`, 'success');
    };

    // Menu Customizer Handler (Admin Only)
    const updateMenuDay = (dayName, updatedFields) => {
        setWeeklyMenu(prev => prev.map(m => m.day === dayName ? { ...m, ...updatedFields } : m));
        showToast(`Updated menu for ${dayName}! Mess team count updated automatically.`, 'success');
    };

    // Announcement Handlers
    const addAnnouncement = ({ title, content, category }) => {
        const newAnc = {
            id: `ANC-${Date.now().toString().slice(-4)}`,
            title,
            content,
            category: category || 'General',
            postedBy: 'Hostel Warden',
            date: new Date().toISOString().split('T')[0]
        };
        setAnnouncements(prev => [newAnc, ...prev]);
        showToast('New announcement published to student portal!', 'success');
    };

    // Complaint Handlers
    const addComplaint = ({ category, subject, description }) => {
        const newCmp = {
            id: `CMP-${Date.now().toString().slice(-4)}`,
            studentId: currentStudent.id,
            studentName: currentStudent.name,
            roomNumber: currentStudent.room,
            category,
            subject,
            description,
            status: 'Pending',
            adminResponse: '',
            createdAt: new Date().toISOString().split('T')[0]
        };
        setComplaints(prev => [newCmp, ...prev]);
        showToast('Complaint submitted to Hostel Warden office.', 'success');
    };

    const updateComplaintStatus = (id, status, adminResponse) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, status, adminResponse } : c));
        showToast(`Complaint status updated to ${status}!`, 'info');
    };

    // Day calculation
    const calculateDays = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return 0;
        return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
    };

    // Mess Cut Application
    const applyMessCut = ({ startDate, endDate, reason }) => {
        const totalDays = calculateDays(startDate, endDate);
        if (totalDays <= 0) return false;

        const isEligibleForDiscount = totalDays >= minContinuousDays;
        const reductionAmount = isEligibleForDiscount ? Math.round((monthlyFee / 30) * totalDays) : 0;

        const newCut = {
            id: `MC-${Date.now().toString().slice(-4)}`,
            studentId: currentStudent.id,
            studentName: currentStudent.name,
            roomNumber: currentStudent.room,
            startDate,
            endDate,
            totalDays,
            reason: reason || 'Personal Leave',
            status: 'Pending',
            isEligibleForDiscount,
            reductionAmount,
            appliedAt: new Date().toISOString().split('T')[0]
        };

        setMessCuts(prev => [newCut, ...prev]);
        showToast(isEligibleForDiscount ? `Mess cut applied! Eligible for ₹${reductionAmount} discount once approved.` : `Mess cut applied (${totalDays} days). Less than 7 days continuous rule = ₹0 discount.`, isEligibleForDiscount ? 'success' : 'warning');
        return true;
    };

    const updateMessCutStatus = (id, newStatus) => {
        setMessCuts(prev => prev.map(cut => cut.id === id ? { ...cut, status: newStatus } : cut));
        showToast(`Mess cut status updated to ${newStatus}.`, 'info');
    };

    // Bill Calculation
    const getStudentBill = (studentId) => {
        const studentCuts = messCuts.filter(c => c.studentId === studentId && c.status === 'Approved' && c.isEligibleForDiscount);
        const messCutDeduction = studentCuts.reduce((acc, c) => acc + c.reductionAmount, 0);
        const netBeforeFine = Math.max(0, monthlyFee - messCutDeduction);

        const today = new Date();
        const currentDay = today.getDate();
        const isPaid = !!currentPaidBills[studentId];

        let overdueDays = 0;
        let lateFine = 0;

        if (!isPaid && currentDay > paymentDeadlineDay) {
            overdueDays = currentDay - paymentDeadlineDay;
            lateFine = overdueDays * lateFinePerDay;
        }

        const netPayable = netBeforeFine + lateFine;

        return {
            studentId,
            baseMonthlyFee: monthlyFee,
            roomRent: 0,
            approvedCutsCount: studentCuts.length,
            messCutDeduction,
            netBeforeFine,
            paymentDeadlineDay,
            lateFinePerDay,
            overdueDays,
            lateFine,
            netPayable,
            isPaid,
            paymentDetails: currentPaidBills[studentId] || null
        };
    };

    const payBill = (studentId, method = 'UPI', transactionId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`) => {
        const bill = getStudentBill(studentId);
        const stu = students.find(s => s.id === studentId) || currentStudent;
        const now = new Date().toLocaleString();

        const paymentRecord = {
            id: `PAY-${Date.now().toString().slice(-4)}`,
            studentId,
            studentName: stu.name,
            month: 'October 2026',
            baseMonthlyFee: bill.baseMonthlyFee,
            roomRent: 0,
            messCutDeduction: bill.messCutDeduction,
            lateFine: bill.lateFine,
            netPaid: bill.netPayable,
            paidAt: now,
            transactionId,
            paymentMethod: method
        };

        setCurrentPaidBills(prev => ({ ...prev, [studentId]: paymentRecord }));
        setPaymentHistory(prev => [paymentRecord, ...prev]);
        showToast(`Payment of ₹${bill.netPayable} completed successfully!`, 'success');
    };

    // Attendance Update
    const updateAttendance = (date, studentId, hostelStatus, foodAttendance) => {
        setAttendanceRecords(prev => ({
            ...prev,
            [date]: {
                ...prev[date],
                [studentId]: { hostel: hostelStatus, food: foodAttendance }
            }
        }));
        showToast('Attendance updated successfully.', 'success');
    };

    // Mess Team Count Entry
    const recordMessTeamCount = (logEntry) => {
        const newLog = {
            id: `LOG-${Date.now().toString().slice(-4)}`,
            date: logEntry.date || new Date().toISOString().split('T')[0],
            meal: logEntry.meal,
            totalCount: Number(logEntry.totalCount),
            vegCount: Number(logEntry.vegCount),
            nonVegCount: Number(logEntry.nonVegCount),
            recordedBy: logEntry.recordedBy || 'Head Chef',
            notes: logEntry.notes || 'Serving log recorded'
        };
        setMessTeamLogs(prev => [newLog, ...prev]);
        showToast(`Mess team logged ${logEntry.totalCount} plates served for ${logEntry.meal}!`, 'success');
    };

    // Kitchen Forecast
    const getKitchenForecast = () => {
        const totalCapacity = 120;
        const today = new Date().toISOString().split('T')[0];
        const absentToday = messCuts.filter(c => 
            c.status === 'Approved' && 
            c.startDate <= today && 
            c.endDate >= today
        ).length;
        const activeCount = Math.max(0, totalCapacity - absentToday);

        return {
            totalCapacity,
            absentToday,
            expectedAttendance: activeCount,
            meals: {
                breakfast: Math.round(activeCount * 0.92),
                lunch: activeCount,
                eveningSnacks: Math.round(activeCount * 0.85),
                dinner: activeCount
            }
        };
    };

    return (
        <MessContext.Provider value={{
            monthlyFee,
            setMonthlyFee,
            minContinuousDays,
            setMinContinuousDays,
            roomRent,
            paymentDeadlineDay,
            setPaymentDeadlineDay,
            lateFinePerDay,
            setLateFinePerDay,
            isLoggedIn,
            userRole,
            loginUser,
            logoutUser,
            students,
            currentStudent,
            setCurrentStudentId,
            updateRoomAllocation,
            addStudent,
            weeklyMenu,
            updateMenuDay,
            messCuts,
            applyMessCut,
            updateMessCutStatus,
            calculateDays,
            getStudentBill,
            payBill,
            announcements,
            addAnnouncement,
            complaints,
            addComplaint,
            updateComplaintStatus,
            paymentHistory,
            attendanceRecords,
            updateAttendance,
            messTeamLogs,
            recordMessTeamCount,
            getKitchenForecast,
            toast,
            showToast
        }}>
            {children}
        </MessContext.Provider>
    );
};
