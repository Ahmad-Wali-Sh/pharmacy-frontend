import { useEffect, useState } from "react";

const ShortcutInput = ({ name, shortcut, setShortcut }) => {
    useEffect(() => {
        const savedShortcut = localStorage.getItem(name);
        if (savedShortcut && savedShortcut !== shortcut) {
            setShortcut(savedShortcut);
        }
    }, [name]);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setShortcut(value);
    };

    const handleKeyPress = (event) => {
        const { key, ctrlKey, shiftKey, altKey } = event;
        // Check if Ctrl, Shift, or Alt keys are pressed
        const modifiers = [];
        if (ctrlKey) modifiers.push('Ctrl');
        if (shiftKey) modifiers.push('Shift');
        if (altKey) modifiers.push('Alt');

        // Build the shortcut string with modifiers and the pressed key
        const newShortcut = `${modifiers.join('+')}${modifiers.length > 0 ? '+' : ''}${key}`;
        setShortcut(newShortcut);
    };

    const handleBlur = () => {
        // Save shortcut to localStorage when input loses focus
        localStorage.setItem(name, shortcut);
    };

    return (
        <div>
            <label>
                <input
                    type="text"
                    value={shortcut}
                    style={{ direction: 'ltr', backgroundColor: 'rgba(0,0,0,0)', border: 'none' }}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    onBlur={handleBlur}
                />
            </label>
        </div>
    );
};


function GeneralShortcuts() {
    const [generalShortcuts, setShortcuts] = useState({
        dashboard: localStorage.getItem('dashboard') || "F1",
        sell: localStorage.getItem('sell') || "F2",
        purchase: localStorage.getItem('purchase') || "F3",
        medician: localStorage.getItem('medician') || "F4",
        revenue: localStorage.getItem('revenue') || "F6",
        reports: localStorage.getItem('reports') || "F7",
    });
    const handleShortcutChange = (name, value) => {
        // Check if the new shortcut value is the same as any existing generalShortcuts
        const existingShortcut = Object.keys(generalShortcuts).find(key => generalShortcuts[key] === value);
        if (existingShortcut) {
            // Delete the existing shortcut
            localStorage.removeItem(existingShortcut);
            setShortcuts(prevShortcuts => ({
                ...prevShortcuts,
                [existingShortcut]: '',
            }));
        }
        // Set the new shortcut
        setShortcuts(prevShortcuts => ({
            ...prevShortcuts,
            [name]: value,
        }));
    };
    useEffect(() => {
        localStorage.setItem('generalShortcuts', JSON.stringify(generalShortcuts));
    }, [generalShortcuts])


    return (<div className="container-shortcuts">
        <div className="shortcut-item">
            <div style={{
                color: 'white'
            }}>برنامه (عمومی):</div>
        </div>
        <div className="shortcut-item">
            <div>داشبورد</div>
            <ShortcutInput name="dashboard" shortcut={generalShortcuts.dashboard} setShortcut={value => handleShortcutChange('dashboard', value)} />
        </div>
        <div className="shortcut-item">
            <div>فروشات</div>
            <ShortcutInput name="sell" shortcut={generalShortcuts.sell} setShortcut={value => handleShortcutChange('sell', value)} />
        </div>
        <div className="shortcut-item">
            <div>خریداری</div>
            <ShortcutInput name="purchase" shortcut={generalShortcuts.purchase} setShortcut={value => handleShortcutChange('purchase', value)} />
        </div>
        <div className="shortcut-item">
            <div>داروخانه</div>
            <ShortcutInput name="medician" shortcut={generalShortcuts.medician} setShortcut={value => handleShortcutChange('medician', value)} />
        </div>
        <div className="shortcut-item">
            <div>صندوق</div>
            <ShortcutInput name="revenue" shortcut={generalShortcuts.revenue} setShortcut={value => handleShortcutChange('revenue', value)} />
        </div>
        <div className="shortcut-item">
            <div>گذارشات</div>
            <ShortcutInput name="reports" shortcut={generalShortcuts.reports} setShortcut={value => handleShortcutChange('reports', value)} />
        </div>
    </div>
    );
}
function EntranceShortcuts() {
    const [entranceShortcuts, setEntranceShortcuts] = useState({
        edit_medicine: localStorage.getItem('edit_medicine') || "F9",
    });
    const handleShortcutChange = (name, value) => {
        // Check if the new shortcut value is the same as any existing entranceShortcuts
        const existingShortcut = Object.keys(entranceShortcuts).find(key => entranceShortcuts[key] === value);
        if (existingShortcut) {
            // Delete the existing shortcut
            localStorage.removeItem(existingShortcut);
            setEntranceShortcuts(prevShortcuts => ({
                ...prevShortcuts,
                [existingShortcut]: '',
            }));
        }
        // Set the new shortcut
        setEntranceShortcuts(prevShortcuts => ({
            ...prevShortcuts,
            [name]: value,
        }));
    };
    useEffect(() => {
        localStorage.setItem('entranceShortcuts', JSON.stringify(entranceShortcuts));
    }, [entranceShortcuts])


    return (<div className="container-shortcuts">
        <div className="shortcut-item">
            <div style={{
                color: 'white'
            }}>خریداری و حواله ورود:</div>
        </div>
        <div className="shortcut-item">
            <div>ویرایش دارو</div>
            <ShortcutInput name="edit_medicine" shortcut={entranceShortcuts.edit_medicine} setShortcut={value => handleShortcutChange('edit_medicine', value)} />
        </div>

    </div>);
}

function PrescriptionShortcuts() {
    return (<div className="container-shortcuts">
        <div className="shortcut-item">
            <div style={{
                color: 'white'
            }}>ثبت نسخه:</div>
        </div>
        <div className="shortcut-item">
            <div>جستجو نسخه</div>
            <div>Ctrl + B</div>
        </div>
        <div className="shortcut-item">
            <div>نسخه جدید</div>
            <div>Ctrl + D</div>
        </div>
        <div className="shortcut-item">
            <div>ذخیره یا آپدیت نسخه</div>
            <div>Ctrl + S</div>
        </div>
    </div>);
}

function ListShortcuts() {
    return (<div className="container-shortcuts">
        <div className="shortcut-item">
            <div style={{
                color: 'white'
            }}>لست ها:</div>
        </div>
        <div className="shortcut-item">
            <div>جدید</div>
            <div>Ctrl + E</div>
        </div>
        <div className="shortcut-item">
            <div>لست</div>
            <div>Ctrl + L</div>
        </div>
        <div className="shortcut-item">
            <div>فلتر</div>
            <div>Ctrl + F</div>
        </div>
    </div>);
}

export default function ShortcutsSettings() {

    return (
        <div className="shortcuts-container">
            <GeneralShortcuts />
            <EntranceShortcuts />
            <PrescriptionShortcuts />
            <ListShortcuts />
        </div>


    )
}
