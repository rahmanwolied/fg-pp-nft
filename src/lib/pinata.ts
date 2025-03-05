import { PinataSDK } from 'pinata';

const PinataClient = new PinataSDK({
	pinataJwt: process.env.PINATA_JWT || '',
	pinataGateway: process.env.PINATA_GATEWAY || '',
});

export default PinataClient;
