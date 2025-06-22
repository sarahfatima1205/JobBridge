"use client";

import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ResumeMatcher = () => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [matchInfo, setMatchInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jd) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/match", formData);
      setMatchInfo(res.data);
    } catch (err) {
      console.error(err);
      alert("Error matching resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex justify-center items-center px-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">Resume vs Job Description Matcher</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="resume">Upload Resume (PDF)</Label>
              <Input id="resume" type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="jd">Paste Job Description</Label>
              <Textarea id="jd" rows={6} placeholder="Paste JD here..." value={jd} onChange={(e) => setJd(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Matching..." : "Compare Now"}
            </Button>
          </form>

          {matchInfo && (
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Match Score</h3>
                <div className="w-full h-4 bg-gray-300 rounded">
                  <div
                    className="h-full bg-green-500 rounded text-xs text-white text-center"
                    style={{ width: `${matchInfo.score}%` }}
                  >
                    {matchInfo.score}%
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Suggested Keywords to Add</h3>
                {matchInfo.suggestedKeywords?.length > 0 ? (
                  <ul className="list-disc pl-5 text-sm text-gray-800">
                    {matchInfo.suggestedKeywords.map((kw, i) => (
                      <li key={i}>{kw}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No suggestions. Great job!</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeMatcher;
