import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://www.zohoapis.com/crm/v2/Leads", {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ZOHO_OAUTH_TOKEN}`,
      },
    });

    // Extract the complete set of lead data for each lead
    const detailedLeads = response.data.data.map((lead) => ({
      id: lead.id,
      fullName: lead.Full_Name,
      company: lead.Company,
      email: lead.Email,
      status: lead.Lead_Status,
      industry: lead.Industry,
      potentialRevenue: lead.Potential_Revenue,
      source: lead.Lead_Source,
      phone: lead.Phone,
      city: lead.City,
      country: lead.Country,
      engagementScore: lead.Engagement_Score,
      ...lead, // Include any additional fields dynamically
    }));

    res.status(200).json({ data: detailedLeads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch detailed lead information" });
  }
}
