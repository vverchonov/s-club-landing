'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Club operating hours (20:30 - 02:00) - used in generateTimeOptions
// const CLUB_OPEN_HOUR = 20;
// const CLUB_OPEN_MINUTE = 30;
// const CLUB_CLOSE_HOUR = 2;
// const CLUB_CLOSE_MINUTE = 0;

// Generate valid time options for club hours
const generateTimeOptions = () => {
    const options = [];

    // From 20:30 to 23:59
    for (let hour = 20; hour <= 23; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            if (hour === 20 && minute < 30) continue; // Skip before 20:30
            if (hour === 23 && minute > 59) continue; // Skip after 23:59

            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            options.push(timeString);
        }
    }

    // From 00:00 to 02:00
    for (let hour = 0; hour <= 2; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            if (hour === 2 && minute > 0) continue; // Skip after 02:00

            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            options.push(timeString);
        }
    }

    return options;
};

const validTimeOptions = generateTimeOptions();

export default function BookPage() {
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '20:30',
        endTime: '22:30'
    });
    const [tableAvailability, setTableAvailability] = useState<{ [key: number]: { available: boolean; availableHours: string[]; reservations: Array<{ id: string; startTime: string; endTime: string; isConfirmed: boolean }> } } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [reservationData, setReservationData] = useState<{ tableNumber: number; name: string; phone: string; date: string; startTime: string; endTime: string; reservationId: string; createdAt: string } | null>(null);
    // Add a new state for form submission loading
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Function to validate date format
    const isValidDate = useCallback((dateString: string): boolean => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date.getTime());
    }, []);

    // Function to fetch table availability
    const fetchTableAvailability = useCallback(async (date: string) => {
        if (!isValidDate(date)) {
            setError('Invalid date format');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/tables?date=${date}`);
            const data = await response.json();

            if (response.ok) {
                setTableAvailability(data.tableAvailability);
            } else {
                setError(data.error || 'Failed to fetch table availability');
            }
        } catch (err) {
            setError('Network error while fetching table availability');
            console.error('Error fetching table availability:', err);
        } finally {
            setLoading(false);
        }
    }, [isValidDate]);

    // Fetch table availability on initial load
    useEffect(() => {
        fetchTableAvailability(formData.date);
    }, [formData.date, fetchTableAvailability]);

    // Function to get available time options for selected table
    const getAvailableTimeOptions = () => {
        if (!selectedTable || !tableAvailability?.[selectedTable]) {
            return validTimeOptions;
        }
        return tableAvailability[selectedTable].availableHours || validTimeOptions;
    };

    const handleTableClick = (tableNumber: number) => {
        if (selectedTable === tableNumber) {
            // Deselect table
            setSelectedTable(null);
            // Reset to default times
            setFormData(prev => ({
                ...prev,
                startTime: '20:30',
                endTime: '22:30'
            }));
        } else {
            // Select new table
            setSelectedTable(tableNumber);

            // Get available hours for the selected table
            const availableHours = tableAvailability?.[tableNumber]?.availableHours || validTimeOptions;

            // Find the first available start time
            const firstAvailableStart = availableHours[0] || '20:30';

            // Calculate end time (2 hours after start)
            const [hours, minutes] = firstAvailableStart.split(':').map(Number);
            let endHours = hours + 2;
            const endMinutes = minutes;

            // Handle overflow to next day (after midnight)
            if (endHours >= 24) {
                endHours = endHours - 24;
            }

            const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;

            // Check if calculated end time is available, if not, find the closest available time
            const calculatedEndTime = availableHours.includes(endTime) ? endTime :
                availableHours.find((time: string) => {
                    const [timeHours, timeMinutes] = time.split(':').map(Number);
                    return timeHours > hours || (timeHours === hours && timeMinutes > minutes);
                }) || availableHours[availableHours.length - 1] || '22:30';

            setFormData(prev => ({
                ...prev,
                startTime: firstAvailableStart,
                endTime: calculatedEndTime
            }));
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation check
        const hasPhone = formData.phone.trim().length > 0;
        const hasTableSelected = selectedTable !== null;
        const isTableAvailable = selectedTable ? tableAvailability?.[selectedTable]?.available : false;

        if (!hasPhone || !hasTableSelected || !isTableAvailable) {
            return; // Button should be disabled anyway, but extra safety
        }

        setIsSubmitting(true); // Start loading

        try {
            const response = await fetch('/api/tables', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tableNumber: selectedTable,
                    name: formData.name,
                    phone: formData.phone,
                    date: formData.date,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    description: `Бронювання столика ${selectedTable} для ${formData.name} на ${formData.date} з ${formData.startTime} до ${formData.endTime}`
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Set reservation data for modal
                setReservationData({
                    tableNumber: selectedTable!,
                    name: formData.name,
                    phone: formData.phone,
                    date: formData.date,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    reservationId: data.reservationId || 'N/A',
                    createdAt: new Date().toLocaleString('uk-UA')
                });

                // Show success modal
                setShowSuccessModal(true);

                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    date: new Date().toISOString().split('T')[0],
                    startTime: '20:30',
                    endTime: '22:30'
                });
                setSelectedTable(null);

                // Refetch table availability data
                await fetchTableAvailability(formData.date);

            } else {
                toast.error(data.error || 'Помилка при створенні бронювання', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Помилка при створенні бронювання', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setIsSubmitting(false); // Stop loading
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'date') {
            // Deselect table when date changes
            setSelectedTable(null);
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));

            // Fetch table availability for the new date
            fetchTableAvailability(value);
        } else if (name === 'startTime') {
            // Auto-adjust end time to be 2 hours after start time
            const [hours, minutes] = value.split(':').map(Number);
            let endHours = hours + 2;
            const endMinutes = minutes;

            // Handle overflow to next day (after midnight)
            if (endHours >= 24) {
                endHours = endHours - 24;
            }

            const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;

            // Get available time options for selected table
            const availableTimeOptions = getAvailableTimeOptions();

            // Check if calculated end time is within available options, if not, find the closest available time
            const calculatedEndTime = availableTimeOptions.includes(endTime) ? endTime :
                availableTimeOptions.find((time: string) => {
                    const [timeHours, timeMinutes] = time.split(':').map(Number);
                    return timeHours > hours || (timeHours === hours && timeMinutes > minutes);
                }) || availableTimeOptions[availableTimeOptions.length - 1];

            setFormData(prev => ({
                ...prev,
                startTime: value,
                endTime: calculatedEndTime
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <section className="relative bg-black text-white py-24 pt-2 overflow-hidden">
            <ToastContainer />
            {/* Red glow effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4">
                <h2 className="text-red-500 text-xl mb-4 text-center uppercase">Бронювання</h2>
                <h3 className="text-4xl md:text-5xl font-serif mb-16 text-center">
                    ЗАБРОНЮВАТИ СТОЛИК
                </h3>

                <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm shadow-xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Table Selection */}
                        <div>
                            <h4 className="text-2xl font-serif mb-6">Оберіть Столик</h4>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    {/* Loading Animation */}
                                    <div className="relative w-16 h-16 mb-4">
                                        <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full"></div>
                                        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
                                    </div>
                                    <p className="text-gray-400 text-center">Завантаження доступності столиків...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <p className="text-red-400 text-sm mb-2">{error}</p>
                                    <button
                                        onClick={() => fetchTableAvailability(formData.date)}
                                        className="text-red-500 hover:text-red-400 text-sm underline"
                                    >
                                        Спробувати знову
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        {[1, 2, 3, 4, 5, 6].map((tableNumber) => {
                                            const tableData = tableAvailability?.[tableNumber];
                                            const isAvailable = tableData?.available;
                                            const isSelected = selectedTable === tableNumber;
                                            const hasAvailableHours = tableData?.availableHours && tableData.availableHours.length > 0;
                                            const isFullyBooked = isAvailable === false || !hasAvailableHours;

                                            return (
                                                <div
                                                    key={tableNumber}
                                                    onClick={() => !isFullyBooked && handleTableClick(tableNumber)}
                                                    className={`
                                                        w-20 h-20 border-2 rounded-lg transition-all duration-200 flex items-center justify-center relative group
                                                        ${isSelected
                                                            ? 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/30 cursor-pointer'
                                                            : isFullyBooked
                                                                ? 'border-gray-600 bg-gray-800/50 cursor-not-allowed opacity-50'
                                                                : 'border-white/20 bg-white/10 hover:border-red-500 hover:bg-white/20 cursor-pointer'
                                                        }
                                                    `}
                                                    title={isFullyBooked ? `Столик ${tableNumber} повністю заброньований на цю дату` : `Обрати столик ${tableNumber}`}
                                                >
                                                    <span className={`font-semibold ${isSelected ? 'text-red-500' : 'text-white'}`}>
                                                        {tableNumber}
                                                    </span>

                                                    {isFullyBooked && (
                                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                                                    )}

                                                    {/* Hover tooltip for fully booked tables */}
                                                    {isFullyBooked && (
                                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                                            Повністю заброньований
                                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {selectedTable ? (
                                        <p className="text-red-500 font-medium text-center">
                                            ✓ Столик {selectedTable} обрано
                                        </p>
                                    ) : (
                                        <p className="text-gray-400 text-center text-sm">
                                            Оберіть столик для бронювання
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Booking Form */}
                        <div>
                            <h4 className="text-2xl font-serif mb-6">Деталі Бронювання</h4>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Ім&apos;я
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        placeholder="Ваше ім'я"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                        Телефон *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        placeholder="+380"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium mb-2">
                                        День бронювання
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="startTime" className="block text-sm font-medium mb-2">
                                        Час початку
                                    </label>
                                    <select
                                        id="startTime"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        required
                                    >
                                        {getAvailableTimeOptions().map((time: string) => (
                                            <option key={time} value={time} className="bg-gray-900 text-white">
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-400 mt-1">Клуб працює з 20:30 до 02:00</p>
                                </div>

                                <div>
                                    <label htmlFor="endTime" className="block text-sm font-medium mb-2">
                                        Час закінчення
                                    </label>
                                    <select
                                        id="endTime"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                                        required
                                    >
                                        {getAvailableTimeOptions().map((time: string) => (
                                            <option key={time} value={time} className="bg-gray-900 text-white">
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-400 mt-1">Автоматично встановлюється на 2 години після початку</p>
                                </div>

                                <div className="text-center">
                                    {(() => {
                                        // Validation logic
                                        const hasPhone = formData.phone.trim().length > 0;
                                        const hasTableSelected = selectedTable !== null;
                                        const isTableAvailable = selectedTable ? tableAvailability?.[selectedTable]?.available : false;

                                        const isDisabled = !hasPhone || !hasTableSelected || !isTableAvailable || isSubmitting;

                                        // Generate validation message
                                        let validationMessage = '';
                                        if (!hasPhone) {
                                            validationMessage = 'Введіть номер телефону';
                                        } else if (!hasTableSelected) {
                                            validationMessage = 'Оберіть столик';
                                        } else if (!isTableAvailable) {
                                            validationMessage = 'Обраний столик недоступний';
                                        }

                                        return (
                                            <>
                                                <button
                                                    type="submit"
                                                    disabled={isDisabled}
                                                    className={`px-8 py-3 rounded-full text-lg font-medium tracking-wider shadow-lg transition-colors duration-300 flex items-center justify-center mx-auto space-x-2 ${isDisabled
                                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                        : 'bg-[#8B0000] hover:bg-[#660000] text-white'
                                                        }`}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            {/* Loading Spinner */}
                                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                            <span>Створення...</span>
                                                        </>
                                                    ) : (
                                                        <span>ЗАБРОНЮВАТИ</span>
                                                    )}
                                                </button>

                                                {isDisabled && validationMessage && !isSubmitting && (
                                                    <p className="text-red-400 text-sm mt-2">
                                                        {validationMessage}
                                                    </p>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && reservationData && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    {/* Red glow effects */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
                    </div>

                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-8 max-w-md w-full shadow-xl">
                        {/* Success Icon */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30">
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-serif text-white mb-3 tracking-wider">Дякуємо за бронювання!</h3>
                            <p className="text-gray-300 text-lg">Наш персонал зв&apos;яжеться з вами найближчим часом для підтвердження.</p>
                        </div>

                        {/* Reservation Details */}
                        <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-6">
                            <h4 className="text-xl font-serif text-white mb-6 text-center">Деталі бронювання</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">Столик:</span>
                                    <span className="text-white font-medium text-lg">№{reservationData.tableNumber}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">Ім&apos;я:</span>
                                    <span className="text-white font-medium">{reservationData.name}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">Телефон:</span>
                                    <span className="text-white font-medium">{reservationData.phone}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">Дата:</span>
                                    <span className="text-white font-medium">{reservationData.date}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-300">Час:</span>
                                    <span className="text-white font-medium">{reservationData.startTime} - {reservationData.endTime}</span>
                                </div>
                                {reservationData.reservationId !== 'N/A' && (
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-gray-300">ID бронювання:</span>
                                        <span className="text-white font-medium text-sm">{reservationData.reservationId}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-300">Створено:</span>
                                    <span className="text-white font-medium text-sm">{reservationData.createdAt}</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium text-lg">+38 (099) 011 1999</p>
                                    <p className="text-gray-300 text-sm">Для питань та змін</p>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="text-center">
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="px-8 py-3 bg-[#8B0000] hover:bg-[#660000] text-white rounded-full text-lg font-medium tracking-wider shadow-lg transition-colors duration-300"
                            >
                                Закрити
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
} 