export function formatPrice(price: number, currency: string): string {
  if (currency === 'BDT') {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
    }).format(price).replace('৳', '৳').trim();
    // Note: bn-BD sometimes adds spaces or different symbols, we ensure ৳
  }

  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  // Fallback for other currencies: "EUR 299"
  return `${currency} ${new Intl.NumberFormat('en-US').format(price)}`;
}

// Specifically for BDT to ensure it looks like ৳24,990
export function formatBDT(price: number): string {
  return `৳${new Intl.NumberFormat('en-IN').format(price)}`;
}

export function formatSpec(key: string, value: any): string | null {
  if (value === null || value === undefined) return null;

  // Handle booleans first
  if (typeof value === 'boolean') {
    if (value === true) {
      if (key === 'anc') return 'ANC';
      if (key === 'wireless') return 'Wireless';
    }
    return null;
  }

  // Handle arrays (tags)
  if (Array.isArray(value)) {
    return value.map(v => typeof v === 'string' ? v.charAt(0).toUpperCase() + v.slice(1) : v).join(', ');
  }

  const mapping: Record<string, (v: any) => string> = {
    ram_gb: (v) => `${v} GB RAM`,
    storage_gb: (v) => `${v} GB`,
    battery_mah: (v) => `${v} mAh`,
    camera_mp: (v) => `${v} MP camera`,
    battery_hours: (v) => `${v}h battery`,
    network: (v) => `${v}`,
    display: (v) => `${v}`,
  };

  if (mapping[key]) {
    return mapping[key](value);
  }

  return null; // Skip unknown keys
}
