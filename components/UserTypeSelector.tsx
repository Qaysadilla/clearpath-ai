'use client';

import { UserType } from '@/lib/storage';
import { GraduationCap, Globe, Briefcase, Users, User, Check } from 'lucide-react';

interface UserTypeSelectorProps {
  selectedType: UserType | null;
  onSelect: (type: UserType) => void;
}

const userTypes = [
  {
    type: 'student' as UserType,
    icon: GraduationCap,
    label: 'Student',
    description: 'Financial aid, school emails, academic documents',
  },
  {
    type: 'newcomer' as UserType,
    icon: Globe,
    label: 'Newcomer / Immigrant',
    description: 'Immigration notices, government letters, settlement docs',
  },
  {
    type: 'worker' as UserType,
    icon: Briefcase,
    label: 'Worker',
    description: 'Employment letters, benefits, workplace documents',
  },
  {
    type: 'family_helper' as UserType,
    icon: Users,
    label: 'Family Helper',
    description: 'Helping family members understand their documents',
  },
  {
    type: 'general' as UserType,
    icon: User,
    label: 'General User',
    description: 'Any type of official document or notice',
  },
];

export default function UserTypeSelector({ selectedType, onSelect }: UserTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="section-label text-primary mb-1">Step 1</p>
        <h3 className="text-lg font-serif font-semibold text-foreground mb-1">
          Who are you using ClearPath as?
        </h3>
        <p className="text-sm text-muted-foreground">
          This helps us provide more relevant guidance for your situation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {userTypes.map((userType) => {
          const Icon = userType.icon;
          const isSelected = selectedType === userType.type;

          return (
            <button
              key={userType.type}
              onClick={() => onSelect(userType.type)}
              aria-pressed={isSelected}
              className={`
                relative p-4 rounded-xl border text-left transition-all duration-150
                hover:shadow-soft-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                ${isSelected
                  ? 'border-primary bg-primary/5 shadow-soft-md'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                }
              `}
            >
              <div className="flex flex-col items-start space-y-2.5">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-150
                  ${isSelected ? 'bg-primary/10' : 'bg-muted'}
                `}>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground leading-snug">
                    {userType.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {userType.description}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-2.5 right-2.5">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                    <Check className="w-3 h-3" aria-hidden="true" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Made with Bob
