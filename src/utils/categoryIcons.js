import React from 'react';
import {
    Monitor,
    Printer,
    Sofa,
    Speaker,
    Tablet,
    HardDrive,
    Keyboard,
    Mouse,
    Headphones,
    Camera,
    Video,
    Laptop,
    Package,
    Box,
    FileText,
    Image as ImageIcon,
    Folder,
    Database,
    Server,
    Wifi,
    Smartphone,
    Watch,
    Gamepad2,
    Mic,
    Tv,
    Radio,
    Car,
    Building2,
    Hammer,
    Wrench,
    Palette,
    Music,
    Clock,
    Lightbulb,
    Fan,
    AirVent,
    Lamp,
    Book,
    Archive,
    Calculator,
    Thermometer
} from 'lucide-react';

/**
 * Icon mapping จากชื่อ icon ไปยัง component
 */
const iconMap = {
    Monitor,
    Printer,
    Sofa,
    Speaker,
    Tablet,
    HardDrive,
    Keyboard,
    Mouse,
    Headphones,
    Camera,
    Video,
    Laptop,
    Package,
    Box,
    FileText,
    ImageIcon,
    Folder,
    Database,
    Server,
    Wifi,
    Smartphone,
    Watch,
    Gamepad2,
    Mic,
    Tv,
    Radio,
    Car,
    Building2,
    Hammer,
    Wrench,
    Palette,
    Music,
    Clock,
    Lightbulb,
    Fan,
    AirVent,
    Lamp,
    Book,
    Archive,
    Calculator,
    Thermometer
};

/**
 * Get icon component from icon name (from database)
 * @param {string} iconName - Icon name from database (e.g., 'Monitor', 'Printer')
 * @returns {React.Component} Icon component from lucide-react
 */
export const getIconByName = (iconName) => {
    if (!iconName) return Package;
    
    // แปลงชื่อ icon เป็น component
    const IconComponent = iconMap[iconName];
    return IconComponent || Package;
};

/**
 * Get icon component for asset category
 * @param {string} category - Category name
 * @param {string} iconName - Icon name from database (optional, takes priority)
 * @returns {React.Component} Icon component from lucide-react
 */
