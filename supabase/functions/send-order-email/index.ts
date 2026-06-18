import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { record } = body;

    if (!record) {
      return new Response(JSON.stringify({ error: "No record provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured, skipping email");
      return new Response(JSON.stringify({ message: "Email skipped (no API key)" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const paymentLabel: Record<string, string> = {
      cash_on_delivery: "Cash on Delivery (ক্যাশ অন ডেলিভারি)",
      bkash: "bKash (বিকাশ)",
      nagad: "Nagad (নগদ)",
    };

    const emailBody = `
নতুন অর্ডার পাওয়া গেছে! / New Order Received!

━━━━━━━━━━━━━━━━━━━━━━━
অর্ডার আইডি: ${record.id}
তারিখ: ${new Date(record.created_at).toLocaleString("bn-BD")}
━━━━━━━━━━━━━━━━━━━━━━━

গ্রাহকের তথ্য / Customer Details:
নাম: ${record.customer_name}
মোবাইল: ${record.phone}
ঠিকানা: ${record.address}

পণ্যের তথ্য / Product Details:
পণ্য: ${record.product_name}
পরিমাণ: ${record.quantity}
মোট মূল্য: ৳${record.total_price}

পেমেন্ট পদ্ধতি: ${paymentLabel[record.payment_method] || record.payment_method}

${record.notes ? `বিশেষ নোট: ${record.notes}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━
ডেলিভারি: Pathao Courier
━━━━━━━━━━━━━━━━━━━━━━━

Rokomari Bostro | রকমারি বস্ত্র
    `.trim();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rokomari Bostro <orders@resend.dev>",
        to: ["rokomaribostro@gmail.com"],
        subject: `নতুন অর্ডার - ${record.customer_name} | Order #${record.id.slice(0, 8)}`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(JSON.stringify({ error: "Email send failed", detail: err }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
