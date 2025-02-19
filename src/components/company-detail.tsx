import { Company } from '@prisma/client';
import React from 'react';

type CompanyDetailProps = {
  company: Company;
};

export default function CompanyDetail({ company }: CompanyDetailProps) {
  return <div>{company.name}</div>;
}
