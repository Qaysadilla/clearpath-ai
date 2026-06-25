'use client';

import { UserType } from '@/lib/storage';
import { GraduationCap, Globe, Briefcase, Users, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
    color: 'from-blue-100 to-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-300',
  },
  {
    type: 'newcomer' as UserType,
    icon: Globe,
    label: 'Newcomer / Immigrant',
    description: 'Immigration notices, government letters, settlement docs',
    color: 'from-green-100 to-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-300',
  },
  {
    type: 'worker' as UserType,
    icon: Briefcase,
    label: 'Worker',
    description: 'Employment letters, benefits, workplace documents',
    color: 'from-purple-100 to-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-300',
  },
  {
    type: 'family_helper' as UserType,
    icon: Users,
    label: 'Family Helper',
    description: 'Helping family members understand their documents',
    color: 'from-orange-100 to-orange-50',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-300',
  },
  {
    type: 'general' as UserType,
    icon: User,
    label: 'General User',
    description: 'Any type of official document or notice',
    color: 'from-gray-100 to-gray-50',
    iconColor: 'text-gray-600',
    borderColor: 'border-gray-300',
  },
];

export default function UserTypeSelector({ selectedType, onSelect }: UserTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
          Step 1: Who are you using ClearPath as?
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
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200
                hover:shadow-soft-md hover:-translate-y-0.5
                ${isSelected 
                  ? `${userType.borderColor} bg-gradient-to-br ${userType.color} shadow-soft-md` 
                  : 'border-border bg-card hover:border-primary/30'
                }
              `}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${isSelected ? `bg-white/80 shadow-sm` : 'bg-muted'}
                `}>
                  <Icon className={`w-6 h-6 ${isSelected ? userType.iconColor : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <div className={`font-semibold text-sm ${isSelected ? 'text-foreground' : 'text-foreground'}`}>
                    {userType.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">
                    {userType.description}
                  </div>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className={`w-5 h-5 rounded-full ${userType.iconColor} bg-white flex items-center justify-center shadow-sm`}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
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