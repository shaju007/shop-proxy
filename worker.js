export default {
  async fetch(request, env, ctx) {
    // Handle CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      const domain = url.searchParams.get('domain');

      if (!domain) {
        return new Response(
          JSON.stringify({ error: 'Domain parameter is required' }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          }
        );
      }

      // Fetch from the shop API
      const shopResponse = await fetch(`https://${domain}/api/v2/shop`);
      const data = await shopResponse.json();

      return new Response(JSON.stringify(data), {
        status: shopResponse.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }
  },
};
