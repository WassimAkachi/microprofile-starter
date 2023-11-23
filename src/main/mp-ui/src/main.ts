import {runInitialTasks} from "./app/control/MpStarterAppBootstrap.ts";
import "./Controlls.ts"
runInitialTasks().then(_ => import("./ComponentsAndElements.ts"));
