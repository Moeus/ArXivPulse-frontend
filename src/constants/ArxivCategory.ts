import { Terminal, Atom, Calculator, Dna, LucideIcon } from 'lucide-react';

export interface Topic {
    id: string;
    nameKey: string;
    originalName: string;
}

export interface DomainGroup {
    id: string;
    nameKey: string;
    icon: LucideIcon;
    color: string;
    topics: Topic[];
}

export const ARXIV_CATEGORIES: DomainGroup[] = [
    {
        id: 'cs',
        nameKey: 'computerScience',
        icon: Terminal,
        color: 'bg-orange-100 text-orange-600',
        topics: [
            { id: 'cs.AI', nameKey: 'artificialIntelligence', originalName: 'Artificial Intelligence' },
            { id: 'cs.CV', nameKey: 'computerVision', originalName: 'Computer Vision' },
            { id: 'cs.LG', nameKey: 'machineLearning', originalName: 'Machine Learning' },
            { id: 'cs.CL', nameKey: 'computationAndLanguage', originalName: 'Computation and Language' }
        ]
    },
    {
        id: 'physics',
        nameKey: 'physics',
        icon: Atom,
        color: 'bg-blue-100 text-blue-600',
        topics: [
            { id: 'quant-ph', nameKey: 'quantumPhysics', originalName: 'Quantum Physics' },
            { id: 'physics.atom-ph', nameKey: 'atomicPhysics', originalName: 'Atomic Physics' },
            { id: 'physics.optics', nameKey: 'optics', originalName: 'Optics' }
        ]
    },
    {
        id: 'math',
        nameKey: 'statistics',
        icon: Calculator,
        color: 'bg-green-100 text-green-600',
        topics: [
            { id: 'stat.ML', nameKey: 'machineLearning', originalName: 'Machine Learning' },
            { id: 'stat.AP', nameKey: 'applications', originalName: 'Applications' },
            { id: 'stat.ME', nameKey: 'methodology', originalName: 'Methodology' }
        ]
    },
    {
        id: 'bio',
        nameKey: 'quantitativeBiology',
        icon: Dna,
        color: 'bg-red-100 text-red-600',
        topics: [
            { id: 'q-bio.GN', nameKey: 'genomics', originalName: 'Genomics' },
            { id: 'q-bio.NC', nameKey: 'neuronsAndCognition', originalName: 'Neurons and Cognition' }
        ]
    }
];