export const getCategoryIcon = (category, iconName = null) => {
    // ถ้ามี icon_name จาก database ให้ใช้ก่อน
    if (iconName) {
        return getIconByName(iconName);
    }
    
    if (!category) return Package;

    const categoryLower = category.toLowerCase();

    // Computer related
    if (categoryLower.includes('คอมพิวเตอร์') || categoryLower.includes('computer') || categoryLower.includes('pc')) {
        return Monitor;
    }
    if (categoryLower.includes('laptop') || categoryLower.includes('โน้ตบุ๊ค')) {
        return Laptop;
    }
    if (categoryLower.includes('tablet') || categoryLower.includes('แท็บเล็ต')) {
        return Tablet;
    }

    // Printer & Scanner
    if (categoryLower.includes('printer') || categoryLower.includes('เครื่องพิมพ์') || categoryLower.includes('เครื่องสแกน')) {
        return Printer;
    }

    // Monitor & Display
    if (categoryLower.includes('monitor') || categoryLower.includes('จอภาพ') || categoryLower.includes('หน้าจอ')) {
        return Monitor;
    }

    // Audio & Speaker
    if (categoryLower.includes('เครื่องเสียง') || categoryLower.includes('speaker') || categoryLower.includes('ลำโพง')) {
        return Speaker;
    }
    if (categoryLower.includes('headphone') || categoryLower.includes('หูฟัง')) {
        return Headphones;
    }
    if (categoryLower.includes('mic') || categoryLower.includes('ไมโครโฟน')) {
        return Mic;
    }

    // Camera & Video
    if (categoryLower.includes('camera') || categoryLower.includes('กล้อง')) {
        return Camera;
    }
    if (categoryLower.includes('video') || categoryLower.includes('วีดีโอ') || categoryLower.includes('cctv')) {
        return Video;
    }

    // Furniture
    if (categoryLower.includes('โต๊ะ') || categoryLower.includes('table') || categoryLower.includes('desk')) {
        return FileText;
    }
    if (categoryLower.includes('ปรับสมุด')) {
        return Book;
    }
    if (categoryLower.includes('เก้าอี้') || categoryLower.includes('chair')) {
        return Sofa;
    }
    if (categoryLower.includes('ตู้') || categoryLower.includes('cabinet') || categoryLower.includes('shelf') || categoryLower.includes('ตู้เก็บเอกสาร')) {
        return Archive;
    }
    if (categoryLower.includes('ตู้เย็น') || categoryLower.includes('refrigerator')) {
        return Thermometer;
    }
    if (categoryLower.includes('ถังต้มน้ำ') || categoryLower.includes('water')) {
        return Thermometer;
    }

    // Storage & Drive
    if (categoryLower.includes('hard drive') || categoryLower.includes('harddisk') || categoryLower.includes('hdd') || categoryLower.includes('ssd')) {
        return HardDrive;
    }
    if (categoryLower.includes('storage') || categoryLower.includes('เก็บข้อมูล')) {
        return Database;
    }

    // Network & Server
    if (categoryLower.includes('server') || categoryLower.includes('เซิร์ฟเวอร์')) {
        return Server;
    }
    if (categoryLower.includes('router') || categoryLower.includes('network') || categoryLower.includes('เราเตอร์')) {
        return Wifi;
    }

    // Input devices
    if (categoryLower.includes('keyboard') || categoryLower.includes('คีย์บอร์ด')) {
        return Keyboard;
    }
    if (categoryLower.includes('mouse') || categoryLower.includes('เมาส์')) {
        return Mouse;
    }

    // Mobile devices
    if (categoryLower.includes('phone') || categoryLower.includes('โทรศัพท์') || categoryLower.includes('smartphone')) {
        return Smartphone;
    }

    // TV & Display
    if (categoryLower.includes('tv') || categoryLower.includes('television') || categoryLower.includes('ทีวี')) {
        return Tv;
    }
    if (categoryLower.includes('ฉายภาพ') || categoryLower.includes('projector')) {
        return Video;
    }

    // Lighting
    if (categoryLower.includes('light') || categoryLower.includes('ไฟ') || categoryLower.includes('หลอดไฟ')) {
        return Lightbulb;
    }
    if (categoryLower.includes('lamp') || categoryLower.includes('โคมไฟ')) {
        return Lamp;
    }

    // Air conditioning
    if (categoryLower.includes('fan') || categoryLower.includes('พัดลม')) {
        return Fan;
    }
    if (categoryLower.includes('air') || categoryLower.includes('แอร์') || categoryLower.includes('เครื่องฟอกอากาศ')) {
        return AirVent;
    }

    // Office equipment
    if (categoryLower.includes('เครื่องพับ')) {
        return Folder;
    }
    if (categoryLower.includes('สแกนลายนิ้วมือ') || categoryLower.includes('fingerprint')) {
        return Database;
    }
    if (categoryLower.includes('สแกน') && !categoryLower.includes('ลายนิ้ว')) {
        return FileText;
    }
    if (categoryLower.includes('แฟกซ์') || categoryLower.includes('fax')) {
        return Printer;
    }
    if (categoryLower.includes('เครื่องย่อย') || categoryLower.includes('shredder')) {
        return Wrench;
    }

    // Tools
    if (categoryLower.includes('tool') || categoryLower.includes('เครื่องมือ')) {
        return Hammer;
    }
    if (categoryLower.includes('เครื่องนับ')) {
        return Calculator;
    }
    if (categoryLower.includes('รถเข็น')) {
        return Car;
    }

    // Vehicle
    if (categoryLower.includes('car') || categoryLower.includes('รถ') || categoryLower.includes('vehicle')) {
        return Car;
    }

    // Building
    if (categoryLower.includes('building') || categoryLower.includes('อาคาร')) {
        return Building2;
    }

    // Art & Design
    if (categoryLower.includes('art') || categoryLower.includes('ศิลป์') || categoryLower.includes('ภาพ')) {
        return Palette;
    }
    if (categoryLower.includes('music') || categoryLower.includes('ดนตรี')) {
        return Music;
    }

    // Clock & Time
    if (categoryLower.includes('clock') || categoryLower.includes('นาฬิกา') || categoryLower.includes('watch')) {
        return Clock;
    }

    // Book & Document
    if (categoryLower.includes('book') || categoryLower.includes('หนังสือ') || categoryLower.includes('เอกสาร')) {
        return Book;
    }

    // Default icon
    return Package;
};

/**
 * Get icon name from categories array by category name
 * @param {string} categoryName - Category name to search for
 * @param {Array} categories - Array of category objects (with name and icon_name properties)
 * @returns {string|null} Icon name or null if not found
 */
export const getIconNameFromCategories = (categoryName, categories = []) => {
    if (!categoryName || !categories || categories.length === 0) {
        return null;
    }
    
    // หา category object ที่มี name ตรงกับ categoryName
    const category = categories.find(cat => {
        const catName = typeof cat === 'string' ? cat : (cat.name || cat);
        return catName === categoryName;
    });
    
    // ถ้า category เป็น object และมี icon_name ให้ return icon_name
    if (category && typeof category === 'object' && category.icon_name) {
        return category.icon_name;
    }
    
    return null;
};

/**
 * Get icon component as JSX element
 * @param {string} category - Category name
 * @param {object} props - Additional props for icon (className, size, etc.)
 * @param {string} iconName - Icon name from database (optional, takes priority)
 * @param {Array} categories - Array of category objects (optional, for auto-lookup icon_name)
 * @returns {JSX.Element} Icon JSX element
 */
export const renderCategoryIcon = (category, props = {}, iconName = null, categories = []) => {
    try {
        // ถ้าไม่มี iconName แต่มี categories ให้หา icon_name จาก categories
        if (!iconName && categories && categories.length > 0) {
            iconName = getIconNameFromCategories(category, categories);
        }
        
        const IconComponent = getCategoryIcon(category || '', iconName);
        if (!IconComponent) {
            return React.createElement(Package, props);
        }
        
        // Use React.createElement to avoid issues with JSX in utility functions
        return React.createElement(IconComponent, props);
    } catch (error) {
        console.error('Error rendering category icon:', error);
        return React.createElement(Package, props);
    }
};

