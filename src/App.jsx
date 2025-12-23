import React, { useState, useMemo } from 'react';
import {
    LayoutDashboard,
    Package,
    Search,
    Filter,
    Plus,
    MoreVertical,
    FileText,
    Settings,
    AlertCircle,
    CheckCircle2,
    Wrench,
    Archive,
    Menu,
    X,
    BarChart3,
    PieChart,
    MapPin,
    User,
    Bell,
    Database,
    Save,
    Shield,
    LogOut,
    Globe
} from 'lucide-react';

// --- 1. Mock Data (จำลองจากไฟล์ CSV เดิม) ---
const INITIAL_DATA = [
    { id: 1, code: 'A003-09-04-2557', name: 'HP Envy Touch Smart 20-d106d', brand: 'HP', serial: '5CM40301RX', price: 26990, location: 'เคาน์เตอร์การเงิน ช่อง 1', status: 'Normal', purchaseDate: '2014-04-09', category: 'Computer' },
    { id: 2, code: 'A004-09-04-2557', name: 'HP Envy Touch Smart 20-d106d', brand: 'HP', serial: '5CM40301SS', price: 26990, location: 'เคาน์เตอร์ประชาสัมพันธ์', status: 'Normal', purchaseDate: '2014-04-09', category: 'Computer' },
    { id: 3, code: 'X006-22-02-2564', name: 'Air Purifier 3H', brand: 'Xiaomi', serial: '2860100008560', price: 7490, location: 'ฝ่ายเทคโนโลยีสารสนเทศ', status: 'Normal', purchaseDate: '2021-02-22', category: 'Appliance' },
    { id: 4, code: 'X007-08-07-2564', name: 'Air Purifier KJ1000F-A03', brand: 'AWAC', serial: 'MPO100035', price: 16050, location: 'กำแพงแสน', status: 'Repair', purchaseDate: '2021-07-08', category: 'Appliance' },
    { id: 5, code: 'X008-08-07-2564', name: 'Air Purifier KJ1000F-A03', brand: 'AWAC', serial: 'MPO100033', price: 16050, location: 'หน้าเคาน์เตอร์สินเชื่อ', status: 'Normal', purchaseDate: '2021-07-08', category: 'Appliance' },
    { id: 6, code: 'A010-15-11-2560', name: 'Printer LaserJet Pro', brand: 'HP', serial: 'VNC30221', price: 12500, location: 'ห้องบัญชี', status: 'Disposed', purchaseDate: '2017-11-15', category: 'Peripheral' },
    { id: 7, code: 'X009-08-07-2564', name: 'Air Purifier KJ1000F-A03', brand: 'AWAC', serial: 'MPO100047', price: 16050, location: 'บริหารทั่วไป', status: 'Check', purchaseDate: '2021-07-08', category: 'Appliance' },
    { id: 8, code: 'A012-01-02-2565', name: 'iPad Air 5', brand: 'Apple', serial: 'HXC9982M', price: 23900, location: 'ผู้จัดการ', status: 'Normal', purchaseDate: '2022-02-01', category: 'Tablet' },
];

// --- 2. Helper Components ---

