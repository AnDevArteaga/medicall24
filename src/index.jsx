import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store/index.js";
import AppRoutes from "./routes/routes.jsx";
import { initGA, logPageView } from "./analytics/analytics.js";
import { fetchCodigosXProductos, getProducts } from "./services/supabase/getCodigos&Productos.js";
import Loader from "./components/common/loaderPage.jsx"
import AnalyticsRoute from "./analytics/analyticsRoute.js"
import { useClasificadorProductos } from "./hooks/useClasifiedProducts.js";
import { PlanProvider } from "./contexts/empresas/simulatedPlanContext.jsx";
import { AppointmentProvider } from "./contexts/agendCitas.jsx";
import { Toaster } from "react-hot-toast";


const App = () => {
  const [productos, setProductos] = useState([]);
  const [codigosXProductos, setCodigosXProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initGA();
    logPageView();

    const loadData = async () => {
      try {
        const codigos = await fetchCodigosXProductos();
        const productosData = await getProducts();
        setCodigosXProductos(codigos);
        setProductos(productosData);
      } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const productosClasificados = useClasificadorProductos(productos);
  console.log(productosClasificados);

  if (loading) {
    return <Loader />
  }

  return (
    <Provider store={store}>
      <AppointmentProvider>
      <PlanProvider>
      <Router>
        <AnalyticsRoute />
        <Toaster position="bottom-right" reverseOrder={false}  toastOptions={{
    // Estilo general
    style: {
      fontSize: "18px",
      borderRadius: "8px",
      padding: "12px 16px",
    },
    success: {
      style: {
        background: "#19b424",
        color: "#fff",
      },
    },
    error: {
      style: {
        background: "#FEE2E2",
        color: "#991B1B",
      },
    },
  }} />
        <AppRoutes codigosXProductos={codigosXProductos} productosClasificados={productosClasificados} />
      </Router>
      </PlanProvider>
      </AppointmentProvider>

    </Provider>
  );
};

export default App;
