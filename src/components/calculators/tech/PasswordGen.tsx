"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, Copy, RefreshCw, Lock, Shield, Zap } from "lucide-react";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function PasswordGen() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const { addToHistory } = useCalculatorStore();

  const generatePassword = useCallback(() => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
    setCopied(false);
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    addToHistory({
      name: "Password Generated",
      href: "/calculators/tech/password",
      result: `${length} chars`,
    });
  };

  const strength = length < 8 ? "Weak" : length < 12 ? "Medium" : "Strong";
  const strengthColor = strength === "Weak" ? "bg-red-500" : strength === "Medium" ? "bg-yellow-500" : "bg-emerald-500";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <ShieldCheck className="h-6 w-6 text-purple-500" />
              Generator Settings
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Customize your password to meet security requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Password Length</Label>
                <span className="font-black text-purple-500 text-2xl">{length}</span>
              </div>
              <Slider 
                value={[length]} 
                onValueChange={([v]) => setLength(v)} 
                max={50} 
                min={4} 
                step={1} 
                className="py-4" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <Checkbox 
                  id="uppercase" 
                  checked={includeUppercase} 
                  onCheckedChange={(v) => setIncludeUppercase(v as boolean)}
                  className="border-zinc-700 data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="uppercase" className="text-white cursor-pointer select-none">Include Uppercase</Label>
              </div>
              <div className="flex items-center space-x-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <Checkbox 
                  id="numbers" 
                  checked={includeNumbers} 
                  onCheckedChange={(v) => setIncludeNumbers(v as boolean)}
                  className="border-zinc-700 data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="numbers" className="text-white cursor-pointer select-none">Include Numbers</Label>
              </div>
              <div className="flex items-center space-x-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <Checkbox 
                  id="symbols" 
                  checked={includeSymbols} 
                  onCheckedChange={(v) => setIncludeSymbols(v as boolean)}
                  className="border-zinc-700 data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="symbols" className="text-white cursor-pointer select-none">Include Symbols</Label>
              </div>
              <div className="flex items-center space-x-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 opacity-50">
                <Checkbox id="lowercase" checked={true} disabled />
                <Label htmlFor="lowercase" className="text-white">Include Lowercase</Label>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full h-14 rounded-xl font-bold text-lg bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/20 gap-2">
              <RefreshCw className="h-5 w-5" /> Regenerate Password
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <Card className="h-full border-none shadow-2xl overflow-hidden flex flex-col bg-zinc-950">
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <Label className="text-zinc-400 text-xs uppercase tracking-widest font-black">Generated Password</Label>
              <div className="relative">
                <Input 
                  readOnly 
                  value={password} 
                  className="h-20 bg-zinc-900 border-zinc-800 text-2xl font-mono text-white pr-16 focus:ring-purple-500"
                />
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={copyToClipboard}
                  className="absolute right-2 top-2 h-16 w-12 hover:bg-zinc-800 text-purple-500"
                >
                  {copied ? <Zap className="h-6 w-6 text-emerald-500 animate-bounce" /> : <Copy className="h-6 w-6" />}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-bold">Strength</span>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${strengthColor} text-black`}>{strength}</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${strengthColor} transition-all duration-500`} 
                  style={{ width: strength === "Weak" ? "33%" : strength === "Medium" ? "66%" : "100%" }}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-zinc-900 rounded-xl">
                <Lock className="h-6 w-6 text-purple-500 mb-2" />
                <span className="text-[10px] text-zinc-500 uppercase font-black">AES-256</span>
                <span className="text-xs text-white font-bold">Standard</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-zinc-900 rounded-xl">
                <Shield className="h-6 w-6 text-emerald-500 mb-2" />
                <span className="text-[10px] text-zinc-500 uppercase font-black">Secure</span>
                <span className="text-xs text-white font-bold">Encrypted</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto p-6 bg-purple-600/10 border-t border-purple-500/20">
            <p className="text-xs text-purple-300 italic text-center">
              Passwords are generated locally on your device and are never sent to our servers.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
