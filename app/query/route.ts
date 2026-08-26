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
  const client = await db.connect();

  try {
    return Response.json(await listInvoices(client));
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}