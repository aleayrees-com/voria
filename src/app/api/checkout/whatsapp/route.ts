import { products } from '../../../../lib/catalog';
import { createWhatsAppCheckoutUrl } from '../../../../lib/checkout';
import { buildCheckoutItemsFromRequest } from '../../../../lib/checkout-request';
import { storeConfig } from '../../../../lib/store-config';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  let items;

  try {
    items = isRecord(payload)
      ? buildCheckoutItemsFromRequest(payload.items, products)
      : [];
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Invalid checkout items',
      },
      { status: 400 },
    );
  }
  const sourceUrl =
    isRecord(payload) && typeof payload.sourceUrl === 'string'
      ? payload.sourceUrl
      : undefined;
  const url = createWhatsAppCheckoutUrl({
    items,
    phoneNumber: storeConfig.whatsappNumber,
    representativeName: storeConfig.representativeName,
    sourceUrl,
  });

  return Response.json({ url });
}
