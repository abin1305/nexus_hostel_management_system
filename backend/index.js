const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb+srv://yabin449_db_user:QSU208Iv96ZJ9r2E@cluster0.xjofaeg.mongodb.net/ecommerse').then(() => {
    console.log("MongoDB connected successfully.");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Default root endpoint
app.get("/", (req, res) => {
    res.json({ message: "Hostel Mess Management & Portal API Server is running", status: "Active" });
});

// Image storage setup
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));

// -------------------------------------------------------------
// SCHEMAS
// -------------------------------------------------------------

const MessSettingsSchema = new mongoose.Schema({
    monthlyFee: { type: Number, default: 3000 },
    minContinuousDays: { type: Number, default: 7 },
    roomRent: { type: Number, default: 0 },
    paymentDeadlineDay: { type: Number, default: 10 },
    lateFinePerDay: { type: Number, default: 5 }
});
const MessSettings = mongoose.model("MessSettings", MessSettingsSchema);

// Room Allocation Schema
const RoomAllocationSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    bedNumber: { type: String, required: true },
    blockName: { type: String, default: "Block A" },
    roomType: { type: String, default: "Non-AC Double Sharing" },
    roommates: [{ type: String }],
    roomRentCharge: { type: Number, default: 0 } // STRICTLY 0
});
const RoomAllocation = mongoose.model("RoomAllocation", RoomAllocationSchema);

// Announcement Schema
const AnnouncementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "General" }, // "Mess Notice", "Festival Feast", "Maintenance", "General"
    postedBy: { type: String, default: "Hostel Warden" },
    date: { type: Date, default: Date.now }
});
const Announcement = mongoose.model("Announcement", AnnouncementSchema);

// Complaint Schema
const ComplaintSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    category: { type: String, required: true }, // "Food Quality", "Hygiene", "Room Maintenance", "Billing", "Other"
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
    adminResponse: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});
const Complaint = mongoose.model("Complaint", ComplaintSchema);

// Mess Cut Schema
const MessCutSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    isEligibleForDiscount: { type: Boolean, default: false },
    reductionAmount: { type: Number, default: 0 },
    appliedAt: { type: Date, default: Date.now }
});
const MessCut = mongoose.model("MessCut", MessCutSchema);

// Payment Ledger Schema
const PaymentLedgerSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    month: { type: String, required: true },
    baseMonthlyFee: { type: Number, required: true },
    roomRent: { type: Number, default: 0 },
    messCutDeduction: { type: Number, default: 0 },
    lateFine: { type: Number, default: 0 },
    overdueDays: { type: Number, default: 0 },
    netPaid: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, default: "UPI" },
    transactionId: { type: String, required: true }
});
const PaymentLedger = mongoose.model("PaymentLedger", PaymentLedgerSchema);

// -------------------------------------------------------------
// ENDPOINTS
// -------------------------------------------------------------

// 1. Announcements Endpoints
app.get('/api/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ date: -1 });
        res.json({ success: true, announcements });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/announcement/add', async (req, res) => {
    try {
        const { title, content, category, postedBy } = req.body;
        const announcement = new Announcement({ title, content, category, postedBy });
        await announcement.save();
        res.json({ success: true, announcement, message: "Announcement published successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. Complaints Endpoints
app.get('/api/complaints', async (req, res) => {
    try {
        const { studentId } = req.query;
        let query = {};
        if (studentId) query.studentId = studentId;
        const complaints = await Complaint.find(query).sort({ createdAt: -1 });
        res.json({ success: true, complaints });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/complaint/create', async (req, res) => {
    try {
        const { studentId, studentName, roomNumber, category, subject, description } = req.body;
        const complaint = new Complaint({ studentId, studentName, roomNumber, category, subject, description });
        await complaint.save();
        res.json({ success: true, complaint, message: "Complaint submitted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/complaint/update-status', async (req, res) => {
    try {
        const { id, status, adminResponse } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(
            id, 
            { status, adminResponse }, 
            { new: true }
        );
        res.json({ success: true, complaint, message: `Complaint status updated to ${status}` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. Room Allocation Management Endpoints (Admin Only)
app.post('/api/room/allocate', async (req, res) => {
    try {
        const { studentId, studentName, roomNumber, bedNumber, blockName, roomType, roommates } = req.body;
        let allocation = await RoomAllocation.findOne({ studentId });
        if (!allocation) {
            allocation = new RoomAllocation({ studentId, studentName, roomNumber, bedNumber, blockName, roomType, roommates });
        } else {
            allocation.roomNumber = roomNumber;
            allocation.bedNumber = bedNumber;
            allocation.blockName = blockName;
            allocation.roomType = roomType;
            allocation.roommates = roommates;
        }
        await allocation.save();
        res.json({ success: true, allocation, message: "Room allocation saved successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(port, (error) => {
    if (error) console.log(error);
    console.log(`Hostel Portal API running on port ${port}`);
});
