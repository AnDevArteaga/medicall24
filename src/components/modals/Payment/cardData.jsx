import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/common/Loader"

const CreditCardModal = ({ isOpen, cardDataSubmit }) => {
    const [cardNumberValid, setCardNumberValid] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
    });

    const validateCardNumber = (value) => {
        if (value.length > 0 ) {
            if (value.length !== 16) {
                setError("Por favor ingrese un número de tarjeta válido.");
                setCardNumberValid(false);
            } else {
                setError("");
                setCardNumberValid(true);
            }
        } else {
            setError("");
        }
    };

    useEffect(() => {
        validateCardNumber(cardData.number);
    }, [cardData.number]);

    const validateFormData = () => {
        return (
            cardData.number &&
            cardData.name &&
            cardData.expiryMonth &&
            cardData.expiryYear &&
            cardData.cvc &&
            cardNumberValid
        );
    };

    const isButtonDisabled = !validateFormData();

    // Generar meses restantes del año actual
    const getCurrentMonths = () => {
        const currentMonth = new Date().getMonth();
        const months = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
        ];
        return months.slice(currentMonth).map((mes, index) => ({
            value: (currentMonth + index + 1).toString().padStart(2, "0"),
            label: mes,
        }));
    };

    // Generar años desde el actual
    const getYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, i) => ({
            value: (currentYear + i).toString(),
            label: (currentYear + i).toString(),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            cardDataSubmit(cardData);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-center ">
            <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative"
                        >
                            <h2 className="text-xl font-bold mb-6 text-center text-pink-600">
                                Vincula una tarjeta de crédito o débito
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">
                                        Número de Tarjeta
                                    </label>
                                    <input
                                        type="text"
                                        value={cardData.number}
                                        onChange={(e) => {
                                            const value = e.target.value
                                                .replace(/\D/g, "");

                                            setCardData((prev) => ({
                                                ...prev,
                                                number: value,
                                            }));
                                        }}
                                        placeholder="XXXXXXXXXXXXXXXX"
                                        className={`w-full text-sm p-3 border-2 border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-600 focus:outline-none transition-colors ${
                                            cardData.number
                                                ? "border-2"
                                                : "border-2 border-pink-600"
                                        }`}
                                        maxLength="16"
                                    />
                                    {error && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2 text-sm">
                                        Nombre en la Tarjeta
                                    </label>
                                    <input
                                        type="text"
                                        value={cardData.name}
                                        onChange={(e) =>
                                            setCardData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))}
                                        placeholder=""
                                        className={`w-full p-3 text-sm  border-2 border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-600 focus:outline-none transition-colors ${
                                            cardData.name
                                                ? "border-2"
                                                : "border-2 border-pink-600"
                                        }`}
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm mb-2">
                                            Mes
                                        </label>
                                        <select
                                            value={cardData.expiryMonth}
                                            onChange={(e) =>
                                                setCardData((prev) => ({
                                                    ...prev,
                                                    expiryMonth: e.target.value,
                                                }))}
                                            className={`w-full p-3 border-2 text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-600 focus:outline-none transition-colors ${
                                                cardData.expiryMonth
                                                    ? "border-2"
                                                    : "border-2 border-pink-600"
                                            }`}
                                        >
                                            <option value="">Mes</option>
                                            {getCurrentMonths().map((month) => (
                                                <option
                                                    key={month.value}
                                                    value={month.value}
                                                >
                                                    {month.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2 text-sm">
                                            Año
                                        </label>
                                        <select
                                            value={cardData.expiryYear}
                                            onChange={(e) =>
                                                setCardData((prev) => ({
                                                    ...prev,
                                                    expiryYear: e.target.value,
                                                }))}
                                            className={`w-full text-sm p-3 border-2 border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-600 focus:outline-none transition-colors ${
                                                cardData.expiryYear
                                                    ? "border-2"
                                                    : "border-2 border-pink-600"
                                            }`}
                                        >
                                            <option value="">Año</option>
                                            {getYears().map((year) => (
                                                <option
                                                    key={year.value}
                                                    value={String(year.value)
                                                        .slice(-2).padStart(
                                                            2,
                                                            "0",
                                                        )}
                                                >
                                                    {String(year.label).slice(
                                                        -2,
                                                    ).padStart(2, "0")}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm mb-2">
                                            CVC
                                        </label>
                                        <input
                                            type="text"
                                            value={cardData.cvc}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                    .replace(/\D/g, "");
                                                setCardData((prev) => ({
                                                    ...prev,
                                                    cvc: value,
                                                }));
                                            }}
                                            placeholder="123"
                                            maxLength="3"
                                            className={`w-full p-3 border-2 text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-600 focus:outline-none transition-colors ${
                                                cardData.cvc
                                                    ? "border-2"
                                                    : "border-2 border-pink-600"
                                            }`}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="w-1/3 mt-4 py-2 rounded-lg font-semibold text-sm text-white bg-pink-600 hover:bg-pink-700 transition disabled:bg-gray-400"
                                        disabled={isButtonDisabled}
                                    >
                                        {loading ? (
                                            <Loader />
                                        ) : (
                                            "Guardar Tarjeta"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CreditCardModal;
