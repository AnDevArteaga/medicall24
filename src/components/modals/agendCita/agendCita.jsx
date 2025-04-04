import { useAgendCita } from "../../../hooks/useAgendCita";
import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import PropTypes from "prop-types";
const Modal = ({ isOpen, onClose }) => {
  const {
    data,
    loading,
    professionals,
    handleSedeSelect,
    view,
    handleProfesionalSelect,
    days,
    handleDaysSelect,
    hours,
    handleViewBack,
    handleClose,
    error,
    cover,
    institutions
  } = useAgendCita(onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition"
        >
          ✖
        </button>

        {view === "error" && <Error error={error} />}

        {view === "sedes" && (
          <SedeList
            data={data}
            onSelect={handleSedeSelect}
            loading={loading}
            error={error}
            cover={cover}
            institutions={institutions}
          />
        )}
        {view === "professionals" && (
          <ProfessionalList
            professionals={professionals}
            loading={loading}
            onBack={() => handleViewBack("sedes")}
            onSelect={handleProfesionalSelect}
          />
        )}
        {view === "days" && (
          <DaysList
            days={days}
            loading={loading}
            onBack={() => handleViewBack("professionals")}
            onSelect={handleDaysSelect}
          />
        )}
        {view === "hours" && (
          <HoursList
            hours={hours}
            loading={loading}
            onBack={() => handleViewBack("days")}
          />
        )}
      </div>
    </div>
  );
};

const Error = ({ error }) => (
  <div className="flex justify-center items-center h-40">
    <AlertCircle className="text-pink-600 w-8 h-8" />
    <p className="ml-3 text-pink-600 text-center text-xl">{error}</p>
  </div>
);

const SedeList = ({ data, onSelect, loading, cover, institutions }) => (
  <div className="bg-white w-full mx-auto">
              <div
                className="px-4 py-2 sm:px-1 bg-gray-200 flex items-center gap-4"
              >
                <div className="flex-shrink-0">
                  {cover
                    ? (
                      <img
                        src={cover}
                        alt="Prestador de salud"
                        className="w-20 h-20 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-pink-200"
                      />
                    )
                    : (
                      <div className="w-16 h-16 sm:w-12 sm:h-12 rounded-full bg-pink-100 flex items-center justify-center">
                        <User className="w-8 h-8 text-pink-600" />
                      </div>
                    )}
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-lg sm:text-sm text-gray-800">
                    {institutions.nombre_prestador}
                  </div>
                </div>
              </div>
    <div className="p-6 sm:px-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-600 border-b pb-2 border-pink-200">
        Selecciona una sede
      </h2>
      {loading
        ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-pink-600 w-8 h-8" />
          </div>
        )
        : (
          <ul className="space-y-3">
            {data?.map((sede) => (
              <li
                key={sede.id}
                className="p-4 sm:p-1 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer transition-all duration-200 flex items-center justify-between group"
                onClick={() => onSelect(sede)}
              >
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800 group-hover:text-pink-600 transition-colors">
                    {sede.name}
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-pink-600" />
                      <p>
                        {sede.address}, {sede.municipality.nombre || ""}{" "}
                        {sede.department.nombre || ""}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-pink-600" />
                      <p>{sede.phone}</p>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-pink-400 group-hover:text-pink-600 transform group-hover:translate-x-1 transition-all" />
              </li>
            ))}
          </ul>
        )}
    </div>
  </div>
);

