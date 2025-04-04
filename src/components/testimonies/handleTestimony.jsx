import useExcelData from "../../hooks/useExcelDataTestimony";
import ChartTestimony from "../testimonies/chartTertimony";
import VideoTestimony from "../testimonies/videoTestimony";
import ComentaryTestimony from "../testimonies/comentaryTestimony";
import { BarChartIcon as ChartBar, MessageCircle, Video } from "lucide-react"


function App() {
    const { datosGrafico, datosFiltrados } = useExcelData();

    const datosVideo = {
        1: { url: "https://medicall24.com.co/wp-content/uploads/2025/02/testimonio1.mp4", name: 'Miriam Estrada' },
        2: { url:"https://medicall24.com.co/wp-content/uploads/2025/02/testimonio2.mp4", name: "Gabriela Lobo" },
        3: { url: "https://medicall24.com.co/wp-content/uploads/2025/02/testimonio3.mp4", name: "Thelmira Vanegas" },
        4: { url: "https://medicall24.com.co/wp-content/uploads/2025/03/testimonio4.mp4", name: 'Ana Rojas' },
        // 5: { url:"https://medicall24.com.co/wp-content/uploads/2025/03/testimonio5.mp4", name: "NN2" },
        6: { url: "https://medicall24.com.co/wp-content/uploads/2025/03/testimonio6.mp4", name: "Glenys Ramos" },
        7: { url: "https://medicall24.com.co/wp-content/uploads/2025/03/testimonio7.mp4", name: "Miguelina Padilla" }
    };

    return (
        <main className="bg-gradient-to-b from-white to-pink-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-3 py-12 sm:py-2">

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8 sm:p-2">
              <h2 className="flex items-center justify-center sm:justify-start  text-5xl sm:text-4xl font-bold text-gray-700 mb-4">
                <Video className="w-10 h-10 text-yellow-400 mr-3" />
                Testimonios
              </h2>
              <VideoTestimony data={datosVideo} />
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8 sm:p-2">
              <h2 className="flex items-center justify-center text-5xl sm:text-4xl font-bold text-gray-700 mb-4">
                <ChartBar className="w-10 h-10 text-pink-600 mr-3" />
                Encuesta de Satisfacción
              </h2>
              <ChartTestimony data={datosGrafico} />
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8 sm:p-2">
              <h2 className="flex items-center text-xl sm:text-4xl font-bold text-gray-700 mb-4">
                <MessageCircle className="w-8 h-8 text-green-500 mr-3 flex-shrink-0" />
                Recomendaciones y sugerencias de Clientes
              </h2>

              <ComentaryTestimony data={datosFiltrados} />
            </div>
          </section>
        </div>
      </div>
    </main>
    );
}

export default App;
