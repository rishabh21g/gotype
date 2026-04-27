import { config } from "@/types/config";
import { Clock, Type, Quote, Mountain, Code, Wrench } from "lucide-react";

export const CONFIG: config[] = [
    { id: 'time', icon: Clock, label: 'time' },
    { id: 'words', icon: Type, label: 'words' },
    { id: 'quote', icon: Quote, label: 'quote' },
    { id: 'zen', icon: Mountain, label: 'zen' },
    { id: 'code', icon: Code, label: 'code' },
    { id: 'custom', icon: Wrench, label: 'custom' },
];