import { 
  ShieldAlert, 
  ArrowLeft, 
} from 'lucide-react';

const RestrictedAccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
          
          {/* Main Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <ShieldAlert className="w-16 h-16 text-pink-500/20" />
              </div>
              <ShieldAlert className="w-16 h-16 text-pink-600 relative animate-bounce" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4 relative">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
             Términos y condiciones no encontrados
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              En estos momentos no puedes ingresar aquí
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl shadow-lg hover:bg-pink-700 transition-all duration-300 hover:scale-105 space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al Inicio</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestrictedAccess;