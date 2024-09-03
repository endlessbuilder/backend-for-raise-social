"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccountValidity = exports.mintTokens = exports.getBalance = exports.getSolBalance = exports.toUiAmount = exports.toTokenAmount = exports.getOrCreateATA = void 0;
var anchor_1 = require("@coral-xyz/anchor");
var spl_token_1 = require("@solana/spl-token");
var getOrCreateATA = function (connection, mint, owner, payer) { return __awaiter(void 0, void 0, void 0, function () {
    var ata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, payer, mint, owner)];
            case 1:
                ata = _a.sent();
                return [2 /*return*/, ata.address];
        }
    });
}); };
exports.getOrCreateATA = getOrCreateATA;
var toTokenAmount = function (uiAmount, decimals) {
    return new anchor_1.BN(uiAmount * Math.pow(10, decimals));
};
exports.toTokenAmount = toTokenAmount;
var toUiAmount = function (token_amount, decimals) {
    return token_amount / Math.pow(10, decimals);
};
exports.toUiAmount = toUiAmount;
// return in lamports
var getSolBalance = function (connection, pubkey) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, connection
                .getBalance(pubkey)
                .then(function (balance) { return balance; })
                .catch(function () { return 0; })];
    });
}); };
exports.getSolBalance = getSolBalance;
var getBalance = function (connection, pubkey) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, spl_token_1.getAccount)(connection, pubkey)
                .then(function (account) { return Number(account.amount); })
                .catch(function () { return 0; })];
    });
}); };
exports.getBalance = getBalance;
var mintTokens = function (connection, payer, uiAmount, decimals, mint, destiantionWallet) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, spl_token_1.mintToChecked)(connection, payer, mint, destiantionWallet, payer.publicKey, (0, exports.toTokenAmount)(uiAmount, decimals).toNumber(), decimals)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.mintTokens = mintTokens;
var checkAccountValidity = function (connection, publicKey) { return __awaiter(void 0, void 0, void 0, function () {
    var accountInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection.getAccountInfo(publicKey)];
            case 1:
                accountInfo = _a.sent();
                return [2 /*return*/, accountInfo != null && accountInfo != undefined];
        }
    });
}); };
exports.checkAccountValidity = checkAccountValidity;
