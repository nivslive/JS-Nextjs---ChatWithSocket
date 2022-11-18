import Ably from "ably/promises";

export default async function handler(req, res) {
    console.log(process.env.NEXT_PUBLIC_ABLY_API_KEY, 'api')
    const client = new Ably.Realtime('ds5yeg.IL7zoA:shr09DKtfzxiFj8AveGuMB8NdWlvlqkd6KtlBfeo5Ew');
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo' });
    res.status(200).json(tokenRequestData);
};