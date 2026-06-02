"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Plus, Trash2, RotateCcw } from "lucide-react";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0
};

const createCourseId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `course-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export function GPACalc() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Course 1", grade: "A", credits: 3 },
    { id: "2", name: "Course 2", grade: "B+", credits: 3 },
  ]);
  const { addToHistory } = useCalculatorStore();

  const gpa = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const points = GRADE_POINTS[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, [courses]);

  const addCourse = () => {
    setCourses([...courses, { id: createCourseId(), name: `Course ${courses.length + 1}`, grade: "A", credits: 3 }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const reset = () => {
    setCourses([{ id: "1", name: "Course 1", grade: "A", credits: 3 }]);
  };

  const handleSave = () => {
    addToHistory({
      name: "GPA Calculation",
      href: "/calculators/education/gpa",
      result: gpa.toFixed(2),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <GraduationCap className="h-6 w-6 text-orange-500" />
                Course Details
              </CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={reset} className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white gap-2">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                  <div className="md:col-span-5 space-y-2">
                    <Label className="text-zinc-400 text-xs">Course Name</Label>
                    <Input 
                      value={course.name} 
                      onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                      className="bg-zinc-900 border-zinc-800"
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label className="text-zinc-400 text-xs">Grade</Label>
                    <Select value={course.grade} onValueChange={(v) => updateCourse(course.id, "grade", v)}>
                      <SelectTrigger className="bg-zinc-900 border-zinc-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        {Object.keys(GRADE_POINTS).map(g => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label className="text-zinc-400 text-xs">Credits</Label>
                    <Input 
                      type="number" 
                      value={course.credits} 
                      onChange={(e) => updateCourse(course.id, "credits", Number(e.target.value))}
                      className="bg-zinc-900 border-zinc-800"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeCourse(course.id)}
                      className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button onClick={addCourse} className="flex-1 h-12 bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white gap-2 border">
                <Plus className="h-5 w-5" /> Add Course
              </Button>
              <Button onClick={handleSave} className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold">
                Save Result
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-4">
        <Card className="h-full border-none shadow-2xl overflow-hidden flex flex-col bg-zinc-950">
          <div className="bg-orange-600 p-8 text-white text-center">
            <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Calculated GPA</p>
            <p className="text-7xl font-black">{gpa.toFixed(2)}</p>
          </div>
          
          <div className="flex-1 p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-white">Grade Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Total Courses</span>
                  <span className="font-bold text-white">{courses.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Total Credits</span>
                  <span className="font-bold text-white">{courses.reduce((acc, c) => acc + c.credits, 0)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Grade Point Average</span>
                  <span className="font-black text-orange-500 text-xl">{gpa.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <p className="text-sm text-zinc-500 italic">
                GPA is calculated on a 4.0 scale by multiplying course credits with grade points and dividing by total credits.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
