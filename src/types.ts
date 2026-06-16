/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryId = 'calculadoras' | 'conversores' | 'geradores' | 'ferramentas-web' | 'utilitarios' | 'programatico' | 'institucional';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolMetadata {
  id: string;
  categoryId: CategoryId;
  title: string;
  shortDescription: string;
  longIntro: string;
  howItWorks: string;
  faqs: FAQItem[];
  tips: string[];
  relatedToolIds: string[];
  slug: string;
}

export interface ProgrammaticPage {
  id: string;
  title: string;
  description: string;
  path: string;
  type: 'conversao-dinamica' | 'data-regressiva' | 'codigo-dados';
}
