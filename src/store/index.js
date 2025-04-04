import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import formDataReducer from "./slices/formDataSlice";
import localFormDataReducer from "./slices/dataAddSlice";
import paidObjectReducer from "./slices/paidObject";
import productReducer from "./slices/productSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["nonSerializableReducer"], // Evita persistir estados no serializables
};

const productPersistedReducer = persistReducer(persistConfig, productReducer);

const store = configureStore({
  reducer: {
    formData: formDataReducer,
    localFormData: localFormDataReducer,
    paidObject: paidObjectReducer,
    product: productPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignora acciones de persistencia
        ignoredPaths: ["register", "rehydrate"], // Ignora las rutas no serializables
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };
