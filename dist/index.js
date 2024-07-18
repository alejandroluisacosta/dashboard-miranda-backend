"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const bookingControllers_1 = __importDefault(require("./controllers/bookingControllers"));
require("dotenv/config");
const loginController_1 = __importDefault(require("./controllers/loginController"));
const roomsControllers_1 = __importDefault(require("./controllers/roomsControllers"));
const usersControllers_1 = __importDefault(require("./controllers/usersControllers"));
const commentControllers_1 = __importDefault(require("./controllers/commentControllers"));
const mustache_express_1 = __importDefault(require("mustache-express"));
const auth_1 = require("./middleware/auth");
process.env.TOKEN_SECRET;
exports.app = (0, express_1.default)();
exports.port = 3000;
exports.app.use(express_1.default.json());
// PUBLIC ROUTE
exports.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.app.set('views', './views');
exports.app.set('view engine', 'mustache');
exports.app.engine('mustache', (0, mustache_express_1.default)());
exports.app.get('/public', (_req, res) => {
    res.render('index');
});
exports.app.use('/login', loginController_1.default);
exports.app.use(auth_1.authenticateToken);
exports.app.use('/bookings', bookingControllers_1.default);
exports.app.use('/rooms', roomsControllers_1.default);
exports.app.use('/users', usersControllers_1.default);
exports.app.use('/contact', commentControllers_1.default);
exports.app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Unexpected error occurred' });
});
