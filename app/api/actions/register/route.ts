import { ActionGetResponse, ActionPostResponse, ActionPostRequest, ACTIONS_CORS_HEADERS} from "@solana/actions";
import { Connection, PublicKey, SystemProgram, Transaction, clusterApiUrl } from "@solana/web3.js";
import { count } from "console";
import { headers } from "next/headers";
import { title } from "process";

export async function GET(request: Request) {
  const responseBody : ActionGetResponse = {
    // icon: "https://imgs.search.brave.com/TmuC-ABekNMwlHmZAAHY7FrzNZMsijp-9O1vtZeuv14/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXNraW5jYXJlLmNv/bS9jZG4vc2hvcC9m/aWxlcy9EQUlMWV9f/MV8zZDI4MWUwYS0w/Zjg3LTRlNDMtOWZl/ZS04N2MyOTY4YTgz/OWIuanBnP3Y9MTcx/MjI0MDA2NiZ3aWR0/aD0xODAw",
    icon: "http://localhost:3000/solanaeco.jpg",
    description: "This is the registration page demo blink.",
    title: "Solana Ecosystem Registration Call - Ahmedabad, India",
    label: "Register here",
  }
  const response = Response.json(responseBody, {headers : ACTIONS_CORS_HEADERS});
    return response
}

export async function POST(request: Request) {

    const requestBody: ActionPostRequest = await request.json();
    const userPubkey = requestBody.account;
    console.log("User pubkey: ", userPubkey);

    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const tx = new Transaction();
    tx.feePayer = new PublicKey(userPubkey);
    tx.recentBlockhash = (await connection.getLatestBlockhash({commitment: "finalized"})).blockhash;
    const serialTX = tx.serialize({requireAllSignatures: false, verifySignatures: false}).toString("base64");

    const response : ActionPostResponse = {
      transaction: serialTX,
      message: "Registration successful",

  };
    return Response.json(response);
}

export async function OPTIONS(request: Request) {
    return new Response(null, {headers : ACTIONS_CORS_HEADERS});
}
    
