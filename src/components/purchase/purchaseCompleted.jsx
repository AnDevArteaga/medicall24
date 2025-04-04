import PropTypes from "prop-types";
import { usePaymentStatus } from "../../hooks/usePurchaseCompleted";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  MailCheck,
  XCircle,
} from "lucide-react";
import TutorialNequi from "./TutorialNequi";

const PaymentStatus = ({ transactionId }) => {
  const { paymentData, loading, message } = usePaymentStatus(transactionId);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "aprobada":
        return "text-emerald-600";
      case "rechazada":
        return "text-red-600";
      case "error":
        return "text-red-600";
      default:
        return "text-amber-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "aprobada":
        return <CheckCircle className="w-12 h-12 text-emerald-600" />;
      case "rechazada":
        return <XCircle className="w-12 h-12 text-red-600" />;
      case "error":
        return <XCircle className="w-12 h-12 text-red-600" />;
      default:
        return <Clock className="w-12 h-12 text-amber-500 animate-spin" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-600">
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <p className="text-lg text-red-600">
          No se pudo obtener la información de la transacción.
        </p>
      </div>
    );
  }

  const { order } = paymentData;
  console.log("order", order);
  return (
    <div className="container mx-auto p-2 md:p-8 animate-fadeIn">
      <div className="bg-white p-6 md:p-8">
        <div className="flex flex-col items-center mb-4">
          {getStatusIcon(order.status)}
          <h1 className="text-3xl text-center font-bold text-gray-800 mt-4 mb-2">
            Estado de la Transacción
          </h1>
          <p
            className={`text-xl font-medium ${
              getStatusColor(
                order.status,
              )
            } text-center`}
          >
            {message}
          </p>
        </div>
        {order.paymentMethod === "NEQUI" && order.status === null && (
          <TutorialNequi />
        )}
        {order.status === "aprobada" && (
          <div className="flex flex-col items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <MailCheck className="w-12 h-12 text-green-800" />
            <p className="text-left ml-6 text-base sm:text-base font-regular">
              En los próximos minutos recibirás un correo electrónico con la
              confirmación de tu compra
            </p>
            <div className="mt-4 p-3 bg-green-200 rounded-lg w-full flex flex-col justify-center">
              <p className="text-lg font-semibold text-left mb-4">
                Para conocer cómo puedes acceder al servicio que adquiriste,
                sigue el paso a paso para solicitar tu cita
              </p>
              <a
                className="underline text-pink-600 font-bold text-3xl text-center"
                href="/pasos-bexa/4"
              >
                Ver paso a paso
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;

PaymentStatus.propTypes = {
  transactionId: PropTypes.string.isRequired,
};
