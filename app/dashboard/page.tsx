"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Mail, RefreshCw, Search, CheckCircle2, Clock, Zap } from "lucide-react";
import { COMPANY } from "@/lib/config";

type Project = {
  id: string;
  klant: string;
  project: string;
  fase: string;
  status: string;
  bedrag: number;
  deposit: number;
  start: string;
  next: string;
};

const seedProjects: Project[] = [
  { id: "HF-24091", klant: "Jansen", project: "Badkamer renovatie", fase: "offerte", status: "Wacht op akkoord", bedrag: 12450, deposit: 30, start: "2025-11-10", next: "Bel klant – 27.10" },
  { id: "HF-24092", klant: "Müller", project: "Vloertegels woonkamer", fase: "planning", status: "Materialen bestellen", bedrag: 8650, deposit: 40, start: "2025-11-18", next: "Bevestig leverdatum – 28.10" },
];

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProjects(seedProjects);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter(
      (p) =>
        p.klant.toLowerCase().includes(q) ||
        p.project.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
  }, [search, projects]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1">HomeFlow360.nl · Dashboard</h1>
        <p className="text-gray-500 mb-6">Projectoverzicht – {COMPANY.address}</p>

        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Zoeken op klant of project…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filtered.map((p) => (
            <Card key={p.id} className="rounded-xl shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{p.project}</div>
                  <div className="text-sm text-gray-500">{p.klant}</div>
                  <div className="text-xs text-gray-400">{p.fase} · {p.status}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">€ {p.bedrag.toLocaleString("nl-NL")}</div>
                  <div className="text-xs text-gray-500">Aanbetaling: {p.deposit}%</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card className="rounded-xl shadow-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="font-semibold">Agent status</div>
                  <div className="text-xs text-gray-500">Online</div>
                </div>
              </div>
              <Button variant="outline" className="gap-1">
                <RefreshCw className="w-4 h-4" /> Synchroniseren
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