const StatusBadge = ({ status }) => {
    const styles = {
        Normal: 'bg-green-100 text-green-700 border-green-200',
        Repair: 'bg-orange-100 text-orange-700 border-orange-200',
        Disposed: 'bg-gray-100 text-gray-700 border-gray-200',
        Check: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    const labels = {
        Normal: 'ปกติ',
        Repair: 'รอซ่อม',
        Disposed: 'จำหน่ายออก',
        Check: 'รอตรวจสอบ'
    };

    const icons = {
        Normal: <CheckCircle2 className="w-3 h-3 mr-1" />,
        Repair: <Wrench className="w-3 h-3 mr-1" />,
        Disposed: <Archive className="w-3 h-3 mr-1" />,
        Check: <AlertCircle className="w-3 h-3 mr-1" />
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.Normal}`}>
            {icons[status]}
            {labels[status]}
        </span>
    );
};

const StatCard = ({ title, value, subtext, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
            <div className={`p-3 rounded-lg ${colorClass}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    </div>
);

// --- 3. Sub-Views (Reports & Settings) ---

const ReportsView = ({ data }) => {
    // คำนวณข้อมูลสำหรับรายงาน
    const summaryByCategory = useMemo(() => {
        const groups = {};
        let maxVal = 0;
        data.forEach(item => {
            if (!groups[item.category]) groups[item.category] = { count: 0, value: 0 };
            groups[item.category].count += 1;
            groups[item.category].value += item.price;
            if (groups[item.category].value > maxVal) maxVal = groups[item.category].value;
        });
        return { groups, maxVal };
    }, [data]);

    const summaryByLocation = useMemo(() => {
        const groups = {};
        data.forEach(item => {
            const loc = item.location || 'ไม่ระบุ';
            if (!groups[loc]) groups[loc] = 0;
            groups[loc] += 1;
        });
        // Convert to array and sort by count
        return Object.entries(groups).sort((a, b) => b[1] - a[1]);
    }, [data]);

    const maintenanceList = useMemo(() => {
        return data.filter(item => ['Repair', 'Check'].includes(item.status));
    }, [data]);

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">รายงานสรุปผล</h2>
                <p className="text-gray-500">วิเคราะห์ข้อมูลงบประมาณและสถานะครุภัณฑ์</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Category Value Report */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <PieChart className="w-5 h-5 mr-2 text-blue-500" />
                            มูลค่าตามหมวดหมู่
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {Object.entries(summaryByCategory.groups).map(([cat, info]) => (
                            <div key={cat} className="group">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{cat}</span>
                                    <span className="text-gray-900 font-mono">
                                        {info.value.toLocaleString()} บาท ({info.count} รายการ)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out group-hover:bg-blue-600"
                                        style={{ width: `${(info.value / summaryByCategory.maxVal) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Location Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
                            การกระจายตัวตามสถานที่
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {summaryByLocation.map(([loc, count], index) => (
                            <div key={loc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mr-3">
                                        {index + 1}
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium">{loc}</span>
                                </div>
                                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Action Required Report */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-orange-50/50 flex justify-between items-center">
                    <h3 className="font-semibold text-orange-800 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        รายการที่ต้องดำเนินการ (แจ้งซ่อม/รอตรวจสอบ)
                    </h3>
                    <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        {maintenanceList.length} รายการ
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                            <tr>
                                <th className="px-6 py-3">รหัสครุภัณฑ์</th>
                                <th className="px-6 py-3">รายการ</th>
                                <th className="px-6 py-3">สถานที่</th>
                                <th className="px-6 py-3">สถานะ</th>
                                <th className="px-6 py-3 text-right">ดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {maintenanceList.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm text-blue-600">{item.code}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {item.name}
                                        <div className="text-xs text-gray-500">{item.brand}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                                            เปิดใบงานซ่อม
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {maintenanceList.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-400">
                                        <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                                        ไม่มีรายการที่ต้องดำเนินการในขณะนี้
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const SettingsView = () => {
    const [fiscalYear, setFiscalYear] = useState('2567');
    const [notifEnabled, setNotifEnabled] = useState(true);

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto w-full space-y-6">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">การตั้งค่าระบบ</h2>
                    <p className="text-gray-500">กำหนดค่าการใช้งานพื้นฐานและจัดการข้อมูล</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm">
                    <Save className="w-4 h-4 mr-2" />
                    บันทึกการเปลี่ยนแปลง
                </button>
            </div>

            {/* 1. General Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-blue-500" />
                        ตั้งค่าทั่วไป
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อหน่วยงาน</label>
                            <input type="text" defaultValue="มหาวิทยาลัยเกษตรศาสตร์" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ปีงบประมาณปัจจุบัน</label>
                            <select
                                value={fiscalYear}
                                onChange={(e) => setFiscalYear(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
                            >
                                <option value="2568">2568</option>
                                <option value="2567">2567</option>
                                <option value="2566">2566</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Notifications & Security */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-emerald-500" />
                        ความปลอดภัยและการแจ้งเตือน
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <Bell className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">แจ้งเตือนการซ่อมบำรุง</p>
                                <p className="text-xs text-gray-500">แจ้งเตือนเมื่อครุภัณฑ์ครบกำหนดตรวจสอบประจำปี</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={notifEnabled} onChange={() => setNotifEnabled(!notifEnabled)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">เปลี่ยนรหัสผ่านผู้ดูแลระบบ</button>
                    </div>
                </div>
            </div>

            {/* 3. Data Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                        <Database className="w-5 h-5 mr-2 text-purple-500" />
                        จัดการฐานข้อมูล
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                            <FileText className="w-4 h-4 mr-2" />
                            ส่งออกข้อมูล (CSV)
                        </button>
                        <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                            <Database className="w-4 h-4 mr-2" />
                            สำรองข้อมูล (Backup)
                        </button>
                    </div>
                    <div className="pt-2">
                        <p className="text-xs text-gray-400 text-center">สำรองข้อมูลล่าสุด: 17 ส.ค. 2565 โดย Admin</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-4">
                <button className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium">
                    <LogOut className="w-4 h-4 mr-2" />
                    ออกจากระบบ
                </button>
            </div>

        </div>
    );
};

// --- 4. Main Application Component ---

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Logic การคำนวณและกรองข้อมูล
    const filteredAssets = useMemo(() => {
        return INITIAL_DATA.filter(asset => {
            const matchesSearch =
                asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === 'All' || asset.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, filterStatus]);

    const stats = useMemo(() => {
        const totalValue = INITIAL_DATA.reduce((sum, item) => sum + item.price, 0);
        const normalCount = INITIAL_DATA.filter(i => i.status === 'Normal').length;
        const repairCount = INITIAL_DATA.filter(i => i.status === 'Repair').length;

        return {
            totalAssets: INITIAL_DATA.length,
            totalValue: totalValue.toLocaleString('th-TH', { style: 'currency', currency: 'THB' }),
            normalCount,
            repairCount
        };
    }, []);

    const navItems = [
        { id: 'dashboard', label: 'ภาพรวมระบบ', icon: LayoutDashboard },
        { id: 'assets', label: 'ทะเบียนครุภัณฑ์', icon: Package },
        { id: 'reports', label: 'รายงาน', icon: BarChart3 },
        { id: 'settings', label: 'ตั้งค่า', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row">

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">AssetTrack</h1>
                        <p className="text-xs text-slate-400 mt-1">ระบบบริหารพัสดุ</p>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-6 bg-slate-900 border-t border-slate-800">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                            AD
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">Admin User</p>
                            <p className="text-xs text-slate-500">เจ้าหน้าที่พัสดุ</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto h-screen flex flex-col">

                {/* Mobile Header */}
                <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center sticky top-0 z-10">
                    <span className="font-bold text-slate-800">AssetTrack System</span>
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600">
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">Dashboard ภาพรวม</h2>
                            <p className="text-gray-500">ข้อมูลสถานะครุภัณฑ์ล่าสุดประจำปีงบประมาณ 2567</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard
                                title="ครุภัณฑ์ทั้งหมด"
                                value={stats.totalAssets}
                                subtext="รายการ"
                                icon={Package}
                                colorClass="bg-blue-500"
                            />
                            <StatCard
                                title="มูลค่ารวม"
                                value={stats.totalValue}
                                subtext="ราคาทุนสะสม"
                                icon={FileText}
                                colorClass="bg-emerald-500"
                            />
                            <StatCard
                                title="ใช้งานปกติ"
                                value={stats.normalCount}
                                subtext="รายการ"
                                icon={CheckCircle2}
                                colorClass="bg-indigo-500"
                            />
                            <StatCard
                                title="แจ้งซ่อม/ชำรุด"
                                value={stats.repairCount}
                                subtext="รายการที่ต้องดำเนินการ"
                                icon={AlertCircle}
                                colorClass="bg-orange-500"
                            />
                        </div>

                        {/* Recent Activity Table (Mock) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800">รายการเคลื่อนไหวล่าสุด</h3>
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">ดูทั้งหมด</button>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b border-dashed border-gray-100 last:border-0">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                                    <LayoutDashboard className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">ตรวจนับประจำปี: {INITIAL_DATA[i]?.code}</p>
                                                    <p className="text-xs text-gray-500">โดย: เจ้าหน้าที่ตรวจสอบ {i}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">2 ชั่วโมงที่แล้ว</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Asset Registry View */}
                {activeTab === 'assets' && (
                    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full h-full flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">ทะเบียนครุภัณฑ์</h2>
                                <p className="text-gray-500">จัดการข้อมูลทรัพย์สินและประวัติการซ่อมบำรุง</p>
                            </div>
                            <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                <Plus className="w-4 h-4 mr-2" />
                                เพิ่มรายการใหม่
                            </button>
                        </div>

                        {/* Filters Toolbar */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="ค้นหาตาม รหัส, ชื่อ, หรือสถานที่..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                <div className="flex items-center space-x-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                                    <Filter className="w-4 h-4 text-gray-500 ml-2" />
                                    {['All', 'Normal', 'Repair', 'Disposed'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setFilterStatus(status)}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filterStatus === status
                                                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                                                    : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {status === 'All' ? 'ทั้งหมด' : status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            </th>
                                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">รหัสครุภัณฑ์</th>
                                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">รายละเอียด</th>
                                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">สถานที่ตั้ง</th>
                                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ราคา (บาท)</th>
                                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">สถานะ</th>
                                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredAssets.length > 0 ? (
                                            filteredAssets.map((asset) => (
                                                <tr key={asset.id} className="hover:bg-gray-50 transition-colors group">
                                                    <td className="p-4">
                                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-mono text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{asset.code}</span>
                                                        <div className="text-xs text-gray-400 mt-1">S/N: {asset.serial}</div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="font-medium text-gray-900">{asset.name}</div>
                                                        <div className="text-xs text-gray-500">{asset.brand} • {asset.category}</div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            {asset.location}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-mono text-sm text-gray-700">
                                                        {asset.price.toLocaleString()}
                                                    </td>
                                                    <td className="p-4">
                                                        <StatusBadge status={asset.status} />
                                                    </td>
                                                    <td className="p-4">
                                                        <button className="p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="p-12 text-center text-gray-400">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <Search className="w-12 h-12 mb-4 text-gray-200" />
                                                        <p>ไม่พบข้อมูลที่ค้นหา</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between items-center mt-auto">
                                <span>แสดง {filteredAssets.length} รายการ จากทั้งหมด {INITIAL_DATA.length} รายการ</span>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>ก่อนหน้า</button>
                                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50">ถัดไป</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reports View */}
                {activeTab === 'reports' && (
                    <ReportsView data={INITIAL_DATA} />
                )}

                {/* Settings View */}
                {activeTab === 'settings' && (
                    <SettingsView />
                )}

            </main>
        </div>
    );
}
