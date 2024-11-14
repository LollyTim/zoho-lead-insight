"use client";

import { useEffect, useState } from "react";

function Home() {
  const [leads, setLeads] = useState([]);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    async function fetchLeads() {
      const res = await fetch("/api/getLeads");
      const data = await res.json();
      setLeads(data.data);

      const insightsRes = await fetch("/api/generateInsights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leads: data.data }),
      });
      const insightsData = await insightsRes.json();
      setInsights(insightsData.insights);
    }

    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Lead Insights
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead, index) => (
          <div
            key={lead.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {lead.fullName}
            </h2>
            <p className="text-sm text-gray-500">
              Company: <span className="text-gray-700">{lead.company}</span>
            </p>
            <p className="text-sm text-gray-500">
              Email: <span className="text-gray-700">{lead.email}</span>
            </p>
            <p className="text-sm text-gray-500">
              Status: <span className="text-gray-700">{lead.status}</span>
            </p>
            <p className="text-sm text-gray-500">
              Industry: <span className="text-gray-700">{lead.industry}</span>
            </p>
            <p className="text-sm text-gray-500">
              Potential Revenue:{" "}
              <span className="text-gray-700">${lead.potentialRevenue}</span>
            </p>
            <p className="text-sm text-gray-500">
              Source: <span className="text-gray-700">{lead.source}</span>
            </p>
            <p className="text-sm text-gray-500">
              Phone: <span className="text-gray-700">{lead.phone}</span>
            </p>
            <p className="text-sm text-gray-500">
              Location:{" "}
              <span className="text-gray-700">
                {lead.city}, {lead.country}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Engagement Score:{" "}
              <span className="text-gray-700">{lead.engagementScore}</span>
            </p>
            <p className="text-sm text-gray-500 mt-4">AI Insights:</p>
            <p className="text-gray-700 mt-1">
              {insights ? insights[index] : "Loading..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
