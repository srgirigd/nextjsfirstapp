import { db } from '@vercel/postgres';

async function listInvoices(client: any) {
  const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data.rows;
}

export async function GET() {
  if (!process.env.POSTGRES_URL) {
    return Response.json(
      { message: 'Database connection string not configured.' },
      { status: 200 }
    );
  }

  try {
    const client = await db.connect();
    const invoices = await listInvoices(client);
    return Response.json(invoices);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}