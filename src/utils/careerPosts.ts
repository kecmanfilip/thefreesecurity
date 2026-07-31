import job1 from '../content/careers/ethical-hacker';
import job4 from '../content/careers/ai-engineer';
import job5 from '../content/careers/soc-analyst';

export interface Career {
  title: string;
  titleEn?: string;
  slug: string;
  department: string;
  departmentEn?: string;
  location: string;
  type: string;
  typeEn?: string;
  description: string;
  descriptionEn?: string;
  responsibilities: string[];
  responsibilitiesEn?: string[];
  requirements: string[];
  requirementsEn?: string[];
  benefits: string[];
  benefitsEn?: string[];
}

const careers: Career[] = [job1, job4, job5];

export default careers;
