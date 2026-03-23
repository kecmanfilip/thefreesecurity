import job1 from '../content/careers/ethical-hacker';
import job2 from '../content/careers/marketing-specialist';
import job3 from '../content/careers/partnership-developer';

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

const careers: Career[] = [job1, job2, job3];

export default careers;
