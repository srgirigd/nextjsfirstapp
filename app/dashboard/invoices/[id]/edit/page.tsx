import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

async function EditFormWrapper({
  paramsPromise,
}: {
  paramsPromise: Promise<{ id: string }>;
}) {
  const { id } = await paramsPromise;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return <Form invoice={invoice} customers={customers} />;
}

export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: '/dashboard/invoices',
            active: true,
          },
        ]}
      />
      <Suspense fallback={<div>Loading invoice...</div>}>
        <EditFormWrapper paramsPromise={props.params} />
      </Suspense>
    </main>
  );
}