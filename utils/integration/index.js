"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const anchor_1 = require("@coral-xyz/anchor");
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const idl = __importStar(require("../idl/raise_contract.json"));
const defaultProgramAccounts = {
    systemProgram: web3_js_1.SystemProgram.programId,
    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
    rent: web3_js_1.SYSVAR_RENT_PUBKEY,
    instruction: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY
};
class RaiseContractImpl {
    constructor(program, connection) {
        this.program = program;
        this.connection = connection;
    }
    static create(endpoint) {
        const connection = new web3_js_1.Connection(endpoint);
        const provider = new anchor_1.AnchorProvider(connection, new anchor_1.Wallet(web3_js_1.Keypair.generate()), { commitment: 'processed' });
        const program = new anchor_1.Program(idl, new web3_js_1.PublicKey(provider.publicKey));
        let raiseContract = new RaiseContractImpl(program, connection);
        return raiseContract;
    }
    setWallet(wallet) {
        const provider = new anchor_1.AnchorProvider(this.connection, wallet, {
            commitment: 'processed'
        });
        this.program = new anchor_1.Program(this.program.idl, this.program.programId, provider);
    }
    setWalletKeypair(keypair) {
        const wallet = new anchor_1.Wallet(keypair);
        this.setWallet(wallet);
    }
    getPda(seeds, programId = this.program.programId) {
        return web3_js_1.PublicKey.findProgramAddressSync(seeds, programId)[0];
    }
    getPlatform() {
        return this.getPda([Buffer.from('platform')]);
    }
    getPlatformAuthority() {
        return this.getPda([Buffer.from('platform_authority')]);
    }
    getCampaign(creator) {
        return this.getPda([Buffer.from('campaign'), creator.toBuffer()]);
    }
    getCampaignAuthority() {
        return this.getPda([Buffer.from('campaign_authority')]);
    }
    getDonor(campaignPubkey, userPubkey) {
        return this.getPda([
            Buffer.from('donor'),
            campaignPubkey.toBuffer(),
            userPubkey.toBuffer()
        ]);
    }
    getTokenAccountByOwner(owner, mint) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenAccounts = (yield this.connection.getParsedTokenAccountsByOwner(owner, { mint })).value;
            if (tokenAccounts.length > 0) {
                let maxAmount = 0;
                let tokenAccount = tokenAccounts[0].pubkey;
                tokenAccounts.forEach(val => {
                    let amount = val.account.data.parsed.uiAmount;
                    if (amount > maxAmount) {
                        tokenAccount = val.pubkey;
                        maxAmount = amount;
                    }
                });
                return { tokenAccount, uiAmount: maxAmount };
            }
            return { tokenAccount: null, uiAmount: 0 };
        });
    }
    initializePlatform(fee, admin //payer
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            let platform = this.getPlatform();
            let platformAuthority = this.getPlatformAuthority();
            let accounts = Object.assign({ admin,
                platform,
                platformAuthority }, defaultProgramAccounts);
            let params = {
                fee
            };
            let txId = yield this.program.methods
                .initializePlatform(params)
                .accounts(accounts)
                .rpc();
            let latestBlockhash = yield this.connection.getLatestBlockhash('finalized');
            yield this.connection.confirmTransaction({
                signature: txId,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            });
            return {
                success: true,
                msg: null,
                txId: txId
            };
        });
    }
    setPlatformAdmin(adminToBeChanged, admin //payer
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            let platform = this.getPlatform();
            let platformAuthority = this.getPlatformAuthority();
            let accounts = Object.assign({ admin,
                platform,
                platformAuthority }, defaultProgramAccounts);
            let params = {
                adminToBeChanged
            };
            let txId = yield this.program.methods
                .setPlatformAdmin(params)
                .accounts(accounts)
                .rpc();
            let latestBlockhash = yield this.connection.getLatestBlockhash('finalized');
            yield this.connection.confirmTransaction({
                signature: txId,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            });
            return {
                success: true,
                msg: null,
                txId: txId
            };
        });
    }
    setPlatformFee(feeToBeChanged, admin //payer
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            let platform = this.getPlatform();
            let platformAuthority = this.getPlatformAuthority();
            let accounts = Object.assign({ admin,
                platform,
                platformAuthority }, defaultProgramAccounts);
            let params = {
                feeToBeChanged
            };
            let txId = yield this.program.methods
                .setPlatformFee(params)
                .accounts(accounts)
                .rpc();
            let latestBlockhash = yield this.connection.getLatestBlockhash('finalized');
            yield this.connection.confirmTransaction({
                signature: txId,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            });
            return {
                success: true,
                msg: null,
                txId: txId
            };
        });
    }
    initializeCampaign(goal, campaignDuration, // in seconds
    minDepositAmount, // in lamport
    creator //payer
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            let platform = this.getPlatform();
            let platformAuthority = this.getPlatformAuthority();
            let campaign = this.getCampaign(creator.publicKey);
            let campaignAuthority = this.getCampaignAuthority();
            let accounts = Object.assign({ creator: creator.publicKey, campaign,
                campaignAuthority }, defaultProgramAccounts);
            let params = {
                goal,
                campaignDuration,
                minDepositAmount
            };
            let txId = yield this.program.methods
                .initializeCampaign(params)
                .accounts(accounts)
                .signers([creator])
                .rpc();
            let latestBlockhash = yield this.connection.getLatestBlockhash('finalized');
            yield this.connection.confirmTransaction({
                signature: txId,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            });
            return {
                success: true,
                msg: null,
                txId: txId
            };
        });
    }
    fundToCampaign(fundAmount, donor, //payer
    creator) {
        return __awaiter(this, void 0, void 0, function* () {
            let platform = this.getPlatform();
            let platformAuthority = this.getPlatformAuthority();
            let campaign = this.getCampaign(creator);
            let campaignAuthority = this.getCampaignAuthority();
            let donorInfo = this.getDonor(campaign, donor.publicKey);
            let accounts = Object.assign({ donor: donor.publicKey, creator,
                campaign,
                campaignAuthority,
                donorInfo }, defaultProgramAccounts);
            let params = {
                fundAmount
            };
            let txId = yield this.program.methods
                .fundToCampaign(params)
                .accounts(accounts)
                .signers([donor])
                .rpc();
            let latestBlockhash = yield this.connection.getLatestBlockhash('finalized');
            yield this.connection.confirmTransaction({
                signature: txId,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            });
            return {
                success: true,
                msg: null,
                txId: txId
            };
        });
    }
    withdrawFromCampaign(creator) {
        return __awaiter(this, void 0, void 0, function* () {
            let campaign = this.getCampaign(creator.publicKey);
            let campaignAuthority = this.getCampaignAuthority();
            let accounts = Object.assign({ creator: creator.publicKey, campaign,
                campaignAuthority }, defaultProgramAccounts);
            let txId = yield this.program.methods
                .withdrawFromCampaign()
                .accounts(accounts)
                .signers([creator])
                .rpc();
            let latestBlockhash = yield this.connection.getLatestBlockhash('finalized');
            yield this.connection.confirmTransaction({
                signature: txId,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            });
            return {
                success: true,
                msg: null,
                txId: txId
            };
        });
    }
    refundToDonor(donor, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            let campaign = this.getCampaign(creator);
            let campaignAuthority = this.getCampaignAuthority();
            let donorInfo = this.getDonor(campaign, donor);
            let accounts = Object.assign({ donor,
                creator,
                campaign,
                campaignAuthority,
                donorInfo }, defaultProgramAccounts);
            let txId = yield this.program.methods
                .refundToDonor()
                .accounts(accounts)
                .rpc();
            let latestBlockhash = yield this.connection.getLatestBlockhash('finalized');
            yield this.connection.confirmTransaction({
                signature: txId,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            });
            return {
                success: true,
                msg: null,
                txId: txId
            };
        });
    }
    setCampaignUnlocked(creator) {
        return __awaiter(this, void 0, void 0, function* () {
            let campaign = this.getCampaign(creator);
            let campaignAuthority = this.getCampaignAuthority();
            let accounts = Object.assign({ creator,
                campaign }, defaultProgramAccounts);
            let txId = yield this.program.methods
                .setCampaignUnlocked()
                .accounts(accounts)
                .rpc();
            let latestBlockhash = yield this.connection.getLatestBlockhash('finalized');
            yield this.connection.confirmTransaction({
                signature: txId,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            });
            return {
                success: true,
                msg: null,
                txId: txId
            };
        });
    }
}
exports.default = RaiseContractImpl;
