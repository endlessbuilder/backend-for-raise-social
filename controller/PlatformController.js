const _ = require("lodash");
const RaiseContractImpl = require("../utils/integration")
const { CONNECTION } = require('../utils/endpoints')
const { Keypair, PublicKey } = require('@solana/web3.js')
const bs58 = require('@coral-xyz/anchor/dist/cjs/utils/bytes/bs58');
const { BN } = require('@coral-xyz/anchor')

console.log(">>> connection : ", CONNECTION._rpcEndpoint)

const raiseContract = RaiseContractImpl.create(CONNECTION._rpcEndpoint)
const backendPrivateKey = process.env.ADMIN_SECRET_KEY;
const backendWalletKeypair = Keypair.fromSecretKey(bs58.decode(backendPrivateKey));

raiseContract.setWalletKeypair(backendWalletKeypair);

exports.createCampaign = async (req, res) => {
    try {
        try {
            let { txId } = await raiseContract.initializePlatform(
                new BN(0.01 * 1_000_000_000),
                backendWalletKeypair.publicKey
            );

            console.log('>>> initializePlatform txId = ', txId);
        } catch (e) {
            console.log('>>> initializePlatform error # \n ', e);
            assert(false, 'initializePlatform error');
        }
    } catch (error) {
        console.error('Error creating Platform:', error);
        res.status(500).json({ message: 'Failed to create platform' });
    }
}

exports.setAdmin = async (req, res) => {
    let adminToBeChanged = new PublicKey( req.body.adminToBeChanged );
    console.log('>>> adminToBeChanged = ', adminToBeChanged.toBase58());

    try {
        try {
            let { txId } = await raiseContract.setPlatformAdmin(
                adminToBeChanged,
                backendWalletKeypair.publicKey
            );

            console.log('>>> setPlatformAdmin txId = ', txId);

            res.status(200).json({ message: 'Success' });
        } catch (e) {
            console.log('>>> setPlatformAdmin error # \n ', e);
            assert(false, 'setPlatformAdmin error');
        }

    } catch (error) {
        console.error('Error setPlatformAdmin:', error);
        res.status(500).json({ message: 'Failed to setPlatformAdmin' });
    }
}

exports.setFee = async (req, res) => {
    let feeToBeChanged = new BN( req.body.feeToBeChanged * 1_000_000_000 );
    console.log('>>> feeToBeChanged = ', feeToBeChanged.toString());

    try {
        try {
            let { txId } = await raiseContract.setPlatformFee(
                feeToBeChanged,
                backendWalletKeypair.publicKey
            );

            console.log('>>> setPlatformFee txId = ', txId);

            res.status(200).json({ message: 'Success' });
        } catch (e) {
            console.log('>>> setPlatformFee error # \n ', e);
            assert(false, 'setPlatformFee error');
        }
    } catch (error) {
        console.error('Error setPlatformFee:', error);
        res.status(500).json({ message: 'Failed to setPlatformFee' });
    }
}