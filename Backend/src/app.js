import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./config/passportjwtconfig.js";
import { passport } from "./config/passportjwtconfig.js";
import { appconfig } from "./config/appconfig.js";
import { Authroutes } from "./routes/userRoute.js";
import carbonRoutes from "./routes/carbonFootprintRoute.js"
import analysisRoute from './routes/analysisRoute.js';
import productRoute from "./routes/productRoute.js";
import reviewRoute from "./routes/reviewRoute.js";


export const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(
  cors({
    origin: appconfig.REACT_APP_BASE_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/v1/sustainify/auth", Authroutes);
app.use("/api/v1/sustainify/carbon",carbonRoutes);
app.use('/api/v1/sustainify/mistral',analysisRoute);
app.use('/api/v1/sustainify/product',productRoute);
app.use('/api/v1/sustainify/review',reviewRoute);
