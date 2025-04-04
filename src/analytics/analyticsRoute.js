import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "./analytics.js";

const AnalyticsRoute = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
};

export default AnalyticsRoute;