const ProfessionalList = ({ professionals, loading, onBack, onSelect }) => {
  return (
    <div className="bg-white p-6 sm:p-4 w-full mx-auto">
      <button
        className="flex items-center text-pink-600 mb-6 font-medium hover:text-pink-700 transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </button>

      <h2 className="text-2xl sm:text-xl font-bold mb-6 text-pink-600 border-b pb-2 border-pink-200">
        Profesionales disponibles
      </h2>

      {loading
        ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-pink-600 w-8 h-8" />
          </div>
        )
        : (
          <ul className="space-y-3">
            {professionals.map((prof) => (
              <li
                key={prof.id}
                className="p-4 sm:px-4 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer transition-all duration-200 flex items-center gap-4"
                onClick={() => onSelect(prof)}
              >
                <div className="flex-shrink-0">
                  {prof.user.avatar
                    ? (
                      <img
                        src={prof.user.avatar}
                        alt={`${prof.user.name1} ${prof.user.lastname1}`}
                        className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-pink-200"
                      />
                    )
                    : (
                      <div className="w-16 h-16 sm:w-12 sm:h-12 rounded-full bg-pink-100 flex items-center justify-center">
                        <User className="w-8 h-8 text-pink-600" />
                      </div>
                    )}
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-lg sm:text-base text-gray-800">
                    {[
                      prof.user.name1,
                      prof.user.name2,
                      prof.user.lastname1,
                      prof.user.lastname2,
                    ]
                      .filter(Boolean) // Elimina valores `null` o `undefined`
                      .map((word) =>
                        word
                          .toLowerCase()
                          .replace(
                            /\b\w/g,
                            (char) => char.toUpperCase(),
                          )
                      )
                      .join(" ")}
                  </div>
                  <div className="mt-1 px-2 py-1 bg-pink-100 text-pink-600 rounded-full text-base sm:text-sm inline-block">
                    MEDICINA GENERAL
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

const DaysList = ({ days, loading, onBack, onSelect }) => {
  return (
    <div className="bg-white p-6 sm:p-4 w-full mx-auto">
      <button
        className="flex items-center text-pink-600 mb-6 font-medium hover:text-pink-700 transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </button>

      <h2 className="text-2xl font-bold mb-6 text-pink-600 border-b pb-2 border-pink-200">
        Días disponibles
      </h2>

      {loading
        ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-pink-600 w-8 h-8" />
          </div>
        )
        : (
          <ul className="space-y-3">
            {days.map((day) => (
              <li
                key={day.date}
                className="p-4 sm:p-4 border shadow-md border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer transition-all duration-200 flex items-center"
                onClick={() => onSelect(day)}
              >
                <div className="flex-1 pr-4 border-r border-pink-200">
                  <p className="text-sm text-pink-600 font-medium mb-1">
                    Horario
                  </p>
                  <p className="font-semibold text-gray-800">
                    {day.time && day.time.length > 0
                      ? day.time.join(" / ")
                      : "No disponible"}
                  </p>
                </div>

                <div className="flex-1 pl-4">
                  <p className="font-semibold text-lg sm:text-base text-gray-800">
                    {day.fecha}
                  </p>
                  {day.specialty && (
                    <div className="mt-1 px-2 py-1 bg-pink-100 text-pink-600 rounded-full text-xs inline-block">
                      {day.specialty}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

const HoursList = ({ hours, loading, onBack }) => (
  <div className="bg-white p-6 sm:px-4 w-full mx-auto">
    <button
      className="flex items-center text-pink-600 mb-6 font-medium hover:text-pink-700 transition-colors"
      onClick={onBack}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Volver
    </button>

    <h2 className="text-2xl font-bold mb-6 text-pink-600 border-b pb-2 border-pink-200">
      Horas disponibles
    </h2>

    {loading
      ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-pink-600 w-8 h-8" />
        </div>
      )
      : (
        <div className="space-y-3">
          {Array.isArray(hours) && hours.length > 0
            ? (
              <ul className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {hours.map((hour, index) => (
                  <li
                    key={index}
                    className="p-3 sm:p-1 border border-pink-100 shadow-md rounded-lg hover:bg-pink-50 cursor-pointer transition-all duration-200 flex items-center justify-center"
                  >
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-pink-600" />
                      <span className="font-medium sm:text-sm">
                        {hour.fecha}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )
            : (
              <div className="p-4 bg-pink-50 rounded-lg text-center text-gray-700">
                <p className="mb-2 font-medium">No hay horas disponibles</p>
                <p className="text-sm text-gray-600">
                  Por favor selecciona otra fecha u otro profesional.
                </p>
              </div>
            )}
        </div>
      )}
  </div>
);

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
