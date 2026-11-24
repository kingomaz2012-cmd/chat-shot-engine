export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    if (request.method === "GET") {
      return Response.json({
        status: "online",
        app: "Chat Shot Engine"
      }, { headers: cors });
    }

    if (request.method !== "POST") {
      return Response.json(
        { error: "Method not allowed" },
        { status: 405, headers: cors }
      );
    }

    try {
      const body = await request.json();

      return Response.json({
        reply: "وصلت رسالتك إلى محرك Chat Shot بنجاح.",
        received: body.message || ""
      }, { headers: cors });

    } catch {
      return Response.json(
        { error: "Invalid JSON" },
        { status: 400, headers: cors }
      );
    }
  }
};
