"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Activity,
    Info,
    AlertCircle,
    Stethoscope,
    ChevronRight,
    Plus,
    X
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DiagnosisResult {
    disease: string;
    confidence: number;
    description: string;
    treatments: string[];
    urgency: "low" | "medium" | "high";
}

export default function DiagnosisToolPage() {
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<DiagnosisResult[] | null>(null);

    const addSymptom = (symptom: string) => {
        if (symptom && !symptoms.includes(symptom)) {
            setSymptoms([...symptoms, symptom]);
            setInputValue("");
        }
    };

    const removeSymptom = (symptom: string) => {
        setSymptoms(symptoms.filter(s => s !== symptom));
    };

    const handleAnalyze = () => {
        if (symptoms.length === 0) return;

        setIsAnalyzing(true);
        // Simulate AI analysis
        setTimeout(() => {
            setResults([
                {
                    disease: "Acute Bronchitis",
                    confidence: 85,
                    description: "Inflammation of the lining of your bronchial tubes, which carry air to and from your lungs. Often follows a cold or other respiratory infection.",
                    treatments: ["Rest", "Fluids", "Cough suppressants", "Humidifier"],
                    urgency: "medium"
                },
                {
                    disease: "Upper Respiratory Infection",
                    confidence: 62,
                    description: "Common viral infection affecting the nose, throat, and airways.",
                    treatments: ["Over-the-counter decongestants", "Saline nasal spray", "Hydration"],
                    urgency: "low"
                },
                {
                    disease: "Allergic Rhinitis",
                    confidence: 45,
                    description: "Allergic response to specific allergens like pollen, dust, or pet dander.",
                    treatments: ["Antihistamines", "Nasal corticosteroids", "Avoiding triggers"],
                    urgency: "low"
                }
            ]);
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Diagnosis Tool</h2>
                <p className="text-muted-foreground">Enter symptoms to get AI-assisted diagnosis suggestions and insights.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Input Section */}
                <Card className="md:col-span-5 border-none shadow-sm ring-1 ring-gray-100">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Symptom Entry</CardTitle>
                        <CardDescription>Add symptoms observed in the patient.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search symptoms (e.g. Cough)"
                                    className="pl-9"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addSymptom(inputValue)}
                                />
                            </div>
                            <Button size="icon" onClick={() => addSymptom(inputValue)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 min-h-[100px] p-3 rounded-lg bg-gray-50/50 border border-dashed border-gray-200">
                            {symptoms.length === 0 ? (
                                <p className="text-xs text-muted-foreground m-auto text-center italic">No symptoms added yet</p>
                            ) : (
                                symptoms.map((s, i) => (
                                    <Badge key={i} variant="secondary" className="px-2 py-1 gap-1 h-fit">
                                        {s}
                                        <button onClick={() => removeSymptom(s)} className="hover:text-red-500">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))
                            )}
                        </div>

                        <Button
                            className="w-full h-12 text-md font-bold transition-all hover:scale-[1.01]"
                            disabled={symptoms.length === 0 || isAnalyzing}
                            onClick={handleAnalyze}
                        >
                            {isAnalyzing ? (
                                <Activity className="h-5 w-5 animate-spin mr-2" />
                            ) : (
                                <Stethoscope className="h-5 w-5 mr-2" />
                            )}
                            {isAnalyzing ? "ANALYZING..." : "ANALYZE SYMPTOMS"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="md:col-span-7 space-y-4">
                    {!results && !isAnalyzing ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-xl border-2 border-dashed border-gray-100">
                            <div className="p-4 rounded-full bg-primary/5 mb-4">
                                <Info className="h-10 w-10 text-primary/40" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Waiting for Data</h3>
                            <p className="max-w-xs text-sm text-muted-foreground mt-2">
                                Add symptoms and click analyze to see potential diagnoses and treatment plans.
                            </p>
                        </div>
                    ) : isAnalyzing ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-xl">
                            <Activity className="h-12 w-12 text-primary animate-spin mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">Processing Clinical Data</h3>
                            <p className="text-sm text-muted-foreground mt-2">Running symptoms against our medical database...</p>
                            <div className="w-48 mt-6">
                                <Progress value={33} className="h-1 animate-pulse" />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Analysis Results</h3>
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">
                                    {results?.length} Suggestions Found
                                </Badge>
                            </div>

                            {results?.map((res, i) => (
                                <Card key={i} className="group overflow-hidden border-none shadow-sm ring-1 ring-gray-100 hover:ring-primary/20 transition-all">
                                    <CardContent className="p-0">
                                        <div className="flex items-stretch flex-col sm:flex-row">
                                            <div className="p-5 flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="text-xl font-bold text-gray-900">{res.disease}</h4>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${res.urgency === 'high' ? 'bg-red-100 text-red-700' :
                                                            res.urgency === 'medium' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {res.urgency} Priority
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                                    {res.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                                    {res.treatments.map((t, j) => (
                                                        <span key={j} className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="w-full sm:w-32 bg-gray-50/50 p-5 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-gray-100">
                                                <div className="text-3xl font-black text-primary leading-none">{res.confidence}%</div>
                                                <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-wider">Match</div>
                                                <div className="w-full mt-3">
                                                    <Progress value={res.confidence} className="h-1 bg-gray-200" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-100 flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-blue-900">Medical Disclaimer</p>
                                    <p className="text-xs text-blue-800/70 mt-0.5 leading-relaxed">
                                        This tool is for clinical support only and does not replace professional medical judgment.
                                        Always correlate suggests with clinical findings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
