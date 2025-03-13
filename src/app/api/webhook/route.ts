export async function GET(request: Request) {
  // GETリクエストの処理
  return new Response("Hello from the API");
}

export async function POST(request: Request) {
  // POSTリクエストの処理
  return new Response("Received POST request");
